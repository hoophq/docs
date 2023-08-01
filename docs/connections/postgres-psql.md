---
sidebar_position: 4
slug: /connections/psql
---

# Postgres | psql cli 

An optional way to connect into postgres is using the `psql` client. It's possible to create a interactive session or execute one-off commands.

## Connection Configuration

| Name         | Type    | Description                                    |
|------------- | ------- | ---------------------------------------------- |
| `HOST`       | env-var | The IP or Host of the Postgres server          |
| `PORT`       | env-var | The port of the Postgres server                |
| `USER`       | env-var | The user to connect in the Postgres server     |
| `PGPASSWORD` | env-var | The password to connect in the Postgres server |
| `DB`         | env-var | The name of the database to connect into       |

### Connnection Command

```shell
psql -P pager=off -h $HOST -U$USER --port$PORT $DB
```

:::info NOTE
The `PGPASSWORD` is mapped as an environment variable, thus there's no need to use it in the command.
:::

## How to Use

Start an interactive session with psql client

```shell
hoop connect psql
```

In the same connection, one-off process can be run as well

```shell
hoop exec psql <<EOF
SLEEP 5;
SELECT NOW();
EOF
```

```shell
hoop exec psql -f /tmp/myquery.sql
hoop exec psql -i 'SELECT NOW()'
```

## TLS Certificates

To connect with a postgres instance using TLS certificates, use the hoop admin command line to create or overwrite a connection

```shell
PGSSLMODE=verify-full
PGSSLROOTCERT=$(cat ca.crt |base64)
PGSSLKEY=$(cat client.key |base64)
PGSSLCERT=$(cat client.crt |base64)
PGUSER=client1
PGPASSWORD=1a2b3c4d
PGPORT=5432
PGHOST=127.0.0.1

hoop admin create conn psql -a default --overwrite \
	-env "b64-filesystem:PGSSLROOTCERT=$PGSSLROOTCERT" \
	-env "b64-filesystem:PGSSLKEY=$PGSSLKEY" \
	-env "b64-filesystem:PGSSLCERT=$PGSSLCERT" \
	-env "envvar:PGSSLMODE=$PGSSLMODE" \
	-env "envvar:PGUSER=$PGUSER" \
	-env "envvar:PGPASSWORD=$PGPASSWORD" \
	-env "envvar:PGPORT=$PGPORT" \
	-env "envvar:PGHOST=$PGHOST" -- psql
```

:::info
The [postgres environment variables](https://www.postgresql.org/docs/current/libpq-envars.html) will be available in the runtime execution, allowing the `psql` command line utility to connect in the postgres instance.

- The `b64-filesystem` prefix type will accept the content input as base64 and save the decoded value in a temporary file. The value of the variable will contain the path of the temporary file.
- The `envvar` prefix type will make the value available as an environment variable.
:::