---
sidebar_position: 9
slug: /usecases/aws-resources
---

# AWS | Resources

Hoop could be configured to use the aws command line to manage resources in multiple accounts

## Connection Configuration

| Name                    | Type    | Description                        |
|------------------------ | ------- | ---------------------------------- |
| `AWS_ACCESS_KEY_ID`     | env-var | The access key credential          |
| `AWS_SECRET_ACCESS_KEY` | env-var | The secret key credential          |
| `AWS_REGION`            | env-var | The AWS region                     |

:::info note
Use an IAM credential with reduced scope to only create secrets and/or listing ecs services
:::

### Connection Command

- secretsmanager

```shell
aws secretsmanager create-secret
```

- list-services-prod

```shell
aws ecs list-services --cluster prod
```

## How to Use

Now it's possible to create credentials on AWS Secrets Manager service

```shell
hoop exec secretsmanager -- \
    --name MyTestSecret 
    --description "My test secret created with the CLI." \
    --secret-string "{\"user\":\"diegor\",\"password\":\"EXAMPLE-PASSWORD\"}"
```

Or listing ECS Services from cluster `prod`

```shell
hoop exec list-services-prod
```
