---
sidebar_position: 2
slug: /tutorials/heroku-quick-start
---

# Heroku Quick Start

This guide shows how to interact with workloads and resources in the Heroku Platform.

## Requirements

1. Have a heroku account to run basic workloads
2. Install the [heroku command line](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli)
3. [Install Hoop Command Line](../user-guides/index.md)

---

1. Login / Signup to Hoop

```shell
hoop login
# create a client key
DSN_NAME=dev
HOOP_DSN=$(hoop create clientkeys $DSN_NAME)
```

2. Clone the heroku ruby getting started repository

```shell
APP_NAME=demo-ruby-$(hexdump -e '/1 "%02x"' -n3 < /dev/urandom)
git clone https://github.com/heroku/ruby-getting-started.git && cd ruby-getting-started
```


3. Create an application using the `heroku/ruby` buildpack

```shell
# create a new heroku app using the heroku buildpack
heroku apps:create --buildpack heroku/ruby $APP_NAME
```

4. Add the hoop buildpack

```shell
heroku buildpacks:add --app $APP_NAME --index 1 https://github.com/hoophq/heroku-hoop-buildpack
```

5. Configure the required environment variables

The client key allows stablishing the connection to the gateway and making it available in the [hoop dashboard](https://app.hoop.dev).

```shell
# configure the client key and the connection name that will be displayed
heroku config:set HOOP_DSN=$HOOP_DSN
heroku config:set HOOP_CONNECTION=$APP_NAME
```

6. Edit the main Procfile to start hoop in the background

```shell
echo 'web: hoopstart -- bundle exec puma -C config/puma.rb' > Procfile

# deploy it
git commit -am 'add hoopstart'
git push heroku main
```

### Connect It

Now it's possible to open an interactive console with the deployed application.

```shell
hoop connect $DSN_NAME:$APP_NAME
```

To run ad-hoc commands

```shell
hoop exec $DSN_NAME:$APP_NAME <<EOF
rails runner "puts Hello World"
EOF
```

**Explore more features like:**

- [Enabling more plugins](https://app.hoop.dev/plugins/store)
- Edit the connection entrypoint command to interact with other tools
