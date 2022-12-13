---
sidebar_position: 1
slug: /tutorials/agent-deployment
---

# Agent Deployment

Tutorial explaining how to deploy a production ready agent inside any infra-structure

## Requirements

<!-- - [Hoop Command Line](./getting-started/cli) -->
- jq command line

## Login

Leave the default values pressing enter and type your e-mail in the end

```shell
$ hoop login
Press enter to leave the defaults
Host [app.hoop.dev]:
Port [8443]:
Email:
```

:::tip
If you don't have an organization yet, this process will perform the signup automatically
:::

## Create an Agent

After signin, a file containing an access token will be available at `$HOME/.hoop/config.toml`. We'll be using it to create a new agent in the API

> Only administrators can perform this action.

```shell
AGENT_NAME=prod
ACCESS_TOKEN=$(cat ~/.hoop/config.toml  |grep Token |awk {'print $3'} |sed 's/"//g')
curl https://app.hoop.dev/api/agents \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -d@- <<EOF
{"name": "$AGENT_NAME"}
EOF
{"id":"8edb234d-128f-492e-aa9e-51cef294ec61","token":"x-agt-39b6b28b-7f96-4558-bbd3-de0926e53b35","name":"prod","hostname":"","machine-id":"","kernel_version":"","status":""}
```

Copy the `token` attribute with the value `x-agt-...`

## Testing (optional)

You could test the credential to see the agent running locally

```shell
TOKEN=x-agt-... hoop start agent
{"version":"1.0.4","git_commit":"78133f9b056751b4acc0ccffb7a9325ef54b9100","build_date":"2022-12-13T13:08:17Z","go_version":"go1.19.3","compiler":"gc","platform":"darwin/arm64"}
connected...
```

## Deployment

To deploy it, use the docker image `hoophq/hoopdev`, or see the [release pages](https://github.com/hoophq/hoopcli/releases) to deploy a specific version.

The only required environment variable is `TOKEN`, which is the value obtained from the previous step. After deploying it, a connection could be created and associated with the provided name [in the webapp](https://app.hoop.dev/connections)

![agent selection](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-agent-selection.png)
