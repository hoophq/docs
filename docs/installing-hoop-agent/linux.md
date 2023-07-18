---
sidebar_position: 2
slug: /installing-hoop-agent/cli-linux
---

# Linux

We recommend using [systemd](https://systemd.io/) to manage the hoop agent

1. Download and install the hoop binary

```shell
curl -s -L https://releases.hoop.dev/release/install-cli.sh | sh
```

2. Install the `hoopagent` systemd unit

:::info
Make sure to create a token in your local machine before starting the agent. E.g.:
`hoop admin create token`
:::

```shell
# create in your local machine issuing: hoop admin create agent <name>
export HOOP_TOKEN=<TOKEN>
cat - >/etc/systemd/system/hoopagent.service <<EOF
[Unit]
Description=Hoop Agent
After=network.target

[Service]
ExecStart=hoop start agent
Environment="HOME=/root"
Environment="HOOP_TOKEN=<TOKEN>"
Environment="HOOP_GRPCURL=app.hoop.dev:8443"
StandardOutput=true
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF
```

3. Reload the unit and start it

```shell
systemctl daemon-reload
systemctl enable hoopagent.service
systemctl start hoopagent
```
