---
sidebar_position: 3
slug: /usecases/forwarding-http
---

# Port Forward | HTTP

Port Forward local ports from your private network | HTTP example.

## Connection Configuration

- **HOST** - The IP or hostname of the MySQL Server instance
- **PORT** - The number of MySQL port

## How to Use

```shell
hoop connect http-port-forward
```

Open the forwarded service in a web browser or via http request (default to port **8999**)

```shell
curl http://127.0.0.1:8999
# or
open http://127.0.0.1:8999
```
