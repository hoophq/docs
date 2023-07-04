---
sidebar_position: 4
slug: /installing-hoop-agent/heroku
---

# Heroku

Hoop is configured on Heroku using our [custom buildpack](https://github.com/hoophq/heroku-hoop-buildpack). The agent could be started alongside any process that stays running (e.g.: web process). The following environment variables could be configured:

| NAME                    | REQUIRED | DESCRIPTION                                                        |
|------------------------ | -------- | ------------------------------------------------------------------ |
| `HOOP_VERSION`          | no       | The version of the agent to install, default to the latest one     |
| `HOOP_DSN`              | yes      | The credential key used to authenticate in the gateway             |
| `HOOP_CONNECTION`       | yes      | The name of the connection to publish in the hoop dashboard        |

## Client Keys

Client keys are required for agents to authenticate in the gateway. The name of the key is used as the prefix when publishing connections, it acts as an tenancy configuration for workloads (e.g.: homolog, prod, dev, etc)

To create a client key, issue the command below:

```shell
hoop admin create clientkeys dev
```

Assuming that we have an application configured as `myapp` (`HOOP_CONNECTION=myapp`), this key will publish the connection as `dev:myapp`.

:::caution IMPORTANT
Client keys must be configured in their proper workload environment, otherwise users could issue commands in wrong workloads. E.g.: like issuing a command in a **homolog** connection that is configured in a **production** workload.
:::

## Installing the Buildpack

Using [multiple buildpacks for an application](https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app) allows starting the agent alongside any workload deployed on heroku.

Just add the hoop buildpack at the first position in the order of buildpack execution:

```shell
heroku buildpacks:add --index 1 https://github.com/hoophq/heroku-hoop-buildpack
```

:::info
Make sure that the **primary language** of your app is the **last** buildpack in the list. [More Info](https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app#adding-a-buildpack)
:::

## Configuring the Procfile

The Procfile is the entrypoint of how the application is going to start, use the `hoopwrapper` which will start the agent in the background and then start your main process (after `--`).

```shell
# Procfile
# ruby example
web: hoopwrapper -- bundle exec puma -C config/puma.rb
```

Make sure that the main process stays alive, the hoop agent will run in background as long the main process stays running (for this example: `bundle exec puma -C config/puma.rb`)

## Configuring Connections

When the main application starts it's possible to configure how users will interact with the workloads, like:

- Edit the entrypoint of the connection
- Configure plugins
- Propagate custom environment variables

Check how to deploy the [ruby getting started](../tutorials/heroku.md) with hoop.