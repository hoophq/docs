---
sidebar_position: 1
slug: /configuring/auth-overview
---

# Overview

Hoop implements the Oauth2 protocol + OIDC. The signature of tokens are validated with JWKS or using the userinfo endpoint provided by the identity provider.

## Users

Users are `active` and assigned to the `default` organization when they signup. A user could be set to an `inactive` state preventing it from accessing the platform, however it's recommended to manage the state of users in the identity provider.

- The `sub` claim is used as the main identifier of the user in the platform. 
- The profile of the user is derived from the **id_token** claims `email` and `name`.

When a user authenticates for the first time, it performs an automatic *signup* that persist the profile claims along with it's unique identifier.

:::info
When organization multi tenant is enabled, the name of the organization is derived from the domain, example:
- user=johndoe@google.com, org=google

Administrators need to invite and approve users to start interacting with hoop.
This mode is available only for our SaaS instance (https://app.hoop.dev)
:::

## Groups

Groups allows defining who may access or interact with certain resources.

- For `connection` resources it's possible to define which groups has access to a specific connection, this is enforced when the [access control plugin](../../plugins/access-control.md) is enabled.
- For `review` resources it's possible to define which groups are allowed to approve an execution, this is enforced when the [review plugin](../../plugins/review.md) is enabled.

This information is derived from the **id_token** custom claim `https://app.hoop.dev/groups`, that allows mapping group attributes. 
When a user performs a login it syncs the groups contained in this claim if it's available.

> For our SaaS instance (https://app.hoop.dev) users needs to manage groups manually in the webapp dashboard

### Permission Profiles

- `admin` group is a special profile that grants full access to all resources.

This profile is recommended for administrators that are responsible to configure the platform for end users.
All other users are regular, meaning that they can access their own resources and interacting with connections.

## Gateway Configuration

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