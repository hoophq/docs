---
sidebar_position: 4
slug: /tutorials/plugin-development
---

# Plugin Development

This guide shows how to extend hoop developing Plugins with GO.

## Requirements

- Hoop Command Line
- [GO](https://go.dev/dl/) installed locally

### Hoop Setup

In this step, you'll start hoop gateway and an agent locally.

```shell
hoop start
LOG_LEVEL=debug hoop start agent
```

### Plugin App Setup

In this step, you'll build and run the plugin sample application

1. Clone the sample app repo

```shell
git clone https://github.com/hoophq/plugin-demo && cd plugin-demo
```

2. Build the plugin at /tmp/demo

```shell
PLUGIN_NAME=demo
go build -o /tmp/$PLUGIN_NAME .
```

### Plugin Configuration

In this step, you'll create a `command-line` type connection to interact with `bash`.
1. Create the connection and copy the connection id.

```shell
hoop admin create connection bash --overwrite --agent test-agent -- /bin/bash
```

2. Create the plugin and associate with the connection using the `id` returned from the previous request

```shell
hoop admin create plugin $PLUGIN_NAME --source path:/tmp/ --connection 'bash'
```

:::info
The `name` will refer to the name of the plugin app, the source `/tmp` indicates where to look for the plugin. In this case it will look up for `/tmp/demo` when interacting with the connection.
:::

### Interact with the Connection

In this step, you'll use hoop to interact with the connection and see how the plugin app behaves.

```shell
hoop connect bash
```

The terminal will show information about the loaded plugin, the entries with `host.demo` are returning from the plugin:

```log
{"level":"info","timestamp":"2023-04-18T18:46:16-03:00","logger":"agent/agent.go:297","msg":"session=e1381df0-67d6-430c-9964-ebb74829c19e - received connect request"}
(...)
{"@level":"info","@message":"[INFO]  starting demo plugin","@module":"host.demo","@timestamp":"2023-04-18T18:46:16.155577-03:00"}
{"@level":"info","@message":"[INFO]  opening session: session=e1381df0-67d6-430c-9964-ebb74829c19e plugin-envvars=map[] connection-name=bash connection-config=map[jsonb64:] connection-type=command-line connection-envs=\"map[envvar:HOOP_CONNECTION_NAME:YmFzaA== envvar:HOOP_CONNECTION_TYPE:Y29tbWFuZC1saW5l envvar:HOOP_SESSION_ID:ZTEzODFkZjAtNjdkNi00MzBjLTk5NjQtZWJiNzQ4MjljMTll envvar:HOOP_USER_ID:dGVzdC11c2Vy]\" connection-cmd=[\"/bin/
(...)
{"@level":"info","@message":"[INFO]  on-send: session=e1381df0-67d6-430c-9964-ebb74829c19e packet-type=ClientWriteStdout","@module":"host.demo","@timestamp":"2023-04-18T18:46:16.308356-03:00"}
{"@level":"info","@message":"[INFO]  on-send: session=e1381df0-67d6-430c-9964-ebb74829c19e packet-type=ClientWriteStdout","@module":"host.demo","@timestamp":"2023-04-18T18:46:16.308533-03:00"}
```

### Adding Configuration Secrets

In this step, we'll be adding secrets to the plugin resource.
1. Add a new configuration to the plugin

```shell
hoop admin create plugin $PLUGIN_NAME \
  --source path:/tmp/ \
  --connection 'bash' \
  --config MYSECRET=abigsecret \
  --overwrite
```

2. Interact with the connection running the command `ls`

```shell
hoop exec bash -i 'ls'
```

3. The logs will show the new configuration propagated as a base64 value, see `plugin-envvars`

```log
{"@level":"info","@message":"[INFO]  opening session: session=6f4ed25d-07a2-4740-bcfa-b241e398f628 plugin-envvars=map[MYSECRET:YWJpZ3NlY3JldA==] connection-name=bash connection-config=map[jsonb64:] connection-type=command-line connection-envs=\"map[envvar:HOOP_CONNECTION_NAME:YmFzaA== envvar:HOOP_CONNECTION_TYPE:Y29tbWFuZC1saW5l envvar:HOOP_SESSION_ID:NmY0ZWQyNWQtMDdhMi00NzQwLWJjZmEtYjI0MWUzOThmNjI4 envvar:HOOP_USER_ID:dGVzdC11c2Vy]\" connection-cmd=[\"/bin/bash\"] client-args=[] verb=exec user-id=test-user","@module":"host.demo","@timestamp":"2023-04-18T18:49:24.562706-03:00"}
```

### Mutating Connection Parameters

In this step, we'll be adding a code to mutate the parameters of a connection injecting a environment variable when the session starts.
1. Add the code below after the logger line inside the `OnSessionOpen` function and import the `encoding/base64` package.

```go
import (
        (...)
        "encoding/base64"

        (...)
)

  (...)
    if p.ConnectionEnvVars != nil {
      encEnvValue := base64.StdEncoding.EncodeToString([]byte(`envvalue`))
      p.ConnectionEnvVars["envvar:ENVSECRET"] = encEnvValue
      resp.ConnectionEnvVars = p.ConnectionEnvVars
    }
  (...)
```

2. Build it

```shell
go build -o /tmp/$PLUGIN_NAME .
```

3. Test it. The command below should show the environment variable `ENVSECRET=envvalue`

```shell
hoop exec bash -i 'env'
```

:::info
The response of each phase is used to mutate attribute from connection or packets, in this case we're mutating the environment variables of a connection in the begining of a session.
See the [pluginhooks source](https://github.com/hoophq/pluginhooks) to check attributes that could be mutate.
:::
