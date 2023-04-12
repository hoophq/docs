---
sidebar_position: 13
slug: /usecases/mysql
---

# MySQL

MySQL connection is a native type where queries can be audited and the output redacted.
It forwards a passwordless TCP connection locally.

## Connection Configuration

| Name   | Type    | Description                                 |
|------- | ------- | ------------------------------------------- |
| `HOST` | env-var | The IP or Host of the MySQL server          |
| `PORT` | env-var | The port of the MySQL server                |
| `USER` | env-var | The user to connect in the MySQL server     |
| `PASS` | env-var | The password to connect in the MySQL server |


:::info INFO
The MySQL native connection only accepts `mysql_native_password` and `caching_sha2_password` [authentication plugins](https://dev.mysql.com/doc/refman/8.0/en/authentication-plugins.html)
:::

## MySQL Proxy Server

```shell
hoop connect mysqldb --port 3307
```

Use a compatible mysql client to connect in the instance

```shell
mysql -h 127.0.0.1 --port 3307
```
