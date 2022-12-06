---
sidebar_position: 8
slug: /usecases/mysql
---

# MySQL | mysql cli

An optional way to connect into MySQL is using the `mysql` client. It's possible to create a interactive session or execute one-off commands.

## Connection Configuration

- **HOST** - The IP or hostname of the MySQL server instance
- **PORT** - The port number of MySQL server
- **USER** - The username to connect in the MySQL instance
- **MYSQL_PWD** - The password to connect in the MySQL instance
- **DB** - The name of the database to connect into
- **COMMAND**

```shell
mysql -h$HOST -u$USER --port=$PORT -D$DB
```

> The `MYSQL_PWD` is mapped as an environment variable, thus there's no need to pass it in the command.

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
