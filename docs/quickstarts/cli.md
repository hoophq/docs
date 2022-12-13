---
sidebar_position: 3
slug: /quickstarts/cli
---

# Command Line

The `hoop` command line allows interacting with connections. It allows signin in the platform to execute one-off tasks or creating interactive sessions.

## Installing

MacOS users have the option to use the [brew package manager](https://brew.sh/).

```shell
brew tap hoophq/hoopcli https://github.com/hoophq/hoopcli
brew install hoop
```

If you wish to install hoop manually, download the latest version for your operating system architecture in the [releases page](https://github.com/hoophq/hoopcli/releases).

## Testing

```shell
hoop version
{"version":"1.0.4","git_commit":"78133f9b056751b4acc0ccffb7a9325ef54b9100","build_date":"2022-12-13T13:08:17Z","go_version":"go1.19.3","compiler":"gc","platform":"darwin/arm64"}
```

## Upgrading

```sh
brew upgrade hoop
```

:::tip
If the commad line was installed manually, override it downloading the latest version again in the [releases page](https://github.com/hoophq/hoopcli/releases).
:::
