---
sidebar_position: 4
slug: /configuring/auth-jumpcloud
---

# Oauth2 - Jumpcloud

This guide explains how to configure Jumpcloud with Hoop running it locally.

## Requirements

- An [admin account in Jumpcloud](https://console.jumpcloud.com/login/admin)
- `API_URL` is the public DNS name of the hoop gateway instance

:::caution NOTE
For this guide, the `API_URL` needs be set to `http://localhost:8009`, in a production environment a load balancer providing a TLS certificate with a public IP is recommended.
:::

## Identity Provider Configuration

- Login with your account at https://console.jumpcloud.com/

### 1) Create a new application

- Go Applications and click on the **Add New Application** button
- Select **Custom OIDC App** button on the footer of the page
- Pick a name, and an optional description
- In SSO tab, put as **Redirect URLs** and **Login URL**: `http://localhost:8009/api/callback`. Change this later to the right domain.
- Pick **Client Secret Basic** as Authentication Type (used when exchanging the code in the authorization flow)

### 2) Add 'https://app.hoop.dev/groups' claim to ID Token (optional)

- Go to Application > {AppName} > SSO > Attribute Mapping
- In the **Groups** attribute, select **include groups attribute** and label it **https://app.hoop.dev/groups**

### 3) Activate the Application
- Click activate
- Copy both **Client ID** and **Client Secret**
- The secret **cannot be retrieved later**. Make sure you copy and store it now.


### 4) Collect the required information

#### IDP_CLIENT_ID & IDP_CLIENT_SECRET

- IDP_CLIENT_SECRET can only be retrieved after app creation. Please refer to the section above.
- For IDP_CLIENT_ID:
  - Go to Applications > {AppName} > SSO > Endpoint Configuration > Client ID

#### IDP_ISSUER

- IDP_ISSUER: 
  - Fixed value **https://oauth.id.jumpcloud.com/**. Please refer to their public [.well-known](https://oauth.id.jumpcloud.com/.well-known/openid-configuration) file.

---

## Testing

Expose the environment variables below

```shell
export API_URL=http://localhost:8009
export IDP_CLIENT_ID=
export IDP_CLIENT_SECRET=
export IDP_ISSUER=
hoop start
```

Start the agent

```shell
hoop start agent
```

Perform the registration in the webapp clicking in the link below

```shell
(...)
** UNREGISTERED AGENT **
Please validate the Agent in the URL: http://127.0.0.1:8009/agents/new/x-agt-2fef0137-d13e-40ea-9448-cd26fba2aa58
```

Login in the webapp

```shell
hoop login
```

Add the default address to the local hoop instance

- `API_URL=http://127.0.0.1:8009`
- `GRPC_PORT=8010`

```shell
Press enter to leave the defaults
API_URL [https://app.hoop.dev]: http://127.0.0.1:8009
GRPC_PORT [8443]: 8010
Login succeeded
```

Now you could invite new users, create connections and test hoop locally integrated with Jumpcloud.
