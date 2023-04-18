---
sidebar_position: 1
slug: /integrations/introduction
---

# Introduction

Our bridge can send notifications to third party apps, like Slack. You need to set-up on your self-hosted hoop.dev. Below you will find the necessary information to do so.

# Necessary environment variables

| ENVIRONMENT                  | DEFAULT VALUE | DESCRIPTION                          |
|------------------------------| --------------|--------------------------------------|
| NOTIFICATIONS_BRIDGE_CONFIG  | ""            | a configuration JSON, see more below |

**`NOTIFICATIONS_BRIDGE_CONFIG` JSON payload**

```json
{
    "slackBotToken": "<your-slack-bot-token>", 
    "bridgeUrl": "https://your-bridge.com:PORT",
}
```

**Fields**

 * `slackBotToken`: You can find how to get this on our next session where we have a how to configure Slack;
 * `bridgeUrl`: **(OPTIONAL)** you can set your own bridge and pass it here. Talk to us to know how to;

