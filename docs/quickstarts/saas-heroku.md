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

## Persisting the Agent Token

This step is required to avoid having to register the agent again.

1. Save the token in the URL `x-agt-6ce6...`
2. Add a environment variable to the agent app

- Go to Settings > Config Vars
- Add a variable with the key `TOKEN`
- Add the token (`x-agt...`) to the input value

[Config Vars Reference](https://devcenter.heroku.com/articles/config-vars)

:::info
If you need to redeploy the agent in another app, click [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hoophq/heroku-hoop-agent) and pass the agent token in the input field `TOKEN`
:::
