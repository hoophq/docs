---
sidebar_position: 2
slug: /container-platforms/kubernetes
---

# Kubernetes

This guide explains how to install hoop in a Kubernetes cluster.

**Chart Repository:** https://github.com/hoophq/helm-chart

## Gateway Deployment

The gateway requires a Postgres database. Please refer to [gateway configuration](../../configuring/gateway.md) for more information.

```shell
cat - > ./values.yaml <<EOF
# hoop gateway configuration. Please refer to https://hoop.dev/docs/configuring/gateway
config:
  API_URL: ''
  IDP_ISSUER: ''
  IDP_CLIENT_ID: ''
  IDP_CLIENT_SECRET: ''
  IDP_AUDIENCE: ''
  IDP_CUSTOM_SCOPES: ''
  LOG_LEVEL: info

# hoop gateway configuration. Please refer to https://hoop.dev/docs/configuring/gateway
xtdbConfig:
  PG_HOST: ''
  PG_PORT: "5432"
  PG_USER: ''
  PG_PASSWORD: ''
  PG_DB: ''

persistence:
  enabled: false
  storageClassName: ''

ingressApi:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"

  host: hoop.yourdomain.tld

ingressGrpc:
  enabled: false
  annotations: {}
    # kubernetes.io/ingress.class: nginx
    # kubernetes.io/tls-acme: "true"

  host: hoop.yourdomain.tld
EOF
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
helm install hoop \
  https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoop-chart-$VERSION.tgz \
  -f values.yaml
```

To upgrade to a newer version or change a configuration:

```shell
helm upgrade hoop \
  https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoop-chart-$VERSION.tgz \
  -f values.yaml
```

## Agent Deployment

Please refer to [agent configuration](../../configuring/agent.md) for more information.

:::info
The `HOOP_GRPCURL` option must be used when it's a self-hosted installation. It must point to the gRPC server of gateway. E.g.:
hoop.yourdomain.tld:8443. It connects to the remote server via TLS.
:::

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
helm install hoopagent https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set 'config.HOOP_GRPCURL='
```

To upgrade to a newer version or change a configuration:

```shell
helm upgrade hoopagent https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set 'config.HOOP_TOKEN=<STATIC-TOKEN>'
```