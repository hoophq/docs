---
sidebar_position: 14
slug: /usecases/mysqlcli
---

# MySQL | mysql cli

An optional way to connect into MySQL is using the `mysql` client. It's possible to create a interactive session or execute one-off commands.

## Connection Configuration

| Name         | Type    | Description                                    |
|------------- | ------- | ---------------------------------------------- |
| `HOST`       | env-var | The IP or Host of the MySQL server             |
| `PORT`       | env-var | The port of the MySQL server                   |
| `USER`       | env-var | The user to connect in the MySQL server        |
| `MYSQL_PWD`  | env-var | The password to connect in the MySQL server    |
| `DB`         | env-var | The name of the database to connect into       |

### Connection Command

```shell
mysql -h$HOST -u$USER --port=$PORT -D$DB
```

:::info NOTE
The `MYSQL_PWD` is mapped as an environment variable, thus there's no need to use it in the command.
:::

## How to Use

Start an interactive session with mysql client

```shell
hoop connect mysql
```

In the same connection, one-off process can be run as well

```shell
hoop exec mysql <<EOF
SELECT SLEEP(2);
SELECT NOW();
EOF
```

```shell
hoop exec mysql -f /tmp/myquery.sql
hoop exec psql -i 'SELECT NOW()'
```
