---
sidebar_position: 2
slug: /plugins/runbooks/configuring
---

# Plugin Configuration

This plugins only accepts one repository template per organization. The following http request enables the plugin:

```
POST /api/plugins
{
    "name": "runbooks",
    "connections": []
}
```

## Git Configuration

The plugin could be configured with any git server, it works clonning public git repositories and private repositories

### Public Repositories

It requires only the git URL

**Required Configuration:**

- `GIT_URL` (required) - the **GIT URL** of the repository (http or ssh)

To configure the plugin, issue the following HTTP request

```
PUT /api/plugins/runbooks/config
{
    "GIT_URL": "<base64-git-url>",
}
```

> All value fields must be base64 encoded

### Basic Credentials

It uses username and password to clone a repository **via HTTP.**

**Required Configuration:**

- `GIT_URL` (required) - the **HTTP GIT URL** of the repository
- `GIT_USER` (optional) - the git username, defaults to `oauth2` if it's empty
- `GIT_PASSWORD` (required) - the password or token that has read access to the repository

:::info
GitHub users could use [personal tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
:::

To configure the plugin with the git credentials, issue the following HTTP request

```
PUT /api/plugins/runbooks/config
{
    "GIT_URL": "<base64-git-url>",
    "GIT_PASSWORD", "<base64-git-password>"
}
```

> All value fields must be base64 encoded

### SSH Private Keys

it will use a private key to clone the repository **via SSH.**

**Required Configuration:**

- `GIT_URL` (required) - the **SSH GIT URL** of the repository
- `GIT_SSH_KEY` (required) - the private key that has read access to the repository
- `GIT_SSH_USER` (optional) - the git username, defaults to `git` if it's empty
- `GIT_SSH_KEYPASS` (optional) - the password of the key

:::info
GitHub users could follow this article to [set up a deploy key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#set-up-deploy-keys) to a repository.
:::

To configure the plugin with the git credentials, issue the following HTTP request

```
PUT /api/plugins/runbooks/config
{
    "GIT_URL": "<base64-git-url>",
    "GIT_SSH_KEY": "<base64-git-ssh-key>"
}
```

> All value fields must be base64 encoded

## Configuring Connections

Connections are associated to plugins and could define the prefix of runbooks that will be available for a particular connection. This option allows limiting the access to runbooks per connection. So the following configuration:

```
PUT /api/plugins/runbooks
{
    "name": "runbooks",
    "connections": [
        {
		    "id": "<postgres-connection>",
			"config": ["team/finops"]
		},
        {
		    "id": "<python3-connection>",
			"config": ["team/dba"]
		}
    ]
}
```

- It will allow the `python3-connection` to list and execute any runbook at `team/dba/` folder and subfolders
- It will allow the `postgres-connection` to list and execute any runbook at `team/finops/` folder and subfolders

```
├── README.md
└── team
    ├── dba
    │   └── ops
    │       └── charge.runbook.py
    └── finops
        └── sql
            └── fetch-customer.runbook.sql
```