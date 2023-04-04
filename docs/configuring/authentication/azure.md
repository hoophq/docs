---
sidebar_position: 3
slug: /configuring/auth-azure
---

# Oauth2 - Azure

This guide explains how to configure Azure with Hoop running it locally.

## Requirements

- An [account in Azure](https://azure.microsoft.com)
- `API_URL` is the public DNS name of the hoop gateway instance

:::caution NOTE
For this guide, the `API_URL` needs be set to `http://localhost:8009`, in a production environment a load balancer providing a TLS certificate with a public IP is recommended.
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

---

## Testing

Expose the environment variables below

```shell
export API_URL=http://localhost:8009
export IDP_CLIENT_ID=
export IDP_CLIENT_SECRET=
export IDP_ISSUER=
export IDP_CUSTOM_SCOPES=
hoop start
```

Start the agent

```shell
hoop start agent
```

Perform the registration in the webapp clicking in the link below

```log
{"level":"info","timestamp":"2023-03-27T14:57:24-03:00","logger":"agent/main.go:35","msg":"webregister - connecting, attempt=1"}

--------------------------------------------------------------------------
VISIT THE URL BELOW TO REGISTER THE AGENT
{API_URL}/agents/new/x-agt-...
--------------------------------------------------------------------------
```

Login in the webapp

```shell
hoop login
```

Add the default address to the local hoop instance

- `API_URL=http://127.0.0.1:8009`
- `GRPC_URL=127.0.0.1:8010`

```shell
Press enter to leave the defaults
API_URL [https://app.hoop.dev]: http://127.0.0.1:8009
GRPC_URL [app.hoop.dev:8443]: 127.0.0.1:8010
Login succeeded
```

Now you could invite new users, create connections and test hoop locally integrated with Azure.
