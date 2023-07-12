---
sidebar_position: 6
slug: /plugins/access-control
---

# Access Control

This plugin limits the access to connection resources. When it's enabled, connections will only show up if the user group matches.

## Configuring

Create the `access_control` plugin associating with the connection **bash**. Allow only access from groups `sre` and `devops`.

```shell
# as an admin user
hoop admin create agent default
hoop admin create connection bash -a default -- bash
hoop admin create plugin access_control --overwrite --connection 'bash:sre;devops'
```

Now, only the `sre` and `devops` teams can interact with this connection


```shell
# as a regular user
hoop connect bash
rpc error: code = NotFound desc = connection 'bash' not found
```

:::info
Users that belong to the `admin` group are not affected by this plugin
:::