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

- Create a new connection called `kubectl-rollout` with the **command** bellow

```shell
kubectl --namespace prod rollout restart
```

Then it's possible to:

```shell
hoop exec kubectl-rollout -- deployment/myapp
```

## Interactive Shells

Since kubectl provides ways of creating interactive sessions with the cluster, you could also map these commands to Hoop to obtain interactive sessions allocating a pseudo TTY.

## Requirements

Create a connection in the webapp named `k8s`:

- **Configuration File | KUBECONFIG**

A valid Kubeconfig file with permission to access resources on Kubernetes.

> It's possible tp bootstrap the required credentials of the cluster issuing:
> `hoop bootstrap k8s token-granter --clusterrole=view`

## How to Use

Start an interactive bash session with a deployment/pod.

- Create a new connection named `myapp-bash` with the command

```shell
kubectl exec --tty --stdin deployment/myapp -- bash
```

Then, it's possible to:

```shell
hoop connect myapp-bash
```

This will open an interactive session with the deployment `myapp`.
It's possible to map any command that spawns an interactive session.

To connect to rails console, create a connection named `myapp-rails-console` with the command

```shell
kubectl exec --tty --stdin deployment/myapp -- rails console
```

Then, it's possible to:

```shell
hoop connect myapp-rails-console
```

## One Off Processes

Processes could be spawn in an ad-hoc manner with `kubectl exec`, without the need for an interactive shell with could be too much permissive in some cases.

## Requirements

Create a connection in the webapp named `myapp-oneoff`:

- **Configuration File | KUBECONFIG**

A valid Kubeconfig file with permission to access resources on Kubernetes.

> It's possible tp bootstrap the required credentials of the cluster issuing:
> `hoop bootstrap k8s token-granter --clusterrole=view`

- **The command that will run on your connection**

```shell
kubectl exec --stdin deployment/myapp --
```

## How to Use

This example executes an one-off process using ruby.

```shell
hoop exec myapp-oneoff -- rails runner 'puts Rails.env'
```

To narrow down the connection, then it's possible to use the stdin of hoop to pass ruby scripts.

- Create a new connection named `myapp-ruby` with the following command

```shell
kubectl exec --stdin deployment/myapp -- rails runner -
```

Then, it's possible to:

```shell
hoop exec myapp-ruby <<EOF
myvar='Hello'
puts myvar
EOF
```

The connection now runs one-off process accepting ruby scripts from the standard input.
