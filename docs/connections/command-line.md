---
sidebar_position: 1
slug: /connections/command-line
---

# Command-line

Interact in real-time with remote processes (bash, kubectl, etc)

:::info Quickstart with this connection
You can create this connection at hoop by <b><a target="_blank" href="https://app.hoop.dev/connections/command-line/new?data=ewogICJuYW1lIjogIm15LWJhc2giLAogICJ0eXBlIjogImNvbW1hbmQtbGluZSIsCiAgImNvbW1hbmQiOiBbCiAgICAiL2Jpbi9iYXNoIgogIF0KfQ==
">clicking here</a></b>
:::

## New Terminal (bash) connection

#### Click on the "New Connection" button

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-connection.png)

#### Pick the type Command Line

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-connection-modal-cmd.png)

#### Fill in some data and click Create

- **Name:** bash
- **Commands:** /bin/bash

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-cmd-bash-inputs.png)

#### Test the connection

Open a new terminal and type
```shell
$ hoop connect bash

connection: bash | session: e348532d-13f5-4984-8210-1890f1dd4217
root@f4584548f57c:/# 
```

You are now connected to the agent. Type some bash commands
```shell
root@f4584548f57c:/# ls -la
...
root@f4584548f57c:/# env
...
```

:::info Give it a try
Start with this at hoop.dev: <b><a target="_blank" href="https://app.hoop.dev/connections/command-line/new?data=ewogICJuYW1lIjogIm15LWJhc2giLAogICJ0eXBlIjogImNvbW1hbmQtbGluZSIsCiAgImNvbW1hbmQiOiBbCiAgICAiL2Jpbi9iYXNoIgogIF0KfQ==
">Create a bash connection</a></b>
:::
