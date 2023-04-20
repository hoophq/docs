---
sidebar_position: 5
slug: /installing-hoop-agent/kubernetes
title: Kubernetes
show: false
---

# Kubernetes

**Helm command line**

Make sure you have helm installed in your machine. Check [Helm installation page](https://helm.sh/docs/intro/install/)

## Create an Agent Token

```shell
hoop login
AGENT_NAME=main
HOOP_TOKEN=$(hoop admin create agent $AGENT_NAME)
```

## Deploy it

:::info
Our SaaS instance is configured as https://app.hoop.dev:8443. If you have your own gateway, provide a valid public address for the option `config.gateway.grpc_url`.
:::

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
helm upgrade --install hoopagent https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set "config.gateway.grpc_url=https://app.hoop.dev:8443" \
    --set "config.gateway.token=$HOOP_TOKEN"
```
