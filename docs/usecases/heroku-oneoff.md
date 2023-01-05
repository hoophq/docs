---
sidebar_position: 7
slug: /usecases/heroku-oneoff
---

# Heroku one-off

This mode is less intrusive and allows executing [one-off dynos](https://devcenter.heroku.com/articles/one-off-dynos) that runs a standalone process with the state of your application code.

This mode is useful when it's needed to perform ad-hoc actions using the current state of your application code, like performing database migrations.

### Caveats

- Use of one-off dynos generates additional costs
- Doesn't allow to interact with the state of a running app

## Connection Configuration

| Name                    | Type    | Description                                      |
|------------------------ | ------- | ------------------------------------------------ |
| `HEROKU_API_KEY`        | env-var | The API KEY to interact with heroku platform API |

### Connection Command

```shell
/app/bin/heroku run --exit-code
```

- **[Connection Template](https://app.hoop.dev/connections/command-line/new?data=eyJuYW1lIjoiaGVyb2t1OnJ1biIsInR5cGUiOiJjb21tYW5kLWxpbmUiLCJzZWNyZXQiOnsiZW52dmFyOkhFUk9LVV9BUElfS0VZIjoiIn0sImNvbW1hbmQiOlsiL2FwcC9iaW4vaGVyb2t1IHJ1biAtLWV4aXQtY29kZSJdfQ==)**

## How to Use

Start an interactive session with the one-off dyno

```shell
# bash interactive session
hoop connect heroku:run -- --app [APP-NAME] bash
# python3 or rails console interactive session
hoop connect heroku:run -- --app [APP-NAME] python
hoop connect heroku:run -- --app [APP-NAME] rails console
```

In the same connection, one-off process can be run as well

```shell
hoop exec heroku:run -- --no-tty --app [APP-NAME] python3 <<EOF
import os
print(os.environ)
EOF
```

```shell
hoop exec heroku:run -- python3 <<EOF
import os
print(os.environ)
EOF
```

```shell
hoop exec heroku:run -i 'pp ENV' -- --no-tty --app [APP-NAME] rails runner -
hoop exec heroku:run -i 'import os; print(os.environ)' -- python3
hoop exec heroku:run -i 'uname -a' -- bash
```
