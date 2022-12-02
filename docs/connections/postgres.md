---
sidebar_position: 3
slug: /connections/postgres
---

# Postgres

Connect to a private postgres instance from your favorite IDE

## New Postgres native connection

#### Click on the "New Connection" button

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-connection.png)

#### Pick the type Postgres

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-connection-modal-pg.png)

#### Fill in some data and click Create

- **Name:** pg
- **Environment Variables:**
    - HOST={}
    - USER={}
    - PASS={}
    - PORT={}

![alt text](https://hoopartifacts.s3.amazonaws.com/screenshots/hoop/browser-new-cmd-pg-inputs.png)

#### Test the connection

Open a new terminal and type
```shell
$ hoop connect pg

connection: pg | session: 6613e23f-0b5f-4197-a388-1b1dae5a4031

--------------------postgres-credentials--------------------
      host=127.0.0.1 port=5433 user=noop password=noop
------------------------------------------------------------
2022/11/30 18:19:05 ready to accept connections!

```

Now you can use your favorite IDE such as psql (in a new terminal) to connect to PG

```shell
$ psql -h 127.0.0.1 -p 5433 my-db

psql (12.12 (Ubuntu 12.12-0ubuntu0.20.04.1), server 13.7)
WARNING: psql major version 12, server major version 13.
         Some psql features might not work.
Type "help" for help.

my-db=> 

```