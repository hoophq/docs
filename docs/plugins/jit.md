---
sidebar_position: 3
slug: /plugins/jit
---

# JIT (Just in time)

Promote more security for the organization and freedom for developers at the same time by allowing developers to request a session of time to execute commands within a connection.

:::info note
Remember it, this plugin will allow the users only use the `connect` command to access the connections, like it:

```shell
hoop connect bash
```

No `exec` command will be allowed at this time.
For more details about this command access [Command Line](https://hoop.dev/docs/connections/command-line)
:::

## Disabling / Enabling DLP Plugin

Check out our plugin store on [Portal Hoop](https://app.hoop.dev/plugins/store) and install the JIT into your organization by clicking on the button "Install Plugin".

You can manage it by clicking "Manage plugin" in our header and then clicking "jit". This will allow you to configure the JIT on any connection however you like.

### Approval groups

These are the groups that are allowed to approve when requested by a user who wants to connect on any connection with JIT installed.

## Reviewing one connecting request

When JIT is installed, a page will be released in the header of your application where it will allow you to view all sessions requested by users to be approved.
