---
sidebar_position: 3
slug: /installing/docker
---

# Docker

This guide helps you set up hoop with Docker.

## All In One

Start all components and test hoop locally (this requires Docker).

Follow the on-screen instructions to walk you through the solution.

```shell
hoop start
```

---

The command above is analougous to:

```shell
docker run -p 8009:8009 -p 8010:8010 -e PROFILE=dev --rm -it hoophq/hoop
```

- The port `8009` hosts the webapp, check it out at http://127.0.0.1:8009
- The port `8010` exposes the gprc gateway which lets you interact with `hoop exec|connect`
- The `PROFILE=dev` will fallback to start all required components.

## Gateway

To run a standalone gateway on Docker in production, check the [container-platforms generic guide](../container-platforms/generic) to see all the requirements.

## Agent

The image `hoophq/hoop` has the hoop command line, which can start each component individually.

```shell
docker run --rm -ti hoophq/hoop hoop start agent
```

To deploy a production agent, we recommend the image `hoophq/hoopdev`. It doesn't require passing any arguments.

```shell
docker run --rm -ti hoophq/hoopdev
```

:::info
The image `hoophq/hoopdev` is only suited for `amd64` architecture
:::
