---
sidebar_position: 6
slug: /installing/cli-windows-manual
---

# Windows Native

Install hoop on Windows

1. Install the Windows Terminal https://aka.ms/terminal
2. Download the latest release of [hoop command line](https://github.com/hoophq/hoopcli/releases) for your architecture and save in the **Downloads** folder
3. Extract the file using **tar** or **unzip**

:::info
To extract the file in the terminal, open a terminal session and type
```shell
tar -xf <file>.tar.gz
```
:::

4. Move the file to your home folder in the terminal

```shell
mv $HOME/Downloads/hoop.exe $HOME/hoop.exe
```

5. Type `./hoop version` to show the version
