---
sidebar_position: 3
slug: /connections/psql
---

# Postgres | psql cli 

An optional way to connect into postgres is using the `psql` client. It's possible to create a interactive session or execute one-off commands.

## Connection Configuration

| Name         | Type    | Description                                    |
|------------- | ------- | ---------------------------------------------- |
| `HOST`       | env-var | The IP or Host of the Postgres server          |
| `PORT`       | env-var | The port of the Postgres server                |
| `USER`       | env-var | The user to connect in the Postgres server     |
| `PGPASSWORD` | env-var | The password to connect in the Postgres server |
| `DB`         | env-var | The name of the database to connect into       |

### Connnection Command

```shell
psql -P pager=off -h $HOST -U$USER --port$PORT $DB
```

:::info NOTE
The `PGPASSWORD` is mapped as an environment variable, thus there's no need to use it in the command.
:::

## How to Use

Start an interactive session with psql client

```shell
hoop connect psql
```

In the same connection, one-off process can be run as well

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
