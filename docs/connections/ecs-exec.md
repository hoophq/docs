---
sidebar_position: 11
slug: /connections/ecs-exec
---

# AWS ECS

Interact with Elastic Container Service executing one off sessions into ECS tasks/containers.


This connection uses a wrapper script available in the `hoophq/hoopdev` image called `ecs-exec.sh`. This script requires the following permissions to work:

- `ecs:ListTasks`
- `ecs:DescribeTasks`
- `ecs:ExecuteCommand`

:::info note
It's important to configure the ECS tasks before trying this feature, please refer to the [AWS documentation first](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html)
:::

## Connection Configuration

| Name                    | Type    | Description                                          |
|------------------------ | ------- | ---------------------------------------------------- |
| `CLUSTER_NAME`          | env-var | The name or arn of the ECS Cluster                   |
| `SERVICE_NAME`          | env-var | The name of the service on ECS                       |
| `CONTAINER`             | env-var | The name of the container, default to the first one. |
| `AWS_ACCESS_KEY_ID`     | env-var | The access key credential                            |
| `AWS_SECRET_ACCESS_KEY` | env-var | The secret key credential                            |
| `AWS_DEFAULT_REGION`    | env-var | The AWS region                                       |

## Connection Configuration (Assume Role)

| Name                                     | Type    | Value               | Description                                                   |
|----------------------------------------- | ------- | ------------------- | ------------------------------------------------------------- |
| `CLUSTER_NAME`                           | env-var | -                   | The name or arn of the ECS Cluster                            |
| `SERVICE_NAME`                           | env-var | -                   | The name of the service on ECS                                |
| `CONTAINER`                              | env-var | -                   | The name of the container, default to the first one.          |
| `ECS_AGENT_URI`                          | env-var | `system.agent.envs` | The access key credential                                     |
| `AWS_EXECUTION_ENV`                      | env-var | `system.agent.envs` | ECS launch type                                               |
| `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` | env-var | `system.agent.envs` | full HTTP URL endpoint when making a request for credentials  |
| `ECS_CONTAINER_METADATA_URI_V4`          | env-var | `system.agent.envs` | This path returns metadata for the container.                 |
| `AWS_DEFAULT_REGION`                     | env-var | `system.agent.envs` | The default AWS region                                        |

:::info
The value `system.agent.envs` will expose the upstream environment variable from the agent to the connection allowing the wrapper script to use the IAM task role.
:::

## AWS ECS - Interactive Sessions

The AWS Elastic Container Service allows connecting to tasks and starting interactive sessions. It's possible to map these commands to Hoop to obtain interactive sessions allocating a pseudo TTY.

:::info note
It's important to configure the ECS tasks before trying this feature, please refer to the [AWS documentation first](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html)
:::

### Connection Command

```shell
ecs-exec.sh --interactive --cluster=$CLUSTER_NAME --service-name=$SERVICE_NAME
```

### How to Use

Start an interactive session 

```shell
hoop connect my-ecs -- --interactive --pipe /bin/bash
hoop connect my-ecs -- --interactive --pipe 'rails console'
hoop connect my-ecs -- --interactive --pipe clojure 
```

## AWS ECS - Execute one off commands

### Connection Command

```shell
ecs-exec.sh --cluster=$CLUSTER_NAME --service-name=$SERVICE_NAME
```

### How to Use

Now it's possible to execute ruby script straight from Hoop

```shell
hoop exec ecs-exec -- --pipe 'rails runner -' <<EOF
myvar='Hello from Rails'
puts myvar
EOF
hoop exec ecs-exec -i 'puts Rails.env' -- --pipe 'rails runner -'
```

:::info note
The `--pipe` option requires that the `base64` command is available in the image. It will be used to decode the content of the input to prevent content leaking from the shell, like single or double quotes. It helps to address a limitation of the `aws ecs execute-command`.
:::

It's possible to pipe any command

```shell
hoop exec ecs-exec -i '(println "Clojure REPL")' -- --pipe 'clojure'
hoop exec ecs-exec -- --pipe 'python3' <<EOF
import os
print(os.environ.get("CLUSTER_NAME"))
EOF
# defaults to /bin/bash
hoop exec ecs-exec --input 'echo "hello world from bash"'
```

:::info note
The `--pipe` command works as a [pipeline on Linux](https://en.wikipedia.org/wiki/Pipeline_(Unix)) and it will pipe the `--input` flag.
:::

Calling scripts are easy too

```shell
hoop exec ecs-exec -i '/path/to/my/script.sh'
# override the ecs task-id
hoop exec ecs-exec -i '/path/to/my/script.sh' -- --task mytaskid
# execute a rails script
hoop exec ecs-exec -i 'rails runner /path/to/script.rb'
```
