---
sidebar_position: 7
slug: /usecases/psql
---

# Postgres | psql cli

An optional way to connect into postgres is using the `psql` client. It's possible to create a interactive session or execute one-off commands.

## Connection Configuration

- **HOST** - The IP or hostname of the Postgres server instance
- **PORT** - The port number of Postgres server
- **USER** - The username to connect in the Postgres instance
- **PGPASSWORD** - The password to connect in the Postgres instance
- **DB** - The name of the database to connect into
- **COMMAND**

```shell
psql -P pager=off -h $HOST -U$USER --port$PORT $DB
```

> The `PGPASSWORD` is mapped as an environment variable, thus there's no need to pass it in the command.

## How to Use

Start an interactive session with psql client

```shell
hoop connect psql
```

In the same connection one-off process can be run as well

```shell
hoop exec psql <<EOF
SLEEP 5;
SELECT NOW();
EOF
```

```shell
hoop exec psql -f /tmp/myquery.sql
hoop exec psql -i 'SELECT NOW()'
```
