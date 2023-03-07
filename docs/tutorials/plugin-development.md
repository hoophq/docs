---
sidebar_position: 4
slug: /quickstarts/plugin-development
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
hoop start agent
```

### Plugin App Setup

In this step, you'll build and run the plugin sample application

1. Clone the sample app repo

```shell
git clone https://github.com/hoophq/plugin-demo && cd plugin-demo
```

2. Build the plugin at /tmp/demo

```shell
go build -o /tmp/demo .
```

### Plugin Configuration

In this step, you'll create a `command-line` type connection to interact with `bash`.
1. Create the connection and copy the connection id.

```shell
curl http://127.0.0.1:8009/api/connections -H 'Content-Type: application/json' -d@- <<EOF
{
  "name": "bash",
  "agent_id": "test-agent",
  "type": "command-line",
  "command": ["/bin/bash"]
}
EOF
# add the id of the connection in the line below
export CONNECTION_ID=
```

2. Create the plugin and associate with the connection using the `id` returned from the previous request

```shell
curl http://127.0.0.1:8009/api/plugins -H 'Content-Type: application/json' -d@- <<EOF
{
  "name": "demo",
  "source": "path:/tmp",
  "connections": [
    {
      "id": "$CONNECTION_ID",
      "name": "bash",
      "config": []
    }
  ]
}
EOF
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
2023/01/20 19:11:27 session=cf553905-8d1d-4762-9478-3d4045bac037 - received connect request
(...)
2023/01/20 19:11:27 loading plugin. name=demo,source=path:/tmp,registry=
2023/01/20 19:11:27 plugin loaded into filesystem. cached=false,path=/tmp
(...)
2023-01-20T19:11:27.701-0300 [DEBUG] host.demo: 2023-01-20T19:11:27.701-0300 [INFO]  starting demo plugin
(...)
2023-01-20T19:11:27.703-0300 [DEBUG] host.demo: 2023-01-20T19:11:27.703-0300 [INFO]  opening session: session=cf553905-8d1d-4762-9478-3d4045bac037 plugin-envvars=map[] connection-name=bash connection-config=map[jsonb64:] connection-type=command-line connection-envs=map[] connection-cmd=["/bin/bash"] client-args=[] verb=connect user-id=test-user
(...)
2023-01-20T19:11:27.710-0300 [DEBUG] host.demo: 2023-01-20T19:11:27.710-0300 [INFO]  on-send: session=cf553905-8d1d-4762-9478-3d4045bac037 packet-type=ClientWriteStdout
2023-01-20T19:11:27.710-0300 [DEBUG] host.demo: 2023-01-20T19:11:27.710-0300 [INFO]  on-send: session=cf553905-8d1d-4762-9478-3d4045bac037 packet-type=ClientWriteStdout
```

### Adding Configuration Secrets

In this step, we'll be adding secrets to the plugin resource.
1. Add a new configuration to the plugin

```shell
# the value must be configured as base64
curl http://127.0.0.1:8009/api/plugins/demo/config -XPUT -d@- <<EOF
{
  "MYSECRET": "U0VDUkVULVZBTA=="
}
EOF
```

2. Interact with the connection running the command `ls`

```shell
hoop exec bash -i 'ls'
```

3. The logs will show the new configuration propagated as a base64 value, see `plugin-envvars`

```log
2023-01-20T19:19:47.906-0300 [DEBUG] host.demo: 2023-01-20T19:19:47.905-0300 [INFO]  opening session: session=bc97d4af-45b0-4d94-bb5f-38d5cc2653fe plugin-envvars=map[MYSECRET:U0VDUkVULVZBTA==] connection-name=bash connection-config=map[jsonb64:] connection-type=command-line connection-envs=map[] connection-cmd=["/bin/bash"] client-args=[] verb=exec user-id=test-user
```

### Mutating Connection Parameters

In this step, we'll be adding a code to mutate the parameters of a connection injecting a environment variable when the session starts.
1. Add the code below after the logger line inside the `OnSessionOpen` function

```go
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
go build -o /tmp/demo .
```

3. Test it. The command below should show the environment variable `ENVSECRET=envvalue`

```shell
hoop exec -i 'env'
```

:::info
The response of each phase is used to mutate attribute from connection or packets, in this case we're mutating the environment variables of a connection in the begining of a session.
See the [pluginhooks source](https://github.com/hoophq/pluginhooks) to check attributes that could be mutate.
:::
