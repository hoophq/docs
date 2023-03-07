---
sidebar_position: 2
slug: /installing/cli-linux
---

# Linux

Install or Upgrade

1. Download and install the hoop binary

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
