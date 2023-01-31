---
sidebar_position: 4
slug: /installing/linux-vms
---

# Linux VM's

This guide helps you set up hoop on Linux VMs

## Agent

Systemd is recommended and will help on managing the agent in the Linux server.

### 1. Create a Systemd unit

```shell
cat - >/etc/systemd/system/hoopagent.service <<EOF
[Unit]
Description=Hoop Agent
After=network.target

[Service]
ExecStart=hoop start agent
Environment="HOME=/root"
StandardOutput=true
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF
```

### 2. Load and start the unit

```shell
systemctl daemon-reload
systemctl enable hoopagent.service
systemctl start hoopagent
```

### 3. Visit the URL and register the agent

```shell
journalctl -u hoopagent |grep -i 'https://app.hoop.dev/agents/new/x-agt' |tail -n1
Dec 13... hoop[2545]: Please validate the Agent in the URL: https://app.hoop.dev/agents/new/x-agt-...
```

:::info
When the VM restarts the agent will be unregistered if you aren't using a persistent volume.
:::