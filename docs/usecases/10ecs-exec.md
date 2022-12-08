---
sidebar_position: 10
slug: /usecases/ecs-exec
---

# ECS Exec | aws ecs cli

[The AWS Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html) allows connecting to tasks and starting interactive sessions. It's possible to map these commands to Hoop to obtain interactive sessions allocating a pseudo TTY.

## Connection Configuration

| Name                    | Type    | Description                        |
|------------------------ | ------- | ---------------------------------- |
| `CLUSTER_NAME`          | env-var | The name or arn of the ECS Cluster |
| `AWS_ACCESS_KEY_ID`     | env-var | The access key credential          |
| `AWS_SECRET_ACCESS_KEY` | env-var | The secret key credential          |
| `AWS_REGION`            | env-var | The AWS region                     |

### Command

```shell
ecs-exec.sh --cluster=$CLUSTER_NAME --service-name $SERVICE_NAME
```

:::info important
It's important to configure the ECS tasks before trying this feature, please refer to the [AWS documentation first](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html)
:::

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
