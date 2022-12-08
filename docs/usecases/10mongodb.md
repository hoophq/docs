---
sidebar_position: 10
slug: /usecases/mongodb
---

# MongoDB | mongosh cli

Use the mongosh to execute one-off commands and open interactive sessions.

## Connection Configuration

| Name                    | Type    | Description                        |
|------------------------ | ------- | ---------------------------------- |
| `MONGO_CONNECTION_URI`  | env-var | [MongoDB connection URI format](https://www.mongodb.com/docs/manual/reference/connection-string/) |

### Connection Command

```shell
mongosh $MONGO_CONNECTION_URI --quiet
```

## How to Use

Start an interactive session with mongosh client

```shell
hoop connect mongo
```

In the same connection, one-off process can be run as well

```shell
hoop exec mongo <<EOF
db.movies.insertOne(
  {
    title: "The Favourite",
    genres: [ "Drama", "History" ],
    runtime: 121,
    rated: "R",
    year: 2018,
    directors: [ "Yorgos Lanthimos" ],
    cast: [ "Olivia Colman", "Emma Stone", "Rachel Weisz" ],
    type: "movie"
  }
)
EOF
hoop exec mongo -- --eval 'db.movies.find()'
hoop exec mongo -i 'db.movies.find()'
```

:::caution WARNING
Be aware that the mongosh is also a node repl, the user could execute node scripts inside this connection.
Example: `hoop exec mongo -- --eval 'console.log(process.env)'`
:::