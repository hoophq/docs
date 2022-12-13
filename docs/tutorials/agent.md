---
sidebar_position: 1
slug: /tutorials/agent-deployment
---

# Agent Deployment

Tutorial explaining how to deploy and register an agent in multiple environments

## Requirements

- [Hoop Command Line](../quickstarts/cli.md)

## Login / Signup

Leave the default values pressing enter and type your e-mail in the end

```shell
$ hoop login
Press enter to leave the defaults
Host [app.hoop.dev]:
Port [8443]:
Email:
```

Your default browser will open and authenticate with your identity provider.

:::tip
If you don't have an organization yet, this process will perform the signup automatically
:::

### Local

- Start the agent locally

```shell
hoop start agent
```

:::info
The agent is only supported on Unix (MacOS/Linux)
:::

- Visit the URL show in the last command to register the agent

### Linux | systemd

Systemd is recommended and will help on managing the agent in the Linux server.

1. Login to the linux server via SSH and switch the user to root

```shell
sudo su -
```

2. Install and run the Agent

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
curl https://hoopartifacts.s3.amazonaws.com/release/${VERSION}/hoop_${VERSION}_Linux_$(uname -m).tar.gz \
    -o hoop-$VERSION.tar.gz
tar --extract --file hoop-$VERSION.tar.gz -C /usr/local/bin hoop && \
    rm -f hoop-$VERSION.tar.gz && \
    chown root: /usr/local/bin/hoop

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

systemctl daemon-reload
systemctl enable hoopagent.service
systemctl start hoopagent
```

3. Visit the URL and register the agent

```shell
$ journalctl -u hoopagent |grep -i 'https://app.hoop.dev/agents/new/x-agt' |tail -n1
Dec 13 21:59:21 node01 hoop[2545]: Please validate the Agent in the URL: https://app.hoop.dev/agents/new/x-agt-....
```

### Container Platforms

In this mode, the agent needs a token in advance set as an environment variable. A crash could wipe the state of the filesystem unregistering the agent.

1. In your local machine, execute the commands below to create an agent token.

:::info
You need to be an administrator and logged in to perform this action.
:::

```shell
AGENT_NAME=prod
ACCESS_TOKEN=$(cat ~/.hoop/config.toml  |grep Token |awk {'print $3'} |sed 's/"//g')
curl https://app.hoop.dev/api/agents \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d@- <<EOF
{"name": "$AGENT_NAME"}
EOF
{"id":"8edb234d-128f-492e-aa9e-51cef294ec61","token":"x-agt-39b6b28b-7f96-4558-bbd3-de0926e53b35","name":"prod","hostname":"","machine-id":"","kernel_version":"","status":""}
```

Copy the `token` attribute with the value `x-agt-...`

2. Deploy the image in the container platform

The runtime of most container platforms expects a specification of how to deploy the image:

- **image:** `hoophq/hoopdev`
- **environmet variables:**
  - `TOKEN` - the token required to connect with the gateway

The command above executed by the docker container runtime is enough to run the agent:

```shell
docker run --name hoopagent \
  -e TOKEN=x-agt-...
  hoophq/hoopdev
```

In Kubernetes for example, the [container specification](https://kubernetes.io/docs/reference/kubernetes-api/workload-resources/pod-v1/#containers) below would be enough to run the agent:

```yaml
(...)
    spec:
      containers:
      - name: defaultagent
        env:
        - name: TOKEN
          value: 'x-agt-...'
        image: hoophq/hoopdev
        tty: true
(...)
```

## Associating with Connections

The registered agent will be available and can be associated with a connection [in the webapp](https://app.hoop.dev/connections).

![agent selection](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-agent-selection.png)
