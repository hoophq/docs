---
sidebar_position: 17
slug: /connections/bastion
---

# Bastion Server | ssh cli

Hoop could act as a bastion server and connect into ssh hosts to allow execution of one-off sessions.

## Connection Configuration

| Name                    | Type       | Description                                                            |
|------------------------ | ---------- | ---------------------------------------------------------------------- |
| `SSH_PRIVATE_KEY`       | filesystem | The SSH key to connect into servers                                    |
| `SSH_URI`               | env-var    | The URI to connect to the server, e.g.: `ssh://[user@]hostname[:port]` |

### Connection Command

```shell
ssh $SSH_URI -i $SSH_PRIVATE_KEY
```

## How to Use

Start an interactive session with ssh remote server

```shell
# bash interactive session
hoop connect node01
# python3 interactive session
hoop connect node01 -- -t python3
```

In the same connection, one-off process can be run as well

```shell
hoop exec node01 -- python3 <<EOF
import os
print(os.environ)
EOF

hoop exec node01 -i 'import os; print(os.environ)' -- python3
hoop exec node01 -- 'uname -a'
```
