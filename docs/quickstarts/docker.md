---
sidebar_position: 1
slug: /quickstarts/docker
---

# Local

Run hoop on your machine using Docker, and test everything locally

## Install hoop

```shell
brew tap hoophq/hoopcli https://github.com/hoophq/hoopcli
brew install hoop
```

Check the installation:
```shell
hoop version
# {"version":"0.0.70","git_commit":"bcc32e5ed7f836e82e5e9f9faa3284cf555c07e8","build_date":"2022-11-30T13:42:56Z","go_version":"go1.19.3","compiler":"gc","platform":"linux/amd64"}
```

## Start local demo

```shell
$ hoop start

# -> hoop started!
#open http://127.0.0.1:8009 to begin
```

## Access your browser

Open http://127.0.0.1:8009 in your browser to begin.

