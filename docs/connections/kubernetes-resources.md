---
sidebar_position: 6
slug: /usecases/k8s/resources
---

# Kubernetes | resources

Hoop could be configured to use the kubectl command line to manage resources or execute actions on workloads in Kubernetes.

## Connection Configuration

| Name         | Type       | Description                                                            |
|------------- | ---------- | ---------------------------------------------------------------------- |
| `KUBECONFIG` | filesystem | A [kubeconfig file](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) with permission to exec into pods in a namespace   |

### Connection Command

```shell
kubectl
```

## How to Use

```shell
# view pods in the default namespace
hoop exec my-conn-k8s -- get pods
# restart an app
hoop exec k8s -- rollout restart deployment/myapp
# scale up an app
hoop exec my-conn-k8s -- scale --replicas=3 deployment/myapp
```

It's possible to narrow down the commands in distinct connections, this gives a better user experience

- Update the connection with the **command** bellow

```shell
kubectl --namespace prod rollout
```

Then it's possible

```shell
hoop exec my-conn-k8s -- restart deployment/myapp
hoop exec my-conn-k8s -- undo deployment/myapp
```