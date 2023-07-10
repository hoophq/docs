---
sidebar_position: 6
slug: /installing-hoop-agent/embedded
title: Embedded Mode
show: false
---

# Embedded Mode

This mode is recommended when you need to interact with the application runtime context. This mode integrates more seamless without additional configuration if you need to perform administrative tasks that requires the context of a running application. Below there's a few examples

- Executing ad-hoc tasks (rake tasks, django-admin, elixir mix tasks)
- Interactive console access
- Access REPL language environments (rails console, elixir, clojure, etc)

To use this mode, the agent need to have the context of the application, so it must be initialized along with any process that keeps running. The following environment variables are also required:

- `HOOP_CONNECTION` defines how resources are going to be published in the webapp dashboard.
- `HOOP_DSN` is a client key that authenticates with the gateway. See more information about [client keys](./clientkeys.md)

## Docker

To make every application starts with the agent

```Dockerfile
FROM python:3.9-slim

RUN mkdir /app
WORKDIR /app
RUN apt-get update -y && \
    apt-get install curl -y && \
    curl -s -L https://releases.hoop.dev/release/install-cli.sh | sh

RUN pip install --upgrade pip
COPY requirements.txt /app
RUN pip install -r requirements.txt
COPY . /app/

EXPOSE 8000

ENTRYPOINT ["hoopstart", "--"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
```

## Virtual Machines

When using bare VM's you'll need a Linux process manager like [systemd](https://systemd.io/)

```shell
curl -s -L https://releases.hoop.dev/release/install-cli.sh | sh
cat - >/etc/systemd/system/hoopagent.service <<EOF
[Unit]
Description=Hoop Agent
After=network.target

[Service]
ExecStart=hoop start agent
Environment="HOME=/root"
Environment="HOOP_DSN=<CLIENT-KEY>"
Environment="HOOP_CONNECTION=vmapp"
StandardOutput=true
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF


systemctl daemon-reload
systemctl enable hoopagent.service
systemctl start hoopagent
```

If you need the context of the application like (environment variables exposed) you can use the `hoopstart` script.

```shell
cat - >/etc/systemd/system/hoopagent.service <<EOF
[Unit]
Description=MyApp
After=network.target

[Service]
ExecStart=hoopstart -- myapp.sh
Environment="HOME=/root"
Environment="HOOP_DSN=<CLIENT-KEY>"
Environment="HOOP_CONNECTION=vmapp"
StandardOutput=true
Restart=on-failure
RestartSec=10s

[Install]
WantedBy=multi-user.target
EOF
```

## Kubernetes Sidecar

Using the [sidecar pattern](https://kubernetes.io/docs/concepts/workloads/pods/#how-pods-manage-multiple-containers) you can run a container that has the context of your main application process.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp
        name: myapp
        ports:
        - containerPort: 8000
          name: http
          protocol: TCP
      - name: hoopagent
        image: hoophq/hoopdev
        name: hoopagent
        env:
        - name: HOOP_DSN
          value: 'client-key-val'
        - name: HOOP_CONNECTION
          value: 'myapp'
```

The deployment above configures two containers, the `myapp` and `hoopagent`. Using this pattern you can separate process and share the underline context of the main application (storage, network, environment variables).

## AWS ECS

You could achieve the same pattern on Kubernetes on ECS, see [the container dependency task definition example](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/example_task_definitions.html#example_task_definition-containerdependency).

## Heroku

On heroku use a [Procfile](https://devcenter.heroku.com/articles/procfile) to specify a separated process to run the agent with the context of your application.
To install the agent use [our buildpack](https://github.com/hoophq/heroku-hoop-buildpack). See [this article](./heroku.md) for more information.

Modify a Procfile and just include the `hoopstart` script:

```shell
# Procfile ruby example
web: hoopstart -- bundle exec puma -C config/puma.rb
```
