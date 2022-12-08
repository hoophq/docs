---
sidebar_position: 12
slug: /usecases/scripts
---

# Scripts | one-off

Allows executing one-off scripts using the underlying Operating System tools.

### Connection Command

```shell
python3
```

:::info note
This mode requires the agent running on top of a Linux that has the python3 runtime.
:::

## How to Use

Now it's possible to execute python scripts straight from Hoop

```shell
hoop exec python3-prod -i 'import os; print(os.environ)'
# asumming the runtime has the boto3 dependency installed
hoop exec python3-prod <<EOF
s3 = boto3.client('s3')
response = s3.list_buckets()

print('Existing buckets:')
for bucket in response['Buckets']:
    print(f'  {bucket["Name"]}')
EOF
```

It's possible to start an interactive session with pyhon

```shell
hoop connect python3-prod
```

Calling scripts are easy too

```shell
hoop exec python3-prod -- /tmp/myscript.py
```
