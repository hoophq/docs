---
sidebar_position: 5
slug: /usecases/k8s-oneoff
---

# Kubernetes | exec one-off

Processes could be spawn in an ad-hoc manner with `kubectl exec`. In some cases an interactive shell could be too much permissive.

## Connection Configuration

| Name         | Type       | Description                                                            |
|------------- | ---------- | ---------------------------------------------------------------------- |
| `KUBECONFIG` | filesystem | A [kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) with permission to exec into pods in a namespace   |

### Connection Command

```shell
kubectl exec --stdin deployment/myapp --
```

## How to Use

This example executes an one-off process using ruby.

```shell
hoop exec myapp-oneoff -- rails runner 'puts Rails.env'
```

Narrowing down the exec arguments, allow passing the stdin and executing ruby scripts.

- Edit the connection **command** with the bellow content

```shell
kubectl exec --stdin deployment/myapp -- rails runner -
```

Then, it's possible

```shell
hoop exec myapp-oneoff <<EOF
myvar='Hello'
puts myvar
EOF
```

The connection now runs one-off process accepting ruby scripts from the standard input.
