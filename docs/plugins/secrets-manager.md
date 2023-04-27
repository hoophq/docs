---
sidebar_position: 5
slug: /plugins/secrets-manager
---

# Secrets Manager

This plugin enables integrating with known secrets manager making connection environment variable to be expanded dynamically for each connection.

- [plugin-secretsmanager source code](https://github.com/hoophq/plugin-secretsmanager)

## AWS Secrets Manager Provider

Allows expands environment variable from an AWS key value secret or a literal one.

### Credentials Configuration

It accepts authenticatating from, Environment Variables, Shared Configuration, Shared Credentials files or with an instance profile role.

**Required IAM Roles**

- secretsmanager:GetSecretValue
- secretsmanager:GetResourcePolicy
- secretsmanager:DescribeSecret
- secretsmanager:ListSecretVersionIds

### Syntax

- `aws:SECRET-KEY:SECRETID`

So a secret configured as:

```shell
cat - > /tmp/pgconfig.json <<EOF
{
  "PG_HOST": "127.0.0.1",
  "PG_PORT": "3306"
}
EOF
aws secretsmanager create-secret --name pgprod \
    --secret-string file:///tmp/pgconfig.json
```

Can be exposed to an environment variable in a connection as:

- `aws:pgprod:PG_HOST`
- `aws:pgprod:PG_PORT`

**Example:**

- MYSECRET=aws:prod-secret-key:MYSECRET

The environment key value will be replaced when the user is opening a session with the agent.

### Local Environment

```shell
# start a local instance of hoop
hoop start -e PLUGIN_REGISTRY_URL=https://pluginregistry.s3.amazonaws.com/packages.json
hoop start agent
```

### Managing the Plugin

1. Create a connection

```shell
hoop admin create connection bash --agent test-agent \
    -e PG_HOST=aws:pgprod:PG_HOST \
    --overwrite -- /bin/bash
```

2. Create the plugin and associate it

```shell
hoop admin create plugin secretsmanager \
    --config=AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE \
    --config=AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY \
    --config=AWS_REGION=us-east-1 \
    --connection bash \
    --source hoop/secretsmanager \
    --overwrite
```

### Testing it

Assuming that you have a bash connection created, check if the environment variables are expanded for your connection:

```shell
hoop exec bash -i 'env'
```

:::info
The plugin configuration (AWS Credentials) is not shared in any circustances with the user interacting with the connection. **These credentials are kept in memory only**. The context of the session will have only the secret values expanded in the connection environment variables.
:::

:::caution
However, when using instance roles, users could have access to those credentials depending how they interact with a connection. 
Example: passing a bash or a python script to a connection.
:::

## Env Json Provider

This provider allows exposing enviroment variables from an agent exposing a JSON environment variable.
It's useful to maintain compatibility with older runops agents.

### Syntax

- `envjson:MYJSON_ENV:ENVKEY`

So an environment variable configured in an agent:

- `ENV_CONFIG='{"PG_HOST": "127.0.0.1", "PG_DB": "testdb"}'`

Can be exposed to an environment variable in a connections as:

- `envjson:ENVCONFIG:PG_HOST`

### Local Environment

```shell
# start a local instance of hoop
hoop start -e PLUGIN_REGISTRY_URL=https://pluginregistry.s3.amazonaws.com/packages.json
ENV_CONFIG='{"PG_HOST": "127.0.0.1", "PG_DB": "testdb"}' hoop start agent
```

### Managing the Plugin

1. Create a connection

```shell
hoop admin create connection bash --agent test-agent \
    -e PG_HOST=envjson:ENV_CONFIG:PG_HOST \
    --overwrite -- /bin/bash
```

2. Create the plugin and associate it

```shell
hoop admin create plugin secretsmanager \
    --connection bash \
    --source hoop/secretsmanager \
    --overwrite
```

### Testing it

It should return the value of `127.0.0.1` from the `ENV_CONFIG` environment variable json.

```shell
hoop exec bash -i 'env |grep PG_HOST'
```

