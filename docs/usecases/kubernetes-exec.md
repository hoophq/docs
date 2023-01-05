---
sidebar_position: 4
slug: /usecases/k8s-exec
---

# Kubernetes | exec

`kubectl` provides ways of creating interactive sessions with pods. It's possible to map these commands to Hoop to obtain interactive sessions allocating a pseudo TTY.

## Connection Configuration

| Name         | Type       | Description                                                            |
|------------- | ---------- | ---------------------------------------------------------------------- |
| `KUBECONFIG` | filesystem | A [kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) with permission to exec into pods in a namespace   |

### Connection Command

```shell
kubectl exec --tty --stdin deployment/myapp --
```

## How to Use

Start an interactive bash session with a deployment/pod

```shell
hoop connect myapp -- bash
```

This will open an interactive session with the deployment `myapp`.
It's possible to map any command that spawns an interactive session.

Then, it's possible to gain a rails console session

```shell
hoop connect myapp -- rails console
```

:::info IMPORTANT
Note that `kubectl exec` is used with `-tty` and `--stdin` arguments. These flags are required when using `hoop connect`.
:::
