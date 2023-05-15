---
sidebar_position: 7
slug: /tutorials/runops-migration
---

# Runops Migration

This guide explains how to migrate from runops to hoop. The supported features and targets are described below

## Supported Targets

- [x] mysql / mysql-csv
- [x] postgres / postgres-csv
- [x] sql-server
- [ ] python
- [ ] k8s types (exec, apply, k8s)
- [ ] ecs-exec
- [ ] mongo
- [ ] elixir, python, clojure, node, bash

## Supported Features

- [x] env-var / aws / runops secret providers as [secrets manager plugin](https://hoop.dev/docs/plugins/secrets-manager)
- [x] secret mapping as [secrets manager plugin](https://hoop.dev/docs/plugins/secrets-manager)
- [x] groups as access control plugin
- [x] agent
- [x] slack as [slack plugin](https://hoop.dev/docs/plugins/slack)
- [x] review groups as [review plugin](https://hoop.dev/docs/plugins/review)
- [x] redact as [dlp plugin](https://hoop.dev/docs/plugins/dlp)
- [ ] templates
- [ ] targets with `custom commands`
- [ ] [runops-proxy](https://www.runops.io/docs/runopsproxy/)
- [ ] custom commands
- [ ] agent hooks

---

## Requirements

1. Install [node](https://nodejs.org/en/download) and the runops command line

```shell
npm install -g runops
```

2. Install the [hoop command line](https://hoop.dev/docs/installing/command-line)

3. Login to runops

```shell
runops login
```

4. Login to your hoop instance

```shell
hoop login
```

:::info
Contact the technical support if you don't know the address of your hoop gateway instance.
:::

## Migrating

The migration is simple, it will just output the commands required to deploy a new hoop agent and install/configure the connections and plugins.

```shell
hoop admin target-to-connection <my-target> --grpc-url hoop-gw-instance:8443
```

### Example

In this example we have a `mysql` connection and our gateway instance is hoop SaaS (app.hoop.dev:8443).

```shell
$ hoop admin target-to-connection db-write --grpc-url app.hoop.dev:8443

AGENT_TOKEN=$(hoop admin create agent eks)
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
helm upgrade --install hoopagent \
    https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
	--set "config.gateway.grpc_url=app.hoop.dev:8443" \
	--set "config.gateway.token=$AGENT_TOKEN"

# enable access control plugin because the target has groups
hoop admin create plugin access_control

# enable review plugin because the target has review groups
hoop admin create plugin review

# enabling because the target secret provider is aws or env-var
hoop admin create plugin secretsmanager --source hoop/secretsmanager

# the connection
hoop admin create connection db-write --agent eks \
	--overwrite \
	--type command-line \
	--plugin 'access_control:admin;devops' \
	--plugin 'audit' \
	--plugin 'dlp' \
	--plugin 'review:admin;devops' \
	--plugin 'secretsmanager' \
	--plugin 'slack' \
	--env DB=envjson:MYSQL_WRITE:MYSQL_DB \
	--env HOST=envjson:MYSQL_WRITE:MYSQL_HOST \
	--env MYSQL_PWD=envjson:MYSQL_WRITE:MYSQL_PASS \
	--env PORT=3306 \
	--env USER=envjson:MYSQL_WRITE:MYSQL_USER \
	-- mysql -A --port '$PORT' -h '$HOST' -u '$USER' -D '$DB' --comments
```

- It will display how to create and deploy a hoop agent on Kubernetes with Helm.
- It will enable the **access control** plugin allowing access from `admin` and `devops` groups
- It will enable the dlp plugin because the target has redact configuration
- It will enable the review plugin with `admin` and `devops` as approval groups
- It will enable the plugin secrets manager because it's configured with secret provider `env-var`
- It will configure the slack plugin because it has the target has a slack channel.
- It will configure the secrets mapping based on the target type (mysql)
- It will configure the command based on the target type (mysql)

## Tips

1. If the target is configured with `env-var` secret provider it's important to propagate the secrets when deploying the agent.

Use `helm template ...` to configure the deployment/secret templates:

```shell
helm template https://hoopartifacts.s3.amazonaws.com/release/$VERSION/hoopagent-chart-$VERSION.tgz \
    --set "config.gateway.grpc_url=<gateway-instance>:8443"
```

2. You can copy the Kubernetes deployment of the runops agent and replicate it with the hoop agent using the image `hoophq/hoopdev`

- Make sure that the env `HOOP_TOKEN` or `TOKEN` is configured with the token created in the first step
- Make sure that the env `HOOP_GRPCURL` is set to your hoop gateway instance
