---
sidebar_position: 4
slug: /usecases/k8s-exec
---

# Kubernetes | exec

Since kubectl provides ways of creating interactive sessions with pods. It's possible to map these commands to Hoop to obtain interactive sessions allocating a pseudo TTY.

## Connection Configuration

- **KUBECONFIG** - A Kubeconfig file with permission to exec into pods of a namespace
- **COMMAND**

```shell
kubectl exec --tty --stdin deployment/myapp -- bash
```

## How to Use

Start an interactive bash session with a deployment/pod

```shell
hoop connect myapp-interactive
```

This will open an interactive session with the deployment `myapp`.
It's possible to map any command that spawns an interactive session.

To connect to rails console, update the connection with the **command** bellow

```shell
kubectl exec --tty --stdin deployment/myapp -- rails console
```

Then, it's possible to gain a rails console session

```shell
hoop connect myapp-interactive
```

> Note that `kubectl exec` is used with `-tty` and `--stdin` arguments. These flags are required when using `hoop connect`.