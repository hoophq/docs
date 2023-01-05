---
sidebar_position: 8
slug: /usecases/heroku-psexec
---

# Heroku | exec

The `ps-exec.sh` utility is a wrapper for the `heroku ps:exec` command. It starts an [SSH](https://en.wikipedia.org/wiki/Secure_Shell) server daemon alongside the processes that are running in the dyno.

This mode is useful when there's a necessity to check or change the state of an application in a particular dyno. However it's more intrusive since it allows to interact it directly with the state of the app.

### Caveats

- Sometime the command fails silently to get executed 
- Requires restarting dynos if this feature is not eanabled for the app
- Sometimes requires restarting the dyno informing that the dyno is not available

## Connection Configuration

| Name                    | Type    | Description                                      |
|------------------------ | ------- | ------------------------------------------------ |
| `HEROKU_API_KEY`        | env-var | The API KEY to interact with heroku platform API |

### Connection Command

```shell
/app/bin/ps-exec.sh
```

## How to Use

:::caution WARNING
This modes requires the feature [runtime-heroku-exec](https://devcenter.heroku.com/articles/exec), the `ps-exec.sh` script will restart the app without any prompt if the feature is not enabled. [Reference](https://github.com/hoophq/heroku-hoop-agent/blob/main/bin/ps-exec.sh)
:::

Check the help usage for this connection

```shell
hoop exec psexec -- --help
```

Starting an interactive session

```shell
# bash interactive session
hoop connect psexec -- --interactive --app [APP-NAME]
```

:::info
The `heroku ps:exec` command doesn't allow starting interactive sessions with other processes, only with `bash`.
:::

To run one-off processes. The `--pipe` option [pipes the command](https://en.wikipedia.org/wiki/Pipeline_(Unix)) to the given executable in the app.

```shell
hoop exec psexec -- --app [APP-NAME] --pipe 'rails runner -' <<EOF
import os
print(os.environ)
EOF

# run in a specific dyno
hoop exec psexec -i 'pp ENV' -- --app [APP-NAME] --dyno web.2 --pipe 'rails runner -'
hoop exec psexec -i 'ls -l' -- --app [APP-NAME] --pipe 'bash'
echo 'import os; print(os.environ)' | hoop exec psexec -- --app [APP-NAME] --pipe 'python'
```

Check the status of the SSH

```shell
hoop exec psexec -- --app [APP-NAME] --status
```