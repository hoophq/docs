---
sidebar_position: 4
slug: /plugins/review
---

# Review

This plugin allow teams to review commands before they are executed or allowing time based sessions.

Users are allowed to approve or revoke commands if they belong to an **approval group**. A command is only executed when all groups are approved.

## Time Based Sessions (JIT)

When enabled for a connection, the user will be able to interact with the connection based on the requested time.

The command below asks for a 10 minutes access to the connection `bash`

```shell
$ hoop connect bash --duration 10m
⣷ waiting session to be approved at https://app.hoop.dev/plugins/reviews/73a28154-58...
```

After approved, the user could connect again without prompting for review during 10 minutes.

:::info
A JIT review could be revoked.
:::

## One Time

It will ask for a review every time a command is issued.

```shell
$ hoop exec bash -i 'ls -l'
⣷ waiting session to be approved at https://app.hoop.dev/plugins/reviews/73a28154-58...
```

## Configuring

Create the review plugin associating with the connection **bash**. Configure the approval groups `sre` and `devops`

```shell
hoop admin create connection bash -a default -- bash
hoop admin create plugin review --overwrite --connection 'bash:sre;devops'
```

Create a connection and associate to the existing plugin review

```shell
hoop admin create connection bash --overwrite -a default --plugin 'review:sre;devops' -- bash
```

### Information Available

- User ID
- Connection Name
- Command / Input
- Approval Groups
- Status
