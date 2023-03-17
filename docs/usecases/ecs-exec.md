---
sidebar_position: 9
slug: /usecases/ecs-exec
---

# AWS ECS | exec

The AWS Elastic Container Service allows connecting to tasks and starting interactive sessions. It's possible to map these commands to Hoop to obtain interactive sessions allocating a pseudo TTY.

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
| `AWS_DEFAULT_REGION`    | env-var | The AWS region                     |

### Connection Command

```shell
ecs-exec.sh --interactive --cluster=$CLUSTER_NAME --service-name=$SERVICE_NAME
```

## How to Use

Start an interactive session 

```shell
hoop connect my-ecs -- --pipe /bin/bash
hoop connect my-ecs -- --pipe 'rails console'
hoop connect my-ecs -- --pipe clojure
```

