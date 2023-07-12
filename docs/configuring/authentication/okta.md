---
sidebar_position: 2
slug: /configuring/auth-okta
---

# Oauth2 - Okta

This guide explain how to configure Okta with Hoop.

## Requirements

- Hoop Command Line
- An [account in OKTA](https://developer.okta.com/login/)
- `API_URL` is the public DNS name of the hoop gateway instance

:::info
Contact the administrator of the hoop gateway instance to retrieve the `API_URL` address.
:::

## Identity Provider Configuration

- Login with your account at https://developer.okta.com/login/

### 1) Create a new application

- Go to Applications > Applications and click on the **Create App Integration** button
- In Sign-in Method, select **OIDC - OpenID Connect**
- In Application type, select **Web Application**

### 2) Configure the redirect URIs

- Signin redirect URIs: `{API_URL}/api/callback`
- Signout redirect URIs: `{API_URL}/api/logout`

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/okta-create-new-app.jpg)

- Save the Application

### 3) Collect the required information

#### IDP_CLIENT_ID & IDP_CLIENT_SECRET

In the Application Home

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/okta-app-general-tab.jpg)

#### IDP_AUDIENCE & IDP_ISSUER

On **Security > API**

![api settings](https://hoopartifacts.s3.amazonaws.com/screenshots/okta-security-api.jpg)

### 4) Add 'https://app.hoop.dev/groups' claim to ID Token (optional)

- Go to Security > API > {authorization server} > Claims
- Add `https://app.hoop.dev/groups` in the ID Token
