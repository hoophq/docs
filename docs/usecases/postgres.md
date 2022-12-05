---
sidebar_position: 2
slug: /usecases/postgres
---

# Postgres Native

Forward a passwordless Postgres connection

## Requirements

- Agent deployed in a private network
- IP or DNS of the postgres instance
- The port number of the postgres instance
- A valid username and password (md5 or SAS authentication)

## Postgres Server

```shell
hoop connect postgres-example
```

Use a compatible postgres client to connect in the instance

```shell
psql -h 127.0.0.1 --port 5433 mydb
```
