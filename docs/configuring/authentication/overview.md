---
sidebar_position: 1
slug: /configuring/auth-overview
---

# Overview

Hoop implements the Oauth2 protocol + OIDC. The signature of tokens are validated with JWKS, provided by the identity provider.

## Users

They could be in `active`, `inactive` or in `reviewing` status.

Users are `active` and assigned to the `default` organization when they signup. A user could be set to an `inactive` state preventing it from accessing the platform, however it's recommended to manage the state of users in the identity provider.

:::info
When organization multi tenant is enabled, the name of the organization is derived from the domain, example:
- user=johndoe@google.com, org=google

Administrators need to invite and approve users to start interacting with hoop.
:::

## Permissions

- `admin` users has full access to resources
- `non-admin` users can interact with connections and enabled plugins resources

## Authorization / Groups

Access control is a group based access control, and the users will only have access 
to the resources based on their groups.

The `groups` attribute can be managed by:
- Hoop
  - Administrator will manage users in the hoop platform, to assign/remove groups to users
- By your IDP/AD
  - Administrator will manage the users and the groups in their own IDP provider
  - To enable this feature, it is necessary to configure a custom claim in the JWT: `https://app.hoop.dev/groups`
  - Details on how to configure custom claims in each provider

## Configuration

| ENVIRONMENT       | DEFAULT VALUE         | REQUIRED   | DESCRIPTION                                                                                        |
| ----------------- | --------------------- |------------|----------------------------------------------------------------------------------------------------|
| API_URL           | http://localhost:8009 | yes        | API URL address                                                                                    | 
| IDP_ISSUER        | ""                    | yes        | [OIDC](https://openid.net/connect/) issuer name url                                                |
| IDP_CLIENT_ID     | ""                    | yes        | [Oauth2 client id](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/)     |
| IDP_CLIENT_SECRET | ""                    | yes        | [Oauth2 client secret](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/) |
| IDP_AUDIENCE      | ""                    | no         | Oauth2 audience                                                                                    |
| IDP_CUSTOM_SCOPES | ""                    | Azure only | Comma separated custom Oauth2 scopes                                                  |

The `API_URL` is used as the base address as starting point to redirect users to the provided resources like:

- [Oauth2 redirect uris](https://www.oauth.com/oauth2-servers/redirect-uris/)
- Plugin URI resources
- Environment base name to monitoring services

:::info
The `IDP_AUDIENCE` is required when using **okta** or **auth0**
:::