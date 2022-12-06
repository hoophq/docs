---
sidebar_position: 4
slug: /usecases/k8s-resources
---

# Kubernetes Resources

Hoop could be configured to use the kubectl command line to manage resources or execute actions on workloads in Kubernetes.

## Connection Configuration

- **KUBECONFIG** - A Kubeconfig file with permission to get pods, rollout and scale deployments.
- **COMMAND**

```shell
kubectl
```

## How to Use

```shell
# view pods in the default namespace
hoop exec k8s -- get pods
# restart an app
hoop exec k8s -- rollout restart deployment/myapp
# scale up an app
hoop exec k8s -- scale --replicas=3 deployment/myapp
```

It's possible to narrow down the commands in distinct connections, this gives a better user experience:

- Update the connection with the **command** bellow

```shell
kubectl --namespace prod rollout
```

Then it's possible to:

```shell
hoop exec k8s -- restart deployment/myapp
hoop exec k8s -- undo deployment/myapp
```