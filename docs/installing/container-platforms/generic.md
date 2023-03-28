---
sidebar_position: 10
slug: /container-platforms/generic
---

# Generic

This guide explains how to deploy hoop on generic container platforms.

## Gateway Deployment

To deploy the gateway in a container platform, we recommed using the image `hoophq/hoop`.

- required arguments: `hoop start gateway`
- exposed ports: `8009`, `8010`
- required environment variables:
  - API_URL
  - IDP_ISSUER
  - IDP_AUDIENCE (required by most identity provider platforms)
  - IDP_CLIENT_ID
  - IDP_CLIENT_SECRET
  - XTDB_ADDRESS

The container platform need to allow passing arguments to the container. In docker for example, this is analougous to:

```shell
docker run hoophq/hoop hoop start gateway
```

The gateway needs to be able to reach an xtdb instance which is provided by the image `hoophq/xtdb`.

- exposed ports: `3001`
- required environment variables:
  - PG_HOST
  - PG_PORT
  - PG_DB
  - PG_USER
  - PG_PASSWORD

## Agent Deployment

The recommended image is `hoophq/hoopdev` which contains all the required tools installed, it's only supported for `amd64` architecture.

- environment variables:
  - HOOP_TOKEN (the agent will unregister on restarts if it's not set)

