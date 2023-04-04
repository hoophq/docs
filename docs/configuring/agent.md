---
sidebar_position: 2
slug: /configuring/agent
---

# Agent

The agent is the component which connects to internal services, it requires an API key and the address of gRPC server to connect to.

## Configuration

| ENVIRONMENT     | DEFAULT VALUE | DESCRIPTION                                            |
| --------------- | ------------- | ------------------------------------------------------ |
| HOOP_GRPCURL    | ""            | The gRPC server (`DNS:PORT`) to connect to.            |
| HOOP_TOKEN      | ""            | The API key to authenticate to gateway                 |
| TLS_SERVER_NAME | ""            | The server name to be resolved when connecting via TLS |
| AUTO_REGISTER   | ""            | The organization name to auto register the agent       |
| LOG_ENCODING    | "json"        | The log encoding to output logs: json,console          |
| LOG_LEVEL       | "INFO"        | The level of logs: DEBUG,INFO,WARN,ERROR               |

The agent loads credentials following the order below

### Auto Registration

This mode should only be used when the agent is deployed in the same network of the xtdb instance and gateway. It will auto register and connect to the gateway in localhost. It's useful to perform administrative tasks in the gateway.

### Environment Variables

Using environment variables is the recommended way of setup the agent in a production setup. You can generate a token in the API or after receiving a link in the [web registration mode](agent.md/#web-registration).

To activate this mode, both environment variables must be set:

- `HOOP_GRPCURL`
- `HOOP_TOKEN`

### Configuration File

It tries to load the configuration from the filesystem at `$HOME/.hoop/agent.toml`. This mode is useful when the agent is running in a stateful environment. The configuration file is wiped if the machine or a container is restarted.

### Local Mode

If any of the previous methods aren't available, it will load the configuration if if the address `127.0.0.1:8010` has connectivity.
This mode is used when the agent identifies that has a local gateway instance running.

### Web Registration

The last resort is web registration, which will provide a link to create the agent in the webapp. The output below will appear when starting the agent:

```log
{..., "logger":"agent/main.go:35","msg":"webregister - connecting, attempt=1"}

--------------------------------------------------------------------------
VISIT THE URL BELOW TO REGISTER THE AGENT
{API_URL}/agents/new/x-agt-...
--------------------------------------------------------------------------
```

After registering the agent in the webapp, the token is persisted in the filesystem at `$HOME/.hoop/agent.toml`. This will allow the agent to be reconnected if the process restarts.

#### Default URL

The `{API_URL}` will always default to the address `https://app.hoop.dev`. When running the gateway self-hosted, it's important to set the environment variables `HOOP_GRPCURL`. This will remove the the default address to the standard output.

:::info
After registering the agent in the webapp, the token could be used to persist the configuration using the [environment variable mode](./agent.md#environment-variables).
:::

## TLS connection

The agent only connects without TLS when it's connecting in the gateway via localhost, this usually happens when it's running on [local](./agent.md#local-mode) or [auto registeration](./agent.md#auto-registration) mode. When `TLS_SERVER_NAME` env is set, it will always connect with TLS. The logs will indicate if it's connecting with tls or not:

```log
{..., "... platform=linux/arm64, mode=local, grpc_server=127.0.0.1:8010, tls=false - starting agent"}
```

In this case tls is disabled (`tls=false`) because the configuration is loaded as `local` mode.

## Debugging

To start the agent in debug mode, set the option `--debug` or set the env `LOG_LEVEL=DEBUG`.
To debug gRPC connection traffic logs, use the option `--debug-grpc` or set the env `LOG_GRPC=1`.

```shell
# start agent in debug mode
hoop start agent --debug --debug-grpc
```

## Creating a token

If you're logged in as an administrator, you could create a token using the API.

```shell
API_URL=$(cat $HOME/.hoop/config.toml |grep -i api_url |awk {'print $3'} | sed 's/"//g')
ACCESS_TOKEN=$(cat $HOME/.hoop/config.toml  |grep -i token |awk {'print $3'} |sed 's/"//g')
AGENT_NAME=prod
curl $API_URL/api/agents \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d@- <<EOF
{"name": "$AGENT_NAME"}
EOF
```
