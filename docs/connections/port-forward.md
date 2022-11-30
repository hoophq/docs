---
sidebar_position: 2
slug: /connections/port-forward
---

# Port-forward (TCP)

Exchange TCP packages with private hosts (HTTP, etc)


## New HTTP (tcp) connection

#### Click on the "New Connection" button

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-connection.png)

#### Pick the type Port-forward (tcp)

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-connection-modal-tcp.png)

#### Fill in some data and click Create

- **Name:** http
- **Environment Variables:** 
  - HOST={}
  - PORT={}

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-cmd-tcp-inputs.png)

#### Test the connection

Open a new terminal and type
```shell
$ hoop connect http

connection: xtdb | session: 078123be-45b8-4f9d-b2b5-75b9b876cb85

--------------------tcp-connection--------------------
               host=127.0.0.1 port=8999
------------------------------------------------------
2022/11/30 17:52:50 ready to accept connections!
```

Now you can send HTTP packages to 127.0.0.1:8999 and get them delivered to the private host

```shell
$ curl --request POST \
  --url http://localhost:8999/my/api \
  --header 'Content-Type: application/json' \
  --header 'accept: application/json' \
  --data '{"my-key": "my-data"}'
  
  
*   Trying 127.0.0.1:8999...
* TCP_NODELAY set
* Connected to localhost (127.0.0.1) port 8999 (#0)
> POST /my/api HTTP/1.1
> Host: localhost:8999
> User-Agent: curl/7.68.0
> Content-Type: application/edn
> accept: application/json
> Content-Length: 132
> 
* upload completely sent off: 132 out of 132 bytes
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Content-Type: application/json;charset=utf-8
< Content-Length: 1044
< Server: Jetty(9.4.43.v20210629)
...
```