---
sidebar_position: 6
slug: /tutorials/hoop-admin
---

# Admin Command Line

The admin command line let you interact with internal resources.

## Login

```shell
hoop login
```

## Get Resources

To see the available resources available to get, type `hoop admin get --help`


```shell
hoop admin get plugins
```
```
NAME	SOURCE	PRIORITY	CONNECTIONS	    CONFIG
audit	-	    0		    6		        -
dlp	    -	    0		    6		        -
```

Some resources returns a tabular view, if they aren't available you could use the option `-o json`. Example:

```shell
hoop admin get jits -o json |jq .
```

The tabular view may include additional information, like connections showing which agent is connected or which plugin is associated with it.

```shell
# conn is an alias to connection
hoop admin get conn
```

To fetch a single resource

```shell
hoop admin get plugins audit
```

## Creating Resources

To see the available resources available to create, type `hoop admin create --help`.


### Agents

Create a token and start an agent locally

```shell
export HOOP_TOKEN=$(hoop admin create agent demo)
HOOP_GRPCURL=<host>:<port> hoop start agent
```

List it

```shell
hoop admin get agents
```

### Connections

The command bellow creates a **command-line** connection with bash that prints 'hello hoop' to the standard output.

:::info
The command below assumes that you have at least an agent created with the name `demo`, to interact with it (`hoop exec|connect`) the agent needs to be deployed.
:::

```shell
# create it
$ hoop admin create conn hello-hoop -a demo -- bash -c 'echo hello hoop'
# interact it
$ hoop exec hello-hoop
hello hoop
```

To create a connection to interact with postgres

```shell
hoop admin create conn pgdemo -a demo --type postgres \
    -e HOST=demo-pg-db.ch707rnaizjg.us-east-1.rds.amazonaws.com \
    -e PASS=dollar-manger-carouse-HEARTED \
    -e USER=demoreadonly

# interact with it
hoop connect pgdemo

# in another terminal
psql -h 0 --port 5433 dellstore -c 'select now()'
```

#### Environment Variables

You could map environment variables to a connection

```shell
$ hoop admin create conn demo-bashenv -a demo -e ENVIRONMENT=prod -- \
    bash -c 'echo environment is $ENVIRONMENT'

# interact with it
$ hoop exec demo-bashenv
environment is prod
```

You could map an environment variables as a file in the filesystem

```shell
$ hoop admin create conn demo-bashfs -a test-agent -e filesystem:SECRET_FILE=mybigsecret -- \
    bash -c 'echo $SECRET_FILE; cat $SECRET_FILE'

# interact with it
$ hoop exec demo-bashfs
/tmp/29837bea-6eb9-4f82-856a-a47a7c9c7654.envfs
mybigsecret
```

Using a base64 value as input to environment variables


```shell
$ hoop admin create conn demo-b64env -a test-agent -e b64-envvar:MYENV=$(echo val |base64) -- \
    bash -c 'echo $MYENV'

# interact with it
$ hoop exec demo-b64env
val
```

## Delete Resources

To see the available resources available to delete, type `hoop admin delete --help`

Delete an agent

```shell
hoop admin delete agent demo
```
