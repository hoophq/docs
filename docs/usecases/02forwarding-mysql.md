---
sidebar_position: 2
slug: /usecases/forwarding-mysql
---

# Port Forward | MySQL

Port Forward local ports from your private network | MySQL example.

## Connection Configuration

- **HOST** - The IP or hostname of the MySQL Server instance
- **PORT** - The number of MySQL port

## How to Use

```shell
hoop connect mysql-port-forward --port 3306
```

Use a compatible mysql client to connect in the instance.

```shell
mysql -h 127.0.0.1 -u myuser -D mydb -p
```
