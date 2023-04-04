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

## Manual

```shell
sudo su -
```

```shell
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
curl https://hoopartifacts.s3.amazonaws.com/release/${VERSION}/hoop_${VERSION}_Darwin_$(uname -m).tar.gz \
    -o hoop-$VERSION.tar.gz && \
    tar --extract --file hoop-$VERSION.tar.gz -C /usr/local/bin hoop && \
    rm -f hoop-$VERSION.tar.gz && \
    xattr -rc /usr/local/bin/hoop && \
    chown root: /usr/local/bin/hoop && \
    hoop version && \
    exit
```
