---
sidebar_position: 4
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
4. Install and open the Ubuntu typing `ubuntu`. It should prompt to create a user in the first time

```shell
PS C:\Users\san> ubuntu
san@DESKTOP-BBQAAEG:~$ 
```

5. Gain root access

```shell
sudo su -
```

6. Download and install/upgrade the hoop command line

```shell
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
```
