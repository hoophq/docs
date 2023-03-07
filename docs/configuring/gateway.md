---
sidebar_position: 1
slug: /configuring/gateway
---

# Gateway

The gateway provides a REST API, a webapp UI and a bi-directional gRPC to exchange packets between the client and the agent.

## Routes

| METHOD | URI                      |
| ------ | ------------------------ |
| GET    | /api/login |
| GET    | /api/callback |
| GET    | /api/users |
| GET    | /api/users/:id |
| GET    | /api/userinfo |
| GET    | /api/users/groups |
| PUT    | /api/users/:id |
| POST   | /api/users |
| POST   | /api/connections |
| PUT    | /api/connections/:name |
| GET    | /api/connections |
| GET    | /api/connections/:name |
| GET    | /api/reviews |
| GET    | /api/reviews/:id |
| PUT    | /api/reviews/:id |
| GET    | /api/jits |
| GET    | /api/jits/:id |
| PUT    | /api/jits/:id |
| POST   | /api/agents |
| GET    | /api/agents |
| POST   | /api/plugins |
| PUT    | /api/plugins/:name |
| GET    | /api/plugins |
| GET    | /api/plugins/:name |
| PUT    | /api/plugins/:name/config |
| GET    | /api/plugins/audit/sessions/:session_id |
| GET    | /api/plugins/audit/sessions/:session_id/status |
| GET    | /api/plugins/audit/sessions |
| GET    | /api/plugins/runbooks/connections/:name/templates |
| POST   | /api/plugins/runbooks/connections/:name/exec |

## Gateway Configuration

The following environment variables could be configured when starting the gateway as `hoop start gateway` when using the container image `hoophq/hoop`

| ENVIRONMENT                         | DEFAULT VALUE            | DESCRIPTION                                      |
|-------------------------------------| ------------------------ |--------------------------------------------------|
| XTDB_ADDRESS                        | `http://127.0.0.1:3000`  | Database server address                          |
| STATIC_UI_PATH                      | `/app/ui/public`         | The path where the UI assets resides             |
| PLUGIN_AUDIT_PATH                   | `/opt/hoop/sessions`     | The path where the temporary sessions are stored |
| PROFILE                             | ""                       | "dev" runs gateway without authentication        |
| GOOGLE_APPLICATION_CREDENTIALS_JSON | ""                       | GCP DLP credentials                              |
| SENTRY_DSN                          | ""                       | Sentry Gateway API Key                           |
| AGENT_SENTRY_DSN                    | ""                       | Sentry Agent API Key                             |
| PYROSCOPE_INGEST_URL                | ""                       | Pyroscope URL                                    |
| PYROSCOPE_AUTH_TOKEN                | ""                       | Pyroscope ingest auth token                      |
| PLUGIN_REGISTRY_URL                 | ""                       | The URL of the plugin registry                   |
| SEGMENT_KEY                         | ""                       | Segment API Key (customer metrics)               |
| API_URL (required)                  | ""                       | API URL address (identity provider)              | 
| IDP_ISSUER (required)               | ""                       | Identity Provider Issuer (Oauth2)                |
| IDP_AUDIENCE                        | ""                       | Identity Provider Audience (Oauth2)              |
| IDP_CLIENT_ID (required)            | ""                       | Oauth2 client id                                 |
| IDP_CLIENT_SECRET (required)        | ""                       | Ouath2 client secret                             |
| MAGIC_BELL_API_KEY                  | ""                       | Magic Bell API Key (notification system)         |
| MAGIC_BELL_API_SECRET               | ""                       | Magic Bell API Secret                            |
| SMTP_HOST                           | ""                       | Smtp Host (notification system)                  |
| SMTP_PORT                           | ""                       | Smtp Port (notification system)                  |
| SMTP_USER                           | ""                       | Smtp User (notification system)                  |
| SMTP_PASS                           | ""                       | Smtp Password (notification system)              |

## Ports

### 8009

It serves the REST API and the webapp.

- REST API: `$API_URL/api/<resources>/...`
- Webapp: `$API_URL/...`

### 8010

It serves bi-directional gRPC protocol to exchange packets between the client and the agent.

:::info
The resources aren't authenticated when the gateway is started with the environment variable `PROFILE=dev`
:::

## Storage

Hoop uses [xtdb](https://github.com/xtdb/xtdb) & postgres as the backend. The image `hoophq/xtdb` could be configured with the following environment variables. The xtdb instance needs to be in the same network of the gateway.

:::caution WARNING
The `hoophq/xtdb` image doesn't provide authentication mechanisms, it exposes an API where it's possible to fetch all data from the gateway.
It's recommended to be exposed to `localhost` only.
:::

### Configuration

| ENVIRONMENT           | DEFAULT VALUE  | DESCRIPTION                           |
| --------------------- | -------------- | ------------------------------------- |
| PG_HOST (required)    | ""             | The hostname of the postgres instance |
| PG_PORT               | "5432"         | The port of the postgres instance     |
| PG_USER (required)    | ""             | The user of the postgres instance     |
| PG_DB (required)      | ""             | The database to connect to            |
| PGPASSWORD (required) | ""             | The password of the postgres instance |

## Pyroscope Profiling

[Pyroscope](https://pyroscope.io/) enables continuous profiling of the gateway and agent components. To test it locally:

```shell
# start a pyroscope server
pyroscope server
```

Expose the environment variables below to start ingesting data to Pyroscope

```shell
export PYROSCOPE_INGEST_URL=http://<HOST-IP>:4040
export PYROSCOPE_AUTH_TOKEN=noop
hoop start
```

:::info
When this configuration is enabled, those attributes are passed down to the agent via gRPC and stored in memory when the agent connects in the gateway.
:::

## Session Blobs (audit plugin)

The `PLUGIN_AUDIT_PATH` contains the audit session data that are in-transit. To guarantee the persistence of blobs stored in the filesystem until the session is flushed to the database. We recommend mounting a persistent volume in this path.

:::info
The blob is only available in the filesystem when the session is open. After it's closed the data is flushed to the database.
:::

## Notification (review & jit plugins)

Magic Bell enables sending notification messages to slack & e-mail, it's used in conjuction with the [review](../plugins/review.mdx) and [JIT](../plugins/jit.mdx) plugins.
Every time a new access or review is available it will send a notification to slack or e-mail.

To enable it, create an account in magic bell and [get the required credentials](https://www.magicbell.com/docs/api-authentication#authentication).

- MAGIC_BELL_API_KEY
- MAGIC_BELL_API_SECRET


## Data Loss Prevention (DLP plugin)

[Google Data Loss Prevention](https://cloud.google.com/dlp) redacts the content of connections on the fly. It requires a [service account](https://cloud.google.com/dlp/docs/auth) within the role `roles/dlp.user`. This feature is used in conjuction with the [DLP Plugin](../plugins/dlp.mdx).

:::info
When this configuration is enabled, those attributes are passed down to the agent via gRPC and stored in memory when the agent connects in the gateway.
:::