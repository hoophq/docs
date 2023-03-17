---
sidebar_position: 2
slug: /usecases/forwarding-mysql
---

# Port Forward | mysql

Port Forward local ports from your private network | MySQL example.

## Connection Configuration

| Name   | Type    | Description                                    |
|------- | ------- | ---------------------------------------------- |
| `HOST` | env-var | The IP or hostname of the MySQL Server         |
| `PORT` | env-var | The port of the MySQL server                   |

## How to Use

```shell
hoop connect my-mysql --port 3306
```

Use a compatible mysql client to connect in the instance.

```shell
mysql -h 127.0.0.1 -u myuser -D mydb -p
```
