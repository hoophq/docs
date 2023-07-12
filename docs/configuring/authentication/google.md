---
sidebar_position: 5
slug: /configuring/auth-google
---

# Oauth2 - Google (GCP)

This guide explain how to configure Google with Hoop.

## Requirements

- Hoop Command Line
- An [account in GCP](https://console.cloud.google.com/apis/credentials)
- `API_URL` is the public DNS name of the hoop gateway instance

:::caution NOTE
For this guide, the `API_URL` needs be set to `http://localhost:8009`, in a production environment a load balancer providing a TLS certificate with a public IP is recommended.
:::

## Identity Provider Configuration

- Login with your account at https://console.cloud.google.com/apis/credentials

### 1) Create a new application

- Go to Credentials > **Create Credentials** button > **OAuth client ID**
- In Application type, select **Web Application**
- Give it a name (i.e. "Hoop")

### 2) Configure the redirect URIs

- Click *Authorized redirect URIs* and put the following URI: `{API_URL}/api/callback`
- Click **Create** button
- Take note on the ClientID and Client secret
- Click *Download JSON* (contain useful information) 

### 3) Collect the required information

#### IDP_CLIENT_ID & IDP_CLIENT_SECRET

When you created the app, you got those. But they are also available in the JSON file
that was downloaded by the creation time. The download is also available at:

- Credentials > OAuth 2.0 Client IDs > {AppName} > Actions > Download

#### IDP_ISSUER

Fixed **https://accounts.google.com**

### 4) Add 'https://app.hoop.dev/groups' claim to ID Token (optional)

- This functionality is under development for Google
