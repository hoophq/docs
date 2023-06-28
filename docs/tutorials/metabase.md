---
sidebar_position: 8
slug: /tutorials/metabase
---

# Metabase

You could connect Metabase and redact sensitive content.

> This is only supported for postgres type connections

## Requirements

- Hoop Command Line
- Local or Remote Postgres Instance
- Java & [Metabase Jar](https://www.metabase.com/docs/latest/installation-and-operation/running-the-metabase-jar-file)

### Setup

1. Login at Hoop

```shell
hoop login
```

2. Create a local connection pointing to your Postgres local instance

```shell
hoop admin create conn pg --overwrite \
  --agent <agent-name> \
  --type postgres \
  -e HOST=127.0.0.1 \
  -e PORT=5432 \
  -e USER=<pguser> \
  -e PASS=<pgpass>
```

:::info
If you already have a connection with postgres, skip this phase.
:::

3. Connect to Postgres

```shell
hoop connect pg --port 5433
```

### Metabase Configuration

1. Run metabase

```shell
cd /path/to/metabase/jar
java java -DMB_JETTY_PORT=3005 -jar metabase.jar
```

2. Access the metabase webapp and perform the signup

http://127.0.0.1:3005

3. Go to Admin Settings > Databases > Add database

- For user and password type: `noop`
- Add the jdbc option: `preferQueryMode=simple`

![](https://hoopartifacts.s3.us-east-1.amazonaws.com/screenshots/metabase-pg-proxy-config.png)


### Demo

1. Go to browse data > select pg-proxy

http://127.0.0.1:3005/browse

2. Select a table that have sensitive data (e.g.: e-mail)

The fields are going to show up redacted

![](https://hoopartifacts.s3.us-east-1.amazonaws.com/screenshots/metabase-redacted-fields.png)