---
sidebar_position: 11
slug: /usecases/ecs-exec
---

# AWS ECS | awscli

[The AWS Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html) allows connecting to tasks and starting interactive sessions. It's possible to map these commands to Hoop to obtain interactive sessions allocating a pseudo TTY.

:::info note
It's important to configure the ECS tasks before trying this feature, please refer to the [AWS documentation first](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html)
:::

## Connection Configuration

| Name                    | Type    | Description                        |
|------------------------ | ------- | ---------------------------------- |
| `CLUSTER_NAME`          | env-var | The name or arn of the ECS Cluster |
| `SERVICE_NAME`          | env-var | The name of the service on ECS     |
| `AWS_ACCESS_KEY_ID`     | env-var | The access key credential          |
| `AWS_SECRET_ACCESS_KEY` | env-var | The secret key credential          |
| `AWS_REGION`            | env-var | The AWS region                     |

### Connection Command

```shell
ecs-exec.sh --cluster=$CLUSTER_NAME --service-name=$SERVICE_NAME
```

## How to Use

Start an interactive session 

```shell
hoop connect ecs-exec -- --interactive --shell /bin/bash
hoop connect ecs-exec -- --interactive --shell rails console
hoop connect ecs-exec -- --interactive --shell clojure
```

In the same connection, one-off process can be run as well

```shell
hoop exec ecs-exec -i 'ls -l'
```

```shell
hoop exec ecs-exec -i 'ps aux'
# check how to interact with this connection script
hoop exec ecs-exec -- --help
```
