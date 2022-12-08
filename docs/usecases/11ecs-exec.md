---
sidebar_position: 11
slug: /usecases/ecs-exec-oneoff
---

# ECS Exec One Off | aws ecs cli

[The Elastic Container Service](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html) allows executing one off tasks of any type directly in any ecs task/container.

:::info important
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
ecs-exec.sh --base64 --cluster=$CLUSTER_NAME --service-name=$SERVICE_NAME
```

:::info important
The `--base64` option is a helper that encodes the input and decode it on execution. It's to prevent content leaking from the shell, like single or double quotes. It helps to address a limitation of the `aws ecs execute-command`.
:::

## How to Use

Now it's possible to execute ruby script straight from Hoop

```shell
hoop exec ecs-exec -- --shell "rails runner -" <<EOF
myvar='Hello from Rails'
puts myvar
EOF
hoop exec ecs-exec -i 'puts Rails.env' -- --shell 'rails runner -'
```

It's possible to use any command as shell

```shell
hoop exec ecs-exec -i '(println "Clojure REPL")' -- --shell 'clojure'
hoop exec ecs-exec -- --shell 'python3' <<EOF
import os
print(os.environ.get("CLUSTER_NAME"))
EOF
# defaults to /bin/bash
hoop exec ecs-exec -i 'echo "hello world from bash"'
```

> The `--shell` commands need to have the capability of accepting input from stdin.
> e.g.: `echo 'ls -l' | /bin/sh`

Calling scripts are easy too

```shell
hoop exec ecs-exec -i '/path/to/my/script.sh'
# override the ecs task-id
hoop exec ecs-exec -i '/path/to/my/script.sh' --task mytaskid
# execute a rails script
hoop exec ecs-exec -i 'rails runner /path/to/script.rb'
```
