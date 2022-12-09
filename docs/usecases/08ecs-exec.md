---
sidebar_position: 8
slug: /usecases/ecs-exec-oneoff
---

# AWS ECS | exec one-off

The Elastic Container Service allows executing one off tasks of any type directly into ECS tasks/containers.

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
hoop exec ecs-exec -i 'echo "hello world from bash"'
```

:::info note
The `--pipe` command works as a [pipeline on Linux](https://en.wikipedia.org/wiki/Pipeline_(Unix)).
It's important that the command could accept input from stdin, e.g.: `echo 'ls -l' | /bin/sh`
:::

Calling scripts are easy too

```shell
hoop exec ecs-exec -i '/path/to/my/script.sh'
# override the ecs task-id
hoop exec ecs-exec -i '/path/to/my/script.sh' -- --task mytaskid
# execute a rails script
hoop exec ecs-exec -i 'rails runner /path/to/script.rb'
```