---
sidebar_position: 3
slug: /configuring/auth-azure
---

# Oauth2 - Azure

This guide explains how to configure Azure with Hoop.

## Requirements

- An [account in Azure](https://azure.microsoft.com)
- `API_URL` is the public DNS name of the hoop gateway instance

:::caution NOTE
Contact the administrator of the hoop gateway instance to retrieve the `API_URL` address.
:::

## Identity Provider Configuration

- Login with your account at https://portal.azure.com/

### 1) Create a new application

- Go to Azure Active Directory > App registrations and click on the **New Registration** button
- Pick a name, and select the supported account types as you see fit
- In Redirect URI, use: `http://localhost:8009/api/callback`. Change this later to the right domain.

- Register the Application

### 2) Add 'https://app.hoop.dev/groups' claim to ID Token (optional)

- Go to App registration > {AppName} > Token configuration
- Click in the button `Add groups claim`
- Select the group types that you see fit
- Assign to the ID Token and Save
- Rename the claim `groups` to `https://app.hoop.dev/groups` at:
  - Overview > ManagedApplication {AppName} > Single sign-on > Attributes & Claims > Edit
  - In Additional claims, click at the `groups` record and add the namespace: "https://app.hoop.dev"

### 3) Collect the required information

#### IDP_CLIENT_ID & IDP_CLIENT_SECRET

- Go to App registration > {AppName}
  - Take note on the Application (client) ID. This is the IDP_CLIENT_ID
  - Click on "Client credentials" and create a new secret. This is IDP_CLIENT_SECRET

#### IDP_ISSUER & IDP_CUSTOM_SCOPES

- IDP_CUSTOM_SCOPES
  - Fixed value: "{IDP_CLIENT_ID}/.default"
- IDP_ISSUER: 
  - Go to App registration > {AppName} > Overview > Endpoints
    - Open the "OpenID Connect metadata document" URL in the browser. It will look like `https://login.microsoftonline.com/{tenant_id}/v2.0/.well-known/openid-configuration` 
    - In the JSON file in the browser, search for the key "issuer". It will look like `https://login.microsoftonline.com/{tenant_id}/v2.0` 
