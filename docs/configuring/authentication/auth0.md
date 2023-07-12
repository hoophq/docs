---
sidebar_position: 3
slug: /configuring/auth-auth0
---

# Oauth2 - Auth0

This guide explain how to configure Auth0 with Hoop.

## Requirements

- Hoop Command Line
- An [account in Auth0](https://auth0.com/signup)
- `API_URL` is the public DNS name of the hoop gateway instance

:::caution NOTE
Contact the administrator of the hoop gateway instance to retrieve the `API_URL` address.
:::

## Identity Provider Configuration

- Login with your account at https://manage.auth0.com/

### 1) Create a new application

- Go to Applications > Applications and click on the **Create Application** button
- Select a **Regular Web Application**

### 2) Configure the redirect URIs

- Allowed Callback URLs: `{API_URL}/api/callback`
- Allowed Logout URLs: `{API_URL}/api/logout`

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/auth0-app-uri-settings.png)

- Save the Application

### 3) Collect the required information

#### IDP_CLIENT_ID & IDP_CLIENT_SECRET

In the Application Home

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/auth0-app-settings.png)

#### IDP_AUDIENCE & IDP_ISSUER

On **Applications > APIs**

![api settings](https://hoopartifacts.s3.amazonaws.com/screenshots/auth0-api-settings.jpg)

The `IDP_ISSUER` will be the same address but without the suffix `api/v2`
