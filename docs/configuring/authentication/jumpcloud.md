---
sidebar_position: 4
slug: /configuring/auth-jumpcloud
---

# Oauth2 - Jumpcloud

This guide explains how to configure Jumpcloud with Hoop.

:::caution NOTE
Jumpcloud doesn't emit JWT as access token, thus the gateway validates if a client is authenticated performing an http request to the userinfo endpoint (oidc spec).
:::

## Requirements

- An [admin account in Jumpcloud](https://console.jumpcloud.com/login/admin)
- `API_URL` is the public DNS name of the hoop gateway instance

:::info
Contact the administrator of the hoop gateway instance to retrieve the `API_URL` address.
:::

## Identity Provider Configuration

- Login with your account at https://console.jumpcloud.com/

### 1) Create a new SSO application

- Go to **SSO** and click on the **Add New Application** button
- Select **Custom OIDC App** button on the footer of the page
- Pick a name, and an optional description
- In SSO tab
  - Add the **Redirect URLs** to `{APIURL}/api/callback`
  - Add the **Login URL**: to `{APIURL}/login`
- Pick **Client Secret Basic** as Authentication Type (used when exchanging the code in the authorization flow)

### 2) Attribute Mapping

- Still in the **SSO** tab, select the standard scopes `Email` and `Profile` 
- In the **Groups** attribute, select **include groups attribute** and label it **https://app.hoop.dev/groups**

### 3) Activate the Application

- Click activate
- Copy both **Client ID** and **Client Secret**
- The secret **cannot be retrieved later**. Make sure you copy and store it now.

### 4) Collect the required information

#### IDP_CLIENT_ID & IDP_CLIENT_SECRET

- IDP_CLIENT_SECRET can only be retrieved after app creation. Please refer to the section above.
- IDP_CLIENT_ID - Go to SSO > {AppName} > SSO Tab > Endpoint Configuration > Client ID

#### IDP_ISSUER

- IDP_ISSUER is **https://oauth.id.jumpcloud.com/**.

Please refer to their public [.well-known](https://oauth.id.jumpcloud.com/.well-known/openid-configuration) file.


## Associating User Groups

To propagate groups to Hoop, create a new group

1. Go to User Groups > Create Group and provide a name and description
2. Go to *Users tab* and mark the users that you wish to add in this new group
3. Go to *Applications tab* and mark your custom oidc app
4. Click in Save
