---
sidebar_position: 6
slug: /plugins/database-credentials-manager
---

# Database Credentials Manager

This plugin generates role based users with a time of expiration when interacting with connections. As an administrator you could define granular policies and associate to connections, these credentials could be used to interact with any databases made available in a connection.

## Supported Databases

- Postgres

## Requirements

- A postgres super user that allows creating users and granting access to privileges
- Available at version 1.12.10+

## Supported Privileges

- SELECT
- INSERT
- UPDATE
- DELETE
- TRUNCATE
- REFERENCES
- TRIGGER
- CREATE
- TEMPORARY

## Policy Configuration

A policy is written in HCL and defines how a database session user is going to be generated. The name of the policy could be refered in a connection resource later on.

```json
# config.hcl
policy "pg-homolog" {
    engine               = "postgres"
	plugin_config_entry  = "pg-homolog-credentials"
	expiration           = "12h"
	instances            = ["dellstore", "dellstore.store", "testdb"]
	grant_privileges     = ["SELECT", "UPDATE"]
}

policy "pg-prod" {
    (...)
}
```

### Plugin Config Entry

This configuration contains the DSN configuration of how to connect in the database instance. It's required that this user has super privileges to be able to grant the [supported permissions](db-credentials-manager#supported-privileges) to any database or schema in this instance.

Configuration Example:

- `postgres://<superuser>:<superuser-pwd>@<db-hostname>:<db=port>/postgres?<driver-options>...`

:::caution attention
The granter user is only used to provision users in a postgres instance, this information is never shared and keep only in memory when provisioning them.
:::

### Expiration

Is the amount of time a session user will last, after this period, the access expires. A new request need to be made to renew the credentials of the database session user.

### Instances & Privileges

These attributes define the privileges and which databases/schemas will have them. The example policy above will grant `SELECT` and `UPDATE` to the databases and schemas:

- `dellstore/public`
- `dellstore/store`
- `testdb/public`

If the instance contains a dot, the suffix indicates the name of the schema, if is omited then the schema is `public`.

A session user name is derived from these attributes, the policy above will generate a new user with the prefix: `_hoop_session_user_`, the suffix is the computation of a crc32 hash:

```go
suffix_crc32 = compute_crc32("dellstore,dellstore.store,testdb:SELECT,UPDATE")
```

The computation result generates the user `_hoop_session_user_bb0465c4`. These attributes are always sorted before applying this logic.

## Plugin Configuration

To create this plugin issue the command below:

```shell
PG_HOMOLOG_DSN='postgres://<superuser>:<passwd>d@<hostip>:<port>/postgres?<driver-options>'
hoop admin create plugin database-credentials-manager \
	--config pg-homolog-credentials=$PG_HOMOLOG_DSN \
	--config 'policy-config=path:./config.hcl' \
	--overwrite
```

- The `pg-homolog-credentials` refers to the plugin_config_entry in the policies
- The `policy-config` is the path containing the policy configuration file

Each new configuration entry is viewed as a `plugin_config_entry` in the policy file (with the exception of `policy-config`). More entries could be added if the plugin is managing multiple datbase instances.

A connection will refer the policy name of configuration file, which will instruct how to create the session user based in the definition of the policy. The session users are managed only when a user tries to interact with a connection.

### Connection Configuration

The command below creates a new connection refering the plugin and the policy name: `--plugin '<plugin>:<policy-name>`.

```shell
hoop admin create conn bash \
	--overwrite \
	--agent default \
	--plugin 'database-credentials-manager:pg-homolog' \
	-- bash
```

## How connections access these credentials?

When a user is interacting with a connection, the session user is created in runtime and exposed depending of the connection type.

### Command Line

The credentials are exposed as environment variables:

- `HOST` hostname of the database instance (derived from plugin configuration entry)
- `PORT` the port of the database instance (derived from plugin configuration entry)
- `USER` the name of the user
- `PGPASSWORD` the password generated

Example:

```shell
hoop exec conn bash -i 'env'
PGPASSWORD=2e0bac59-15b6-4b65-b19a-ddbf922dc70c
PORT=5444
HOST=192.168.15.48
USER=_hoop_session_user_bb0465c4
```

### Postgres

The credentials are used by the proxy that handles the authentication, below there's an example how to configure a `postgres` type:

```shell
hoop admin create conn pg-homolog \
    --skip-validation \
    --agent default \
    --type postgres \
    --plugin database-credentials-manager:pg-homolog
```

## FAQ

### How stale & old users are managed?

Session database users are only managed when a user interacts with a connection, thus stale & old session users may exist when changing the policy specification.
In case of a more constraint security towards managing users, the recommendation is decreasing the `expiration` time, this will enforce that a user is only valid for a certain period of time.

It's important to note that connections share database users internally. The way session users are created, it's possible to know how many of them are going to be generated in advance just by looking at the policy specification, see [instances & privileges section](./db-credentials-manager#instances--privileges)

### Which commands are used to manage users

If the user doesn't exists:

```sql
CREATE ROLE "<user>" WITH LOGIN ENCRYPTED PASSWORD '<random-pwd>' VALID UNTIL '<expiration>'
GRANT USAGE ON SCHEMA <schema> TO <user>
GRANT <privileges> ON ALL TABLES IN SCHEMA <schema> TO <user>
```

When the user already exists:

```sql
ALTER ROLE "<user>" WITH LOGIN ENCRYPTED PASSWORD '<random-pwd>' VALID UNTIL '<expiration>'
REVOKE ALL ON ALL TABLES IN SCHEMA <schema> FROM <user>
GRANT USAGE ON SCHEMA <schema> TO <user>
GRANT <privileges> ON ALL TABLES IN SCHEMA <schema> TO <user>
```

### Who has access to the granter user?

The granter user is stored in the gateway and sent to the agent when a user interacts with a connection. The credential is stored in memory to provision the session user and removed right after.
