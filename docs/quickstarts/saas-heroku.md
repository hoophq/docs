---
sidebar_position: 3
slug: /quickstarts/saas-heroku
---

# SaaS | Heroku

To start interacting with your workloads in Heroku, install the hoop command line and signup.

1. [Install hoop cli](cli.md)
2. [Signup](https://app.hoop.dev)
3. Deploy the agent that will interact with the Heroku Platform

Leave the inputs `TOKEN` and `VERSION` empty.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hoophq/heroku-hoop-agent)

1. Check the logs of the agent, it should appear a URL. Copy and paste it in the browser and register the agent.

:::tip
The logs could be viewed by using the [heroku command line](https://devcenter.heroku.com/articles/logging#view-logs) or from the [heroku dashboard](https://devcenter.heroku.com/articles/logging#view-logs-with-the-heroku-dashboard)
:::

![Heroku Agent Register](https://hoopartifacts.s3.amazonaws.com/screenshots/9-heroku-logs-agent-register.png)

### Persisting the Agent Token

This step is required to avoid having to register the agent again.

1. Save the token in the URL `x-agt-6ce6...`
2. Add a environment variable to the agent app

- Go to Settings > Config Vars
- Add a variable with the key `TOKEN`
- Add the token (`x-agt...`) to the input value

[Config Vars Reference](https://devcenter.heroku.com/articles/config-vars)

:::info
If you need to redeploy the agent in another app, click in the deploy button again and pass the agent token in the input field `TOKEN`
:::

### Associating with Connections

The registered agent will be available and can be associated with a connection [in the webapp](https://app.hoop.dev/connections). Let's create the first connection.

1. Click in the button `Create connection`
2. Select the `Command Line` type
3. Add the name of the connection: `agent-bash`
4. In the input `Commands` type `/bin/bash`
5. Select the agent connected in the dropbox below

:::info
If the registered agent doesn't appear, try to refresh the webapp.
:::

[Connection Example](https://hoopartifacts.s3.amazonaws.com/screenshots/10-heroku-bash-connection.png)


### Interacting with the Connection

Open a terminal and type commands below

```shell
hoop login
hoop connect agent-bash
```

That's it, now you've connected in an interactive session inside a heroku app.
After disconnecting it, check if there's any recorded session available at https://app.hoop.dev/plugins/audit.

## Next Topics

See how to use the heroku cli to interact with the Heroku Platform.

- [Heroku Exec](../usecases/heroku-exec.md)
- [Heroku Exec One Offs](../usecases/heroku-oneoff.md)
