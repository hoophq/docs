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
# use latest docker image or pin the version
image:
  gw:
    tag: latest
  xtdb:
    tag: latest
  agent:
    tag: latest

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
  ingressClassName: nginx
  annotations: {}
    # kubernetes.io/tls-acme: "true"

  host: hoop.yourdomain.tld
  # -- TLS secret name for nginx ingress
  # tlsSecret: ''

ingressGrpc:
  enabled: false
  ingressClassName: nginx
  annotations: {}
    # kubernetes.io/tls-acme: "true"

  host: hoop.yourdomain.tld
  # -- TLS secret name for nginx ingress
  # tlsSecret: ''
EOF
```

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
helm upgrade --install hoop \
  https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoop-chart-$VERSION.tgz \
  -f values.yaml
```

## Agent Deployment

Please refer to [agent configuration](../../configuring/agent.md) for more information.

Make sure to specify the gRPC address of your gateway instance, if you don't have a valid token, 
the agent will fallback to [web registration](../../configuring/agent.md#web-registration).

:::info
Our SaaS instance is configured as https://app.hoop.dev:8443. If you have your own gateway, provide a valid public address for the option `gateway.grpc_url`.
:::

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
helm upgrade --install hoopagent https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set 'config.gateway.grpc_url=https://app.hoop.dev:8443' \
    --set 'config.gateway.token='
```

### Full Configuration

```yaml
config:
  gateway:
    # the grpc url (http2) to connect in the gateway
    grpc_url: '<HOST:PORT>'
    # use a distinct tls server name to connect
    tls_server_name: ''
    # the token to be used to authenticate in the gateway
    token: ''
  # Autoregister will try to auto register if the agent has
  # access to the default xtdb address (127.0.0.1:3001).
  # Only useful for self-hosted installations.Non-empty values trigger 
  # A non empty value will enable this configuration.
  AUTO_REGISTER: ''
  # Log level control
  LOG_LEVEL: 'debug|info|warn|error'
  # Increase logs of gRPC debugging
  LOG_GRPC: '0|1|2'
```
