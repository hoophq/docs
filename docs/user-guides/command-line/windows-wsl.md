---
sidebar_position: 4
slug: /installing/cli-windows-wsl
---

# Windows WSL

Install hoop on Windows with WSL

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
VERSION=$(curl -s https://releases.hoop.dev/release/latest.txt)
curl https://releases.hoop.dev/release/${VERSION}/hoop_${VERSION}_Linux_$(uname -m).tar.gz \
    -o hoop-$VERSION.tar.gz
tar --extract --file hoop-$VERSION.tar.gz -C /usr/local/bin hoop && \
    rm -f hoop-$VERSION.tar.gz && \
    chown root: /usr/local/bin/hoop && \
    exit
```
