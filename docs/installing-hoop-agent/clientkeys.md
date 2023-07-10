---
sidebar_position: 1
slug: /installing-hoop-agent/clientkeys
title: Client Keys
show: false
---

# Client Keys

Client keys are required for agents to authenticate in the gateway. The name of the key is used as the prefix when publishing connections, it acts as an tenancy configuration for workloads (e.g.: homolog, prod, dev, etc)

:::info
Client keys are only used on [embedded mode](./embedded.md).
:::

To create a client key, issue the command below:

```shell
hoop admin create clientkeys dev
```

This key will publish the connection as `dev:myapp` when the agent starts.

:::caution IMPORTANT
Client keys must be configured in their proper workload environment, otherwise users could issue commands in wrong workloads. E.g.: like issuing a command in a **homolog** connection that is configured for a **production** workload.
:::

## Connection Resources

The `HOOP_CONNECTION` environment variable contains a list of resources that are published in the webapp dashboard.

### Specifying Multiple Connections

Sometimes it's prefered to publish more than one connection to specify different profile access. Like activating the redact to a connection and having another connection with review. To publish multiple connections, separate the names with a comma.

- `HOOP_CONNECTION=myapp-redact,myapp-review`

> There's a limitation of 255 characteres, make sure to not exceed it.

This will publish multiple connections to the dashboard.

:::info tip
It's possible to derive the connection from an environment variable by using the prefix `env.`. Example: `HOOP_CONNECTION=env.APP_NAME`
:::
