---
sidebar_position: 2
slug: /integrations/slack-configuration
---

# Slack

## Getting the Slack bot token

#### Create the classic Slack App

> You **have** to create a "Slack App (Classic). Follow the next steps carefully so you get the bot well configured.

1. <a href="https://api.slack.com/apps?new_classic_app=1" target="_blank">Click here</a> and fill the form below. You can fill with whatever name you want, but you might want to fill the App Name as "hoop.dev" to find it easy to manage later;

  <img src="https://user-images.githubusercontent.com/22248748/119397031-9f1b7500-bca3-11eb-9eaa-cc2418adb9db.png" />

2. Navigate to your just created App Home and Click at "Add Legacy Bot User"
  <img src="https://user-images.githubusercontent.com/22248748/119397034-9fb40b80-bca3-11eb-8187-df62925c24f1.png" />

3. Click on **OAuth & Permissions** on the side menu and navigate to **Scopes** section;
  3.1. Click on Add an OAuth Scope

  3.2. Add the following scopes:
    * Modify your public channels: `channels:write`;
    * Send messages as `<App name>`: `chat:write:bot`;
    * Send messages as user: `chat:write:user`;
    * Access user’s profile and workspace profile fields: `users.profile:read`.

  It should look like this:
  <img src="https://user-images.githubusercontent.com/22248748/119397039-a17dcf00-bca3-11eb-9bf4-25cd24f96aaf.png" />

4. Scroll to the top of the same **OAuth & Permissions** page and click on the **Install to Workspace**:
  <img src="https://user-images.githubusercontent.com/22248748/119397036-a04ca200-bca3-11eb-99a8-545d74effde0.png" />
  
5. Create a channel called "hoop.dev" and add this bot at this channel, so after we set up the gateway with the Slack Bot Token, the bot will automatically connect and send the notifications to this channel;

6. Once you've followed these steps, you will find your **Bot User OAuth Token**:
  <img src="https://user-images.githubusercontent.com/22248748/119397029-9f1b7500-bca3-11eb-9faa-0978a0b280e8.png" />

7. Use this token as `slackBotToken` JSON field on `NOTIFICATIONS_BRIDGE_CONFIG` environment variable. If you need help setting this environment variable, [see more here](/docs/integrations/introduction).


