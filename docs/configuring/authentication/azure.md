---
sidebar_position: 3
slug: /configuring/auth-azure
---

# Oauth2 - Azure

This guide explain how to configure Azure with Hoop running it locally.

## Requirements

- [Hoop Command Line](../../quickstarts/cli.md)
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

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/okta-create-new-app.jpg)

- Register the Application

### 2) Add 'https://app.hoop.dev/groups' claim to ID Token

- Go to App registration > {AppName} > Token configuration
- Click in the button `Add groups claim`
- Select the group types that you see fit
- Assign to the ID Token and Save
- Rename the claim `groups` to `https://app.hoop.dev/groups` at:
  - Overview > ManagedApplication {AppName} > Single sign-on > Attributes & Claims > Edit
  - In Additional claims, click at the `groups` record and add the namespace: "https://app.hoop.dev"

### 3) Add 'https://app.hoop.dev/org' claim to ID Token (optional)
- Go to App registration > {AppName} > Overview > ManagedApplication {AppName} > Single sign-on > Attributes & Claims > Edit
- Click `Add new claim` button
  - Name: "org"
  - Namespace: "https://app.hoop.dev"
  - Source: Attribute
  - Source attribute: user.companyname
  - Save

### 4) Collect the required information

#### IDP_CLIENT_ID & IDP_CLIENT_SECRET

In the Application Home

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/okta-app-general-tab.jpg)

#### IDP_AUDIENCE & IDP_ISSUER

On **Security > API**

![api settings](https://hoopartifacts.s3.amazonaws.com/screenshots/okta-security-api.jpg)

---

## Testing

Expose the environment variables below

```shell
export API_URL=http://localhost:8009
export IDP_CLIENT_ID=
export IDP_CLIENT_SECRET=
export IDP_ISSUER=
export IDP_AUDIENCE=
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

Now you could invite new users, create connections and test hoop locally integrated with Okta.
