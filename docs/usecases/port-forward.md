---
sidebar_position: 2
slug: /usecases/port-forward
---

# Port Forward (TCP)

Port Forward local ports from your private network.

## Requirements

- Agent deployed in a private network
- IP or DNS of the service to forward
- The port number of the service

## HTTP Service

```shell
hoop connect http-example
```

Open the forwarded service in a web browser or via http request (default to port **8999**)

```shell
curl http://127.0.0.1:8999
# or
open http://127.0.0.1:8999
```

## MySQL Server

```shell
hoop connect mysql-example
```

Use a compatible mysql client to connect in the instance

```shell
mysql -h 127.0.0.1 --port 8999 -u myuser -D mydb -p
```
