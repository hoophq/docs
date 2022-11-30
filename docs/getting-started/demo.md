---
sidebar_position: 1
slug: /getting-started/demo
---

# Demo 

Run Hoop on your machine, and test everything locally

## Install hoop

```shell
brew install hoop
```

Check the installation:
```shell
$ hoop version
{"version":"0.0.70","git_commit":"bcc32e5ed7f836e82e5e9f9faa3284cf555c07e8","build_date":"2022-11-30T13:42:56Z","go_version":"go1.19.3","compiler":"gc","platform":"linux/amd64"}
```

## Start demo
```shell
$ hoop start

-> hoop started!
open http://127.0.0.1:8009 to begin

stop the demo
docker stop hoopdemo
```

## Access your browser

Open http://127.0.0.1:8009 in your browser to begin.

## That's it!

You are ready to go to the next step! [Create new connection!](/docs/category/connections)