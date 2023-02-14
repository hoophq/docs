---
sidebar_position: 3
slug: /installing-hoop-agent/cli-windows-manual
---

# Windows Native

Install hoop on Windows

1. Install the Windows Terminal https://aka.ms/terminal
2. Download the latest release of [hoop command line](https://github.com/hoophq/hoopcli/releases) for your architecture (usually **hoop-windows-amd64**) and save in the **Downloads** folder
3. Extract the file using **winrar** or **winzip**
4. Move the extracted file `hoop.exe` to the folder `C:\Windows\System32\`
5. Open a terminal session and type `hoop version`, if it show the version of program it's installed with success.

:::info OPTIONAL
To extract the file in the terminal, open a terminal session as an administrator and extract the file
```shell
# enter in the Downloads folder
cd $HOME/Downloads
# change <FILE> with the name of the downloaded file
tar -xf <FILE>
# move the extracted file to C:\Windows\System32
mv hoop.exe C:\Windows\System32
# check if it's working
hoop version
```
:::

**Initialize the agent**

```shell
hoop start agent
```

It will set-up the agent and ask to register the agent on hoop.dev UI


