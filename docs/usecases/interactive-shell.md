---
sidebar_position: 1
slug: /usecases/postgres
---

# Interactive Shell

Connect to an interact shell in a private network

## Kubernetes Pod Exec

### Requirements
- A **Kubeconfig** file with permission to perform exec in a POD
- Create a connection with command: `kubectl exec -t <myapp> -n <namespace> -- bash`

```shell
hoop connect myapp-bash
```

## AWS ECS Shell 

### Requirements
- [AWS credentiasl with permission](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html) to exec into a container.
- Create a connection with command: `aws ecs execute-command --interactive --task <mytask> --cluster <mycluster> --command /bin/bash`

```shell
hoop connect myapp-bash
```

## Heroku Shell

### Requirements
- [A Heroku API Key](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html) with permission to run an one-off process inside a dyno.
- Create a connection with command: `heroku run --app <myapp> bash`

```shell
hoop connect myapp-bash
```