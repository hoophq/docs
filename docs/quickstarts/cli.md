---
sidebar_position: 3
slug: /quickstarts/cli
---

# Command Line

The `hoop` command line allows interacting with connections. It allows signin in the platform to execute one-off tasks or creating interactive sessions.

## Installing

Choose the best option based on your operating system architecture.

### Mac OS

MacOS users have the option to use the [brew package manager](https://brew.sh/).

```shell
brew tap hoophq/hoopcli https://github.com/hoophq/hoopcli
brew install hoop
```

To upgrade it

```shell
brew upgrade hoop
```

### Linux

Install or Upgrade

```shell
sudo su -
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
curl https://hoopartifacts.s3.amazonaws.com/release/${VERSION}/hoop_${VERSION}_Linux_$(uname -m).tar.gz \
    -o hoop-$VERSION.tar.gz
tar --extract --file hoop-$VERSION.tar.gz -C /usr/local/bin hoop && \
    rm -f hoop-$VERSION.tar.gz && \
    chown root: /usr/local/bin/hoop && \
    exit
```

### Windows | Ubuntu WSL

1. Install the Windows Terminal https://aka.ms/terminal
2. Install Ubuntu WSL https://ubuntu.com/wsl
3. Open the Windows Terminal App
4. Install and open the Ubuntu, it should prompt to create a user in the first time

```shell
PS C:\Users\san> ubuntu
san@DESKTOP-BBQAAEG:~$ 
```

5. Download and install/upgrade the hoop command line

```shell
sudo su -
VERSION=$(curl -s https://hoopartifacts.s3.amazonaws.com/release/latest.txt)
curl https://hoopartifacts.s3.amazonaws.com/release/${VERSION}/hoop_${VERSION}_Linux_$(uname -m).tar.gz \
    -o hoop-$VERSION.tar.gz
tar --extract --file hoop-$VERSION.tar.gz -C /usr/local/bin hoop && \
    rm -f hoop-$VERSION.tar.gz && \
    chown root: /usr/local/bin/hoop && \
    exit
```

### Manual

Check the latest version for your operating system architecture in the [releases page](https://github.com/hoophq/hoopcli/releases).

## Testing

```shell
hoop version
{"version":"1.0.4","git_commit":"78133f9b056751b4acc0ccffb7a9325ef54b9100","build_date":"2022-12-13T13:08:17Z","go_version":"go1.19.3","compiler":"gc","platform":"darwin/arm64"}
```
