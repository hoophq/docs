---
sidebar_position: 2
slug: /quickstarts/index
---

# SaaS

Connect to Hoop in the Cloud with our agent.

## Requirements

- Hoop Command Line installed locally.
- [Signup at Hoop Dev](https://app.hoop.dev)

## Start an Agent

```shell
$ hoop start agent

{"version":"0.0.71","git_commit":"4750dbd4bbe045be46af9a57bda4847a97593f80","build_date":"2022-11-30T16:54:52Z","go_version":"go1.19.3","compiler":"gc","platform":"linux/amd64"}
Trying remote server...
** UNREGISTERED AGENT **
Please validate the Agent in the URL: https://app.hoop.dev/agents/new/x-agt-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
...
```

Running the agent for the first time requires a registration, click in the link to proceed.

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
