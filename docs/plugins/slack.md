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
{"display_information":{"name":"hoop","description":"An app to interact with a hoop gateway instance","background_color":"#d982b5"},"features":{"bot_user":{"display_name":"Hoop","always_online":true}},"oauth_config":{"scopes":{"bot":["channels:read","chat:write","app_mentions:read"]}},"settings":{"event_subscriptions":{"bot_events":["app_mention"]},"interactivity":{"is_enabled":true},"org_deploy_enabled":false,"socket_mode_enabled":true,"token_rotation_enabled":false}}
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
	--priority -1 \
	--config SLACK_BOT_TOKEN=xoxb-... \
	--config SLACK_APP_TOKEN=xapp-... \
	--config SLACK_CHANNEL=<your-slack-channel>
```

Now it's possible to associate connections to the slack plugin in the webapp 

## Adding Approvers

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

To be able to use it, the jit or review plugins must be enabled for a connection. When trying to interacting with it, it will send a message to the configured slack channel.

1. Create a jit and review command-line type connection 

```shell
hoop admin create conn bash-jit --agent default --overwrite -- bash
hoop admin create conn bash --agent default --overwrite -- bash
```

2. Enable the plugin for both connections

```shell
hoop admin create plugin jit --overwrite --connection 'bash-jit:admin;sre'
hoop admin create plugin review --overwrite --connection 'bash:admin;sre'
```

3. Enable the slack plugin to these connections also

```shell
# it will overwrite the previous configuration
hoop admin create plugin slack \
	--overwrite \
	--priority -1 \
	--config SLACK_BOT_TOKEN=xoxb-... \
	--config SLACK_APP_TOKEN=xapp-... \
	--config SLACK_CHANNEL=<your-slack-channel> \
  --connection 'bash,bash-jit'
```

Then, interacting with both connections should send a message on your slack channel

```shell
# jit notification
hoop connect bash-jit
```

```shell
# exec notificattion
hoop exec bash 'ls'
```

