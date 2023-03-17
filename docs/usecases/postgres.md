---
sidebar_position: 13
slug: /usecases/postgres
---

# Postgres

Postgres connection is a native type where queries can be audited and the output redacted.
It forwards a passwordless TCP connection locally.

## Connection Configuration

| Name   | Type    | Description                                    |
|------- | ------- | ---------------------------------------------- |
| `HOST` | env-var | The IP or Host of the Postgres server          |
| `PORT` | env-var | The port of the Postgres server                |
| `USER` | env-var | The user to connect in the Postgres server     |
| `PASS` | env-var | The password to connect in the Postgres server |


:::info INFO
This type of connection accepts only `MD5` or `scram-sha-256`  [authentication methods](https://www.postgresql.org/docs/14/auth-password.html).
:::

## Postgres Server

```shell
hoop connect my-postgres --port 5432
```

Use a compatible postgres client to connect in the instance

```shell
psql -h 127.0.0.1 mydb
```
