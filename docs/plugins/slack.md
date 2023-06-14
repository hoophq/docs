---
sidebar_position: 4
slug: /plugins/slack
---

# Slack

Slack integration let you act on connections that has review or jit plugin enabled, it sends notification letting you approve sessions directly from a channel in slack.

![slack-review-message](https://hoopartifacts.s3.amazonaws.com/screenshots/slack-review-message.jpg)


## Requirements

- Privileges to [create an application on slack](https://api.slack.com/apps)
- Privileges to install the new app in a workspace
- Admin user on hoop

## App Installation - Slack

1. Create [a slack app from **an app manifest**](https://api.slack.com/apps?new_app=1)
2. Select the workspace and click next and paste the manifest below

```json
{"display_information":{"name":"hoop","description":"An app to interact with a hoop gateway instance","background_color":"#7a7879"},"features":{"bot_user":{"display_name":"Hoop Bot","always_online":true},"slash_commands":[{"command":"/hoop","description":"Subscribe to notifications sent by Hoop","usage_hint":"subscribe","should_escape":false}]},"oauth_config":{"scopes":{"bot":["app_mentions:read","channels:read","chat:write","commands","im:write","channels:manage","groups:write","mpim:write"]}},"settings":{"event_subscriptions":{"bot_events":["app_mention"]},"interactivity":{"is_enabled":true},"org_deploy_enabled":false,"socket_mode_enabled":true,"token_rotation_enabled":false}}
```

3. Follow the guide and click on **Install to Workspace**
4. Scroll below and create an **App-Level Token** and **copy the token**
	- Token Name: `hoop`
	- Scopes: `connections:write`, `app_configurations:write`
5. Go to **Install App** on the left side bar and copy the **Bot User Oauth Token**

---

Lastly, invite the bot in the slack channel that you wish to receive notifications typing the name of the bot `@hoop`

![invite-hoop](https://hoopartifacts.s3.amazonaws.com/screenshots/slack-invite-bot.png)

## App Installation - Hoop

In this step the slack bot and app level tokens are required to configure the plugin.

1. Login to your hoop instance: `hoop login`
2. Create the slack plugin

```shell
hoop admin create plugin slack \
	--overwrite \
	--config SLACK_BOT_TOKEN=xoxb-... \
	--config SLACK_APP_TOKEN=xapp-... \
	--config SLACK_CHANNEL=<your-slack-channel>
```

Now it's possible to associate connections to the slack plugin in the webapp 

## Subscribe to Notifications

To subscribe and signup to receive notifications from the Hoop Bot, type `/hoop subscribe` and access the generated link. After sign in the user will start to receive notification when there's a review approved and ready to be executed.

### Subscribing Manually

To add approvers that are allowed to review sessions, fetch the slack id of the user and update it using the command line.

```shell
hoop admin create user <approver@domain.tld> --overwrite \
  --groups admin,sre \
  --slackid <SLACK-USER-ID>
```

### Copy the Slack ID

- In the slack app, click on the top right corner in your profile photo
- Select Profile
- Click on the more options button (see image below) and copy the member's ID

![slack-id](https://hoopartifacts.s3.amazonaws.com/screenshots/slack-copy-slackid.png)

:::info
You can copy the id of other members too on slack.
:::

## Usage

To be able to use it, the review plugins must be enabled for a connection. When trying to interacting with it, it will send a message to the configured slack channel.

1. Enable the review plugin

```shell
hoop admin create plugin review --overwrite
```

2. Associate the connection with the `review` and `slack` plugin

```shell
hoop admin create conn bash \
	--overwrite \
	--agent default \
	--plugin 'review:admin;sre' \
	--plugin slack \
	-- bash
```

Then, interacting with the connection will send a message on your slack channel. After it's approved it will send a message to the creator.

```shell
# jit notification
hoop connect bash
```

```shell
# exec notificattion
hoop exec bash 'ls'
```

