---
sidebar_position: 2
slug: /container-platforms/kubernetes
---

# Kubernetes

This guide explains how to install hoop in a Kubernetes cluster.


## Gateway Deployment

The gateway requires a Postgres database. Please refer to [gateway configuration](../../configuring/gateway.md) for more options.

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
cat - > ./values.yaml <<EOF
# hoop gateway configuration. Please refer to https://hoop.dev/docs/configuring/gateway
config:
  API_URL: ''
  IDP_ISSUER: ''
  IDP_CLIENT_ID: ''
  IDP_CLIENT_SECRET: ''

# hoop gateway configuration. Please refer to https://hoop.dev/docs/configuring/gateway
xtdbConfig:
  PG_HOST: ''
  PG_PORT: "5432"
  PG_USER: ''
  PG_PASSWORD: ''
  PG_DB: ''
EOF
helm install hoop -f values.yaml \
    hoop https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoop-chart-$VERSION.tgz
```

## Agent Deployment

Please refer to [agent configuration](../../configuring/agent.md) for more options.

:::info
The `SERVER_ADDRESS` option must be used when it's a self-hosted installation. It must point to the gRPC server of gateway. E.g.:
hoop.yourdomain.tld:8010. It connects to the remote server via TLS.
:::

```shell
helm install hoopagent https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set 'config.SERVER_ADDRESS='
```
