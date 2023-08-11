---
sidebar_position: 9
slug: /tutorials/aws-ecs
---

# AWS ECS

This demo shows how to deploy a ruby application on ECS with the hoop agent.

## Requirements

- ECS cluster
- Hoop Command Line

**1. Login at Hoop and generate a client key**

```shell
hoop login
HOOP_DSN=$(hoop admin create clientkeys ecs)
```

**2. Create the application demo image**

```shell
# https://github.com/hoophq/ruby-getting-started
IMAGE=hoophq/ruby-getting-started
```

:::info
If you want to use your own image for this demo, build and push the image to your own registry.
In a production setup use the [Elastic Container Registry (ECR) service](https://docs.aws.amazon.com/AmazonECR/latest/public/what-is-ecr.html)
:::

## Embeeded Agent

This demo requires that the hoop agent command is installed locally within your application, refer to [docker installation](../installing/embedded#docker) to see how to install it.

**1. Create the Task Definition**

Before creating the task definition, make sure that you have:

- The [Task Role ARN](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- The log configuration group configured properly

```shell
HOOP_CONNECTION=demo-rails
AWS_REGION=us-east-2
AWSLOG_GROUP=/ecs/webapp
ROLE_ARN=arn:aws:iam::200074533906:role/ecsTaskExecutionRole
cat <<EOF > /tmp/$HOOP_CONNECTION.json
{
    "family": "$HOOP_CONNECTION",
    "containerDefinitions": [
        {
            "name": "$HOOP_CONNECTION",
            "image": "$IMAGE",
            "portMappings": [{ "containerPort": 3000, "hostPort": 3000, "protocol": "tcp" }],
            "entryPoint": ["hoopstart", "--", "bundle", "exec", "puma", "-C", "config/puma.rb"],
            "environment": [
                { "name": "HOOP_DSN", "value": "$HOOP_DSN" },
                { "name": "HOOP_CONNECTION", "value": "$HOOP_CONNECTION" }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": { "awslogs-group": "$AWSLOG_GROUP", "awslogs-region": "$AWS_REGION", "awslogs-stream-prefix": "ecs" }
            }
        }
    ],
    "taskRoleArn": "$ROLE_ARN",
    "executionRoleArn": "$ROLE_ARN",
    "networkMode": "awsvpc",
    "requiresCompatibilities": [ "FARGATE" ],
    "cpu": "512",
    "memory": "1024"
}
EOF
```

```shell
aws ecs register-task-definition \
    --region=$AWS_REGION \
    --cli-input-json file:///tmp/$HOOP_CONNECTION.json
```

**2. Create the Service**

Before you proceed, make sure to add:

- The name of your cluster
- The VPC, subnets and the security group for the [AWS VPC Configuration](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking-awsvpc.html)

```shell
CLUSTER=dev
VPC_CONFIG="awsvpcConfiguration={subnets=[subnet-xxx01,subnet-xxx02],securityGroups=[sg-xxxx],assignPublicIp=ENABLED}"
```

```shell
aws ecs create-service --cluster $CLUSTER \
    --service-name=$HOOP_CONNECTION \
    --task-definition=$HOOP_CONNECTION \
    --region=$AWS_REGION \
    --desired-count=2 \
    --launch-type FARGATE \
    --platform-version LATEST \
    --network-configuration=$VPC_CONFIG
```

Wait for the service to start the web application

**3. Connect to the application via console (bash)**

After the service is running, a connection will be published automatically at your hoop instance. To obtain a bash session, execute the command below:

:::info
To see if the connection is published, issue the command:
`hoop admin get conn ecs:$HOOP_CONNECTION`
:::

### Start a bash console

```shell
# this is analougous to
# /bin/bash
hoop connect ecs:$HOOP_CONNECTION
```

### Start a rails console

```shell
# this is analougous to
# /bin/bash -c 'rails console'
hoop connect ecs:$HOOP_CONNECTION -- -c 'rails console'
```

### Execute one off commands

```shell
# this is analougous to
# echo -n 'pp Rails.env' | /bin/bash -c 'rails runner -'
hoop exec ecs:$HOOP_CONNECTION -i 'pp Rails.env' -- -c 'rails runner -'
```

:::info
By the default, this mode create connections automatically using `/bin/bash` as entrypoint which allows unsrestricted access. It's possible to override the entrypoint to restrict which tools users are able to use.
:::

## Sidecar Agent

The sidecar is a less intrusive approach that runs the process in a different container side by side with the application sharing its network context.

**1. Create the Task Definition**

Before creating the task definition, make sure that you have:

- The [Task Role ARN](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html)
- The log configuration group configured properly

```shell
HOOP_CONNECTION=demo-rails-sidecar
AWS_REGION=us-east-2
AWSLOG_GROUP=/ecs/webapp
ROLE_ARN=arn:aws:iam::200074533906:role/ecsTaskExecutionRole
cat <<EOF > /tmp/$HOOP_CONNECTION.json
{
    "family": "$HOOP_CONNECTION",
    "containerDefinitions": [
        {
            "name": "$HOOP_CONNECTION",
            "image": "$IMAGE",
            "portMappings": [{ "containerPort": 3000, "hostPort": 3000, "protocol": "tcp" }],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": { "awslogs-group": "$AWSLOG_GROUP", "awslogs-region": "$AWS_REGION", "awslogs-stream-prefix": "ecs" }
            }
        },
        {
            "name": "hoopagent",
            "image": "$IMAGE",
            "command": ["hoop", "start", "agent"],
            "environment": [
                { "name": "HOOP_DSN", "value": "$HOOP_DSN" },
                { "name": "HOOP_CONNECTION", "value": "$HOOP_CONNECTION" }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": { "awslogs-group": "$AWSLOG_GROUP", "awslogs-region": "$AWS_REGION", "awslogs-stream-prefix": "ecs" }
            }
        }
    ],
    "taskRoleArn": "$ROLE_ARN",
    "executionRoleArn": "$ROLE_ARN",
    "networkMode": "awsvpc",
    "requiresCompatibilities": [ "FARGATE" ],
    "cpu": "512",
    "memory": "1024"
}
EOF
```

```shell
aws ecs register-task-definition \
    --region=$AWS_REGION \
    --cli-input-json file:///tmp/$HOOP_CONNECTION.json
```

**2. Create the Service**

Before you proceed, make sure to known:

- The name of your cluster
- The VPC, subnets and the security group for the [AWS VPC Configuration](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking-awsvpc.html)

```shell
CLUSTER=dev
VPC_CONFIG="awsvpcConfiguration={subnets=[subnet-xxx01,subnet-xxx02],securityGroups=[sg-xxxx],assignPublicIp=ENABLED}"
```

```shell
aws ecs create-service --cluster $CLUSTER \
    --service-name=$HOOP_CONNECTION \
    --task-definition=$HOOP_CONNECTION \
    --region=$AWS_REGION \
    --desired-count=2 \
    --launch-type FARGATE \
    --platform-version LATEST \
    --network-configuration=$VPC_CONFIG
```

Wait for the service to start the web application

### Start a bash console

```shell
# this is analougous to
# /bin/bash
hoop connect ecs:$HOOP_CONNECTION
```

### Start a rails console

```shell
# this is analougous to
# /bin/bash -c 'rails console'
hoop connect ecs:$HOOP_CONNECTION -- -c 'rails console'
```

### Execute one off commands

```shell
# this is analougous to
# echo -n 'pp Rails.env' | /bin/bash -c 'rails runner -'
hoop exec ecs:$HOOP_CONNECTION -i 'pp Rails.env' -- -c 'rails runner -'
```

## Standalone Agent

This mode runs the agent in standalone mode and connect to ECS instances using a wrapper script that perform `aws ecs execute-command` to interact with tasks. Please refer to [the AWS documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html#ecs-exec-enabling-and-using) for more details about how to configure ECS tasks properly.

The wrapper script is a bash that execute commands to an ECS cluster/service/task, thus it requires AWS credentials to interact with these resources. See the [ecs-exec connection](../connections/ecs-exec.md) documentation for more details.

**1. Create an agent token**

```shell
HOOP_TOKEN=$(hoop admin create agent ecs)
HOOP_GRPCURL=https://app.hoop.dev:8443
```

:::info IMPORTANT
Make sure to use your hoop gateway instance for the environment variable `HOOP_GRPCURL`.
:::

**2. Create the task definition**


```shell
AWS_REGION=us-east-2
AWSLOG_GROUP=/ecs/webapp
ROLE_ARN=arn:aws:iam::200074533906:role/ecsTaskExecutionRole
cat <<EOF > /tmp/hoopagent.json
{
    "family": "hoopagent",
    "containerDefinitions": [
        {
            "name": "hoopagent",
            "image": "hoophq/hoopdev",
            "environment": [
                { "name": "HOOP_TOKEN", "value": "$HOOP_TOKEN" },
                { "name": "HOOP_GRPCURL", "value": "$HOOP_GRPCURL" }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": { "awslogs-group": "$AWSLOG_GROUP", "awslogs-region": "$AWS_REGION", "awslogs-stream-prefix": "ecs" }
            }
        }
    ],
    "taskRoleArn": "$ROLE_ARN",
    "executionRoleArn": "$ROLE_ARN",
    "networkMode": "awsvpc",
    "cpu": "512",
    "memory": "1024",
    "requiresCompatibilities": [ "FARGATE" ]
}
EOF
```

```shell
aws ecs register-task-definition \
    --region $AWS_REGION \
    --cli-input-json file:///tmp/hoopagent.json
```

**3. Create the Service**

```shell
CLUSTER=dev
VPC_CONFIG="awsvpcConfiguration={subnets=[subnet-xxx01,subnet-xxx02],securityGroups=[sg-xxxx],assignPublicIp=ENABLED}"
```

```shell
aws ecs create-service --cluster $CLUSTER \
    --service-name=hoopagent \
    --task-definition=hoopagent \
    --region $AWS_REGION \
    --desired-count=1 \
    --launch-type FARGATE \
    --platform-version LATEST \
    --network-configuration=$VPC_CONFIG
```

Wait for the service to start the agent

:::info
To check if the agent is online: `hoop admin get agents`
:::


### Start a bash console

```shell
ECS_SERVICE=ecs-app
```

```shell
hoop admin create conn demo-bash-console --overwrite -a ecs \
    --env ECS_CONTAINER_METADATA_URI_V4=system.agent.envs \
    --env ECS_AGENT_URI=system.agent.envs \
    --env AWS_CONTAINER_CREDENTIALS_RELATIVE_URI=system.agent.envs \
    --env AWS_EXECUTION_ENV=system.agent.envs \
    --env AWS_DEFAULT_REGION=system.agent.envs \
    --env SERVICE_NAME=$ECS_SERVICE \
    --env CLUSTER=$CLUSTER \
    -- ecs-exec.sh --service-name '$SERVICE_NAME' --cluster '$CLUSTER' --pipe 'bash' --interactive
```

```shell
hoop connect demo-bash-console
```

### Start a rails console

```shell
ECS_SERVICE=ecs-app
```

```shell
hoop admin create conn demo-rails-console --overwrite -a ecs \
    --env ECS_CONTAINER_METADATA_URI_V4=system.agent.envs \
    --env ECS_AGENT_URI=system.agent.envs \
    --env AWS_CONTAINER_CREDENTIALS_RELATIVE_URI=system.agent.envs \
    --env AWS_EXECUTION_ENV=system.agent.envs \
    --env AWS_DEFAULT_REGION=system.agent.envs \
    --env SERVICE_NAME=$ECS_SERVICE \
    --env CLUSTER=$CLUSTER \
    -- ecs-exec.sh --service-name '$SERVICE_NAME' --cluster '$CLUSTER' --pipe 'rails console' --interactive
```

```shell
hoop connect demo-rails-console
```


### Execute one off commands

```shell
ECS_SERVICE=ecs-app
```

```shell
hoop admin create conn demo-oneoff --overwrite -a ecs \
    --env ECS_CONTAINER_METADATA_URI_V4=system.agent.envs \
    --env ECS_AGENT_URI=system.agent.envs \
    --env AWS_CONTAINER_CREDENTIALS_RELATIVE_URI=system.agent.envs \
    --env AWS_EXECUTION_ENV=system.agent.envs \
    --env AWS_DEFAULT_REGION=system.agent.envs \
    --env SERVICE_NAME=$ECS_SERVICE \
    --env CLUSTER=$CLUSTER \
    -- ecs-exec.sh --service-name '$SERVICE_NAME' --cluster '$CLUSTER' --pipe 'rails runner -'
```

```shell
hoop exec demo-oneoff -i 'puts Rails.env'
```

:::info
- The `system.agent.envs` will expose the upstream enviroment variable to the connection making it available for using the IAM instance role attached.
- The `ecs-exec.sh` is the wrapper script contained in the `hoop/hoopdev` image
:::