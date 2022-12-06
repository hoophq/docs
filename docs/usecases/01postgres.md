---
sidebar_position: 1
slug: /usecases/postgres
---

# Postgres

Postgres connection it's a native type where queries can be audited and the output redacted. It forwards a passwordless TCP connection locally.

## Connection Configuration

- **HOST** - The IP or hostname of the Postgres server instance
- **PORT** - The port number of Postgres server
- **USER** - The username to connect in the Postgres instance
- **PASS** - The password to connect in the Postgres instance

> This type of connection accepts `MD5` or `scram-sha-256`  [authentication methods](https://www.postgresql.org/docs/14/auth-password.html).

## Postgres Server

```shell
hoop connect postgres-example --port 5432
```

Use a compatible postgres client to connect in the instance

```shell
psql -h 127.0.0.1 mydb
```
