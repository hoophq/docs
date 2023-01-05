---
sidebar_position: 16
slug: /usecases/heroku-exec
---

# Heroku | exec

Heroku has commands that allows connecting to dynos and start interactive sessions. There're two modes of interacting with apps running in heroku: using `heroku ps:exec` or `heroku run`

## heroku ps:exec

The `heroku ps:exec` command is a feature that starts a [SSH](https://en.wikipedia.org/wiki/Secure_Shell) server daemon alongside the processes that are running in the dyno.

This mode is useful when it's needed to check or change the state of your application in a particular dyno. However it's more intrusive since it allows to interact it directly with the state of the application.

:::caution WARNING
This modes requires the feature [runtime-heroku-exec](https://devcenter.heroku.com/articles/exec), which requires restarting the dyno for the first time. Use it with care.
:::

### Caveats

- Sometime the command fails silently to get executed 
- Requires restarting dynos if this feature is not eanabled
- Sometimes requires restarting the dyno informing that the dyno is not available

## heroku run

This mode is less intrusive and allows executing [one-off dyno's](https://devcenter.heroku.com/articles/one-off-dynos) that runs a standalone dyno with the state of your application code.

This mode is useful when it's needed to perform ad-hoc actions using the current state of your application code, like performing database migrations.

### Caveats

- Uses one-off dynos that generates additional costs
- Doesn't allow to interact with the current state of the application

## Connection Configuration

| Name                    | Type       | Description                         |
|------------------------ | ------- | -------------------------------------- |
| `HEROKU_API_KEY`        | env-var | The SSH key to connect into servers    |

### Connection Command

```shell
ssh $SSH_URI -i $SSH_PRIVATE_KEY
```

## How to Use

Start an interactive session with ssh remote server

```shell
# bash interactive session
hoop connect node01
# python3 interactive session
hoop connect node01 -- -t python3
```

In the same connection, one-off process can be run as well

```shell
hoop exec node01 -- python3 <<EOF
import os
print(os.environ)
EOF

hoop exec node01 -i 'import os; print(os.environ)' -- python3
hoop exec node01 -- 'uname -a'
```
