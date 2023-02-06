---
sidebar_position: 2
slug: /configuring/agent
---

# Agent

The agent is the component which connects to internal services, it requires an API key and the address of gRPC server to connect to.

## Configuration

| ENVIRONMENT    | DEFAULT VALUE | DESCRIPTION                                      |
| -------------- | ------------- | ------------------------------------------------ |
| SERVER_ADDRESS | ""            | The gRPC server (`DNS:PORT`) to connect to.      |
| TOKEN          | ""            | The API key to authenticate to gateway           |
| AUTO_REGISTER  | ""            | The organization name to auto register the agent |

## Gateway Server Address

This option configures in which gateway to connect to when starting.
This value is only required when running the agent in **self-hosted mode**.

:::info
If this value is not set, the agent will try to connect locally into `127.0.0.1:8010`, fallbacking to `app.hoop.dev:8443`.
:::

## Auto Registration

This mode should only be used when the agent is deployed in the same network of the xtdb instance and gateway. It will auto register and connect to the gateway in localhost.

It's useful to perform administrative tasks in the gateway.

## Web Registration

When the environment variable `TOKEN` is not available the agent fallbacks to web registration. A link will be available to register the agent when starting. Example:

```shell
(...)
** UNREGISTERED AGENT **
Please validate the Agent in the URL: https://app.hoop.dev/agents/new/x-agt-91dda5fa-c370-4383-8ca6-48e5d563e491
```

The token is then persisted locally at `$HOME/.hoop/agent.toml`.

:::info
After the registration the token could be set as an environment variable: `TOKEN=x-agt-91dda5...`
:::

## Creating a token

If you're logged in as an administrator, you could create a token using the API.

```shell
API_URL=$(cat $HOME/.hoop/config.toml |grep -i api_url |awk {'print $3'} | sed 's/"//g')
ACCESS_TOKEN=$(cat $HOME/.hoop/config.toml  |grep -i Token |awk {'print $3'} |sed 's/"//g')
AGENT_NAME=prod
curl $API_URL/api/agents \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d@- <<EOF
{"name": "$AGENT_NAME"}
EOF
```
