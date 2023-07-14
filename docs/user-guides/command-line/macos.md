---
sidebar_position: 1
slug: /installing/cli-macos
---

# Mac OS

MacOS users have the option to use the [brew package manager](https://brew.sh/).

```shell
brew tap hoophq/hoopcli https://github.com/hoophq/hoopcli
brew install hoop
```

To upgrade it

```shell
brew upgrade hoop
```

## Manual Installation

```shell
curl -s -L https://releases.hoop.dev/release/install-cli.sh | sh
```

## Manual Local User Installation

```shell
VERSION=$(curl -s https://releases.hoop.dev/release/latest.txt)
curl https://releases.hoop.dev/release/${VERSION}/hoop_${VERSION}_Darwin_$(uname -m).tar.gz \
    -o hoop-$VERSION.tar.gz && \
    mkdir -p $HOME/.hoop/bin && \
    tar --extract --file hoop-$VERSION.tar.gz -C $HOME/.hoop/bin/ hoop && \
    rm -f hoop-$VERSION.tar.gz && \
    xattr -rc $HOME/.hoop/bin/hoop && \
    chown $USER: $HOME/.hoop/bin/hoop && \
    export PATH=$PATH:$HOME/.hoop/bin && \
    hoop version
```

You'll need to add the configuration below in your profile to allow acessing hoop from a new terminal session. This configuration usually resides at `$HOME/.bash_profile`. It may differ depending on which shell you're using.

```shell
# profile
export PATH=$PATH:$HOME/.hoop/bin
```
