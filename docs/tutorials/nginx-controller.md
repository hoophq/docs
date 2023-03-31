---
sidebar_position: 5
slug: /tutorials/nginx-controller
---

# Nginx Ingress Controller

This tutorial explains how to setup the [nginx ingress controller](http://localhost:3000/docs/tutorials/nginx-controller) to expose the hoop gateway web & gRPC services with TLS.

## Requirements

- EKS Cluster
- [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.2/)
- [Certbot command line](https://certbot.eff.org/instructions)
- [An Identity Provider configuration](../configuring/authentication/overview.md)

## Configuring Let's Encrypt

Request a certificate for the nginx ingress controller and configure it in your DNS system.

- **appdemo.hoop.dev (webapp/api)**

```shell
API_HOST=appdemo.hoop.dev
mkdir -p $HOME/certbot
certbot -d $API_HOST --manual --preferred-challenges dns certonly \
    --config-dir $HOME/certbot \
    --work-dir $HOME/certbot \
    --logs-dir $HOME/certbot
```

- **appdemo-grpc.hoop.dev (grpc)**

```shell
GRPC_HOST=appdemo-grpc.hoop.dev
certbot -d $GRPC_HOST --manual --preferred-challenges dns certonly \
    --config-dir $HOME/certbot \
    --work-dir $HOME/certbot \
    --logs-dir $HOME/certbot
```

## Creating TLS Secrets

1. Create the namespace

```shell
kubectl create ns appdemo
```

2. TLS Web / API

```shell
kubectl create secret tls tls-web -n appdemo \
	--key $HOME/certbot/live/$API_HOST/privkey.pem \
	--cert $HOME/certbot/live/$API_HOST/fullchain.pem
```

3. TLS gRPC

```shell
# grpc
kubectl create secret tls tls-grpc -n appdemo \
	--key $HOME/certbot/live/$GRPC_HOST/privkey.pem \
	--cert $HOME/certbot/live/$GRPC_HOST/fullchain.pem
```

## Nginx Controller Deployment

```shell
# https://kubernetes.github.io/ingress-nginx/deploy/
helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

Get the DNS of the load balancer provisioned by the ingress and configure a CNAME record in your DNS provider

```shell
LB_HOST=$(kubectl get svc -n ingress-nginx ingress-nginx-controller \
    -o 'jsonpath={.status.loadBalancer.ingress[0].hostname}')
```

#### Grpc

- CNAME: $LB_HOST
- CNAME VALUE: $GRPC_HOST

#### Web

- CNAME: $LB_HOST
- CNAME VALUE: $API_HOST

## Deploying Hoop

Deploy a postgres instance in your cluster

```shell
kubectl apply -n appdemo -f https://hoop.dev/docs/misc/postgres-deployment.yaml
```

[See this guide](../configuring/authentication/auth0.md) about how to create an oauth2 application on auth0. Export the variables below

```shell
export API_URL=https://$API_HOST
export IDP_ISSUER=
export IDP_CLIENT_ID=
export IDP_CLIENT_SECRET=
export IDP_AUDIENCE=
```

Deploy the gateway instance

```shell
# https://hoop.dev/docs/container-platforms/kubernetes
cat - > values.yaml <<EOF
config:
  API_URL: $API_URL
  IDP_ISSUER: $IDP_ISSUER
  IDP_CLIENT_ID: $IDP_CLIENT_ID
  IDP_CLIENT_SECRET: $IDP_CLIENT_SECRET
  IDP_AUDIENCE: "$IDP_AUDIENCE"
  LOG_LEVEL: debug
  LOG_GRPC: 2

# hoop gateway configuration. Please refer to https://hoop.dev/docs/configuring/gateway
xtdbConfig:
  PG_HOST: postgres.appdemo
  PG_PORT: '5432'
  PG_USER: root
  PG_PASSWORD: 1a2b3c4d
  PG_DB: hoopdb

ingressApi:
  enabled: true
  ingressClassName: nginx
  host: $API_HOST
  tlsSecret: tls-web

ingressGrpc:
  enabled: true
  ingressClassName: nginx
  annotations:
    nginx.ingress.kubernetes.io/backend-protocol: GRPC
  host: $GRPC_HOST
  tlsSecret: tls-grpc
EOF
```

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
helm upgrade --install hoop -n appdemo \
    https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoop-chart-$VERSION.tgz \
    -f values.yaml
```

### Signup

1. Configure hoop client

```shell
# configure the hoop client
mkdir -p $HOME/.hoop && cat - > $HOME/.hoop/config.toml <<EOF
api_url = "$API_URL"
grpc_url = "$GRPC_HOST:443"
EOF
```

2. Login / Signup

```shell
hoop login
```

## Registering an Agent

Deploying the agent will fallback to web registration, follow the post deploy instructions to fetch the link to subscribe the agent.

```shell
helm upgrade --install hoopagent -n appdemo \
    https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set "config.gateway.grpc_url=$GRPC_HOST:443"
```

The logs should output the link to register the agent.

```log
(...)

--------------------------------------------------------------------------
VISIT THE URL BELOW TO REGISTER THE AGENT
{API_URL}/agents/new/x-agt-...
--------------------------------------------------------------------------

(...)
```

### Troubleshooting

In case the agent begins to restart too often, increase the verbosity of gRPC to diagnose the problem

```shell
helm upgrade --install hoopagent -n appdemo \
    https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set "config.gateway.grpc_url=$GRPC_HOST:443" \
    --set "config.LOG_GRPC=2"
```

### Static Token

To prevent the agent to unregistering on restarts, persist the token that was previous registered

```shell
helm upgrade --install hoopagent -n appdemo \
    https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set "config.gateway.grpc_url=$GRPC_HOST:443" \
    --set "config.gateway.token=x-agt..."
```

## References

- https://kubernetes.github.io/ingress-nginx/deploy/#quick-start
- https://kubernetes.github.io/ingress-nginx/examples/grpc/