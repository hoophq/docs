---
sidebar_position: 3
slug: /usecases/forwarding-http
---

# Port Forward | http

Port Forward local ports from your private network | HTTP example.

## Connection Configuration

| Name   | Type    | Description                       |
|------- | ------- | --------------------------------- |
| `HOST` | env-var | The IP or hostname of the service |
| `PORT` | env-var | The port of the service           |

## How to Use

```shell
hoop connect my-http --port 8080
```

Open the forwarded service in a web browser or via http request.

```shell
curl http://127.0.0.1:8080
# or
open http://127.0.0.1:8080
```
