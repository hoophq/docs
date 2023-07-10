---
sidebar_position: 2
slug: /installing-hoop-agent/cli-linux
---

# Linux

Install or Upgrade

1. Gain root access to the operating system

```shell
sudo su -
```

2. Download and install the hoop binary

```shell
curl -s -L https://releases.hoop.dev/release/install-cli.sh | sh
```

Initialize the agent

```shell
hoop start agent
```

It will set-up the agent and ask to register the agent on hoop.dev UI

