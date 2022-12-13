---
sidebar_position: 2
slug: /getting-started/saas
---

# Saas

Run Hoop on the cloud

To interact with Hoop, you need to deploy a piece of software, called Agent.
The Agent must have network access to your connections. 

The Agent will connect to Hoop Gateway, a piece of software running on the
Hoop cloud, that manages things like users, connections, plugins, and other things.

## Install hoop

```shell
brew tap hoophq/hoopcli https://github.com/hoophq/hoopcli
brew install hoop
```

:::tip
If you don't have `brew`, check it out the binary for your operating system architecture in the [releases page](https://github.com/hoophq/hoopcli/releases).
:::

Check the installation:
```shell
hoop version
# {"version":"0.0.70","git_commit":"bcc32e5ed7f836e82e5e9f9faa3284cf555c07e8","build_date":"2022-11-30T13:42:56Z","go_version":"go1.19.3","compiler":"gc","platform":"linux/amd64"}
```

## Start an Agent

```shell
$ hoop start agent

{"version":"0.0.71","git_commit":"4750dbd4bbe045be46af9a57bda4847a97593f80","build_date":"2022-11-30T16:54:52Z","go_version":"go1.19.3","compiler":"gc","platform":"linux/amd64"}
Trying remote server...
** UNREGISTERED AGENT **
Please validate the Agent in the URL: https://app.hoop.dev/agents/new/x-agt-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
...
```

The agent will try to register itself at Hoop, and if it is the first time, will
provide you with an URL.

## Copy the URL in your Browser
Or click (ctrl+click) the link to open it.

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/term-copy-agent-url.png)
![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-copy-agent-url.png)

## Fill in an Agent name and Create

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-agent.png)

Go back to the shell and verify that it is connected:
```shell
$ hoop start agent

{"version":"0.0.71","git_commit":"4750dbd4bbe045be46af9a57bda4847a97593f80","build_date":"2022-11-30T16:54:52Z","go_version":"go1.19.3","compiler":"gc","platform":"linux/amd64"}
Trying remote server...
** UNREGISTERED AGENT **
Please validate the Agent in the URL: https://app.hoop.dev/agents/new/x-agt-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
................connected...
```