---
sidebar_position: 1
slug: /configuring/auth-overview
---

# Overview

Hoop implements the Oauth2 protocol + OIDC. The signature of tokens are validated with JWKS, provided by the identity provider.
Users require to be registered and approved by administrators on Hoop. They could be in `active`, `inactive` or in `reviewing` status.

## Organizations

Organizations are created when a user performs the first signup, the name of the organization is derived from its domain, example:

- johndoe@google.com, org=google

Every resource created is bound to an organization.

:::tip 
    If you use your custom ID Provider, then it is possible to provide a custom claim 
    in the JWT ID Token:
    `https://app.hoop.dev/org : {name of the org}`.
    This will take precedence over the above method.
:::

## Permissions

- `admin` users has full access to resources
- `non-admin` users can interact with connections and enabled plugins resources

## Configuration

| ENVIRONMENT       | DEFAULT VALUE         | REQUIRED | DESCRIPTION                                       |
| ----------------- | --------------------- | -------- | ------------------------------------------------- |
| API_URL           | http://localhost:8009 | yes      | API URL address                                   | 
| IDP_ISSUER        | ""                    | yes      | [OIDC](https://openid.net/connect/) issuer name   |
| IDP_CLIENT_ID     | ""                    | yes      | [Oauth2 client id](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/)     |
| IDP_CLIENT_SECRET | ""                    | yes      | [Oauth2 client secret](https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/) |
| IDP_AUDIENCE      | ""                    | no       | Oauth2 audience                                   |
| IDP_CUSTOM_SCOPES | ""                    | no       | Custom scope requried by the IDP to work properly |

The `API_URL` is used as the base address as starting point to redirect users to the provided resources like:

- [Oauth2 redirect uris](https://www.oauth.com/oauth2-servers/redirect-uris/)
- Plugin URI resources
- Environment base name to monitoring services

:::info
The `IDP_AUDIENCE` is required when using **okta** or **auth0**
:::