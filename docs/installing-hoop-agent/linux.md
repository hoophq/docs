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
VERSION=$(curl -s https://releases.hoop.dev/release/latest.txt)
curl https://releases.hoop.dev/release/${VERSION}/hoop_${VERSION}_Linux_$(uname -m).tar.gz \
    -o hoop-$VERSION.tar.gz
tar --extract --file hoop-$VERSION.tar.gz -C /usr/local/bin hoop && \
    rm -f hoop-$VERSION.tar.gz && \
    chown root: /usr/local/bin/hoop && \
    exit
```

Initialize the agent

```shell
hoop start agent
```

It will set-up the agent and ask to register the agent on hoop.dev UI

