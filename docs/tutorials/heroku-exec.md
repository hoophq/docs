---
sidebar_position: 2
slug: /tutorials/heroku-exec
---

# Heroku Exec

This guide shows how to interact with workloads using `heroku ps:exec` and `heroku run` commands.

## Requirements

- [Hoop Command Line](../quickstarts/cli.md)
- [Agent Running](../quickstarts/saas-heroku.md)
- [Heroku API Key](https://devcenter.heroku.com/articles/authentication)

## heroku run

The `heroku run` allows creating one-off dynos. In this part of the guide we'll see how to run this command through hoop auditing everything that's being executed.

1. Deploy the [ruby getting started](https://devcenter.heroku.com/articles/getting-started-with-ruby?singlepage=true)

In a nutshell

```shell
git clone https://github.com/heroku/ruby-getting-started.git
cd ruby-getting-started
heroku create
git push heroku main
heroku open
```

2. Create an API key

```shell
heroku authorizations:create --expires-in 3600
```

3. Create a [Connection](https://app.hoop.dev/connections/command-line/new?data=eyJuYW1lIjoicnVuOltBUFAtTkFNRV0iLCJ0eXBlIjoiY29tbWFuZC1saW5lIiwic2VjcmV0Ijp7ImVudnZhcjpIRVJPS1VfQVBJX0tFWSI6IiJ9LCJjb21tYW5kIjpbIi9hcHAvYmluL2hlcm9rdSBydW4gLS1uby10dHkgLS1leGl0LWNvZGUgLS1hcHAgW0FQUC1OQU1FXSJdfQ==)

- Change the `[APP-NAME]` placeholder with the name of your app
- **Agent selection** - The name of your agent should appear in the input

### Executing one-off dynos

- Execute a script to migrate the database with hoop

```shell
hoop exec run:APP-NAME -- rake db:migrate
```

- Execute a ruby script inside a dyno

```shell
hoop exec run:APP-NAME -- rails runner - <<EOF
myvar = ENV['BUNDLER_ORIG_BUNDLE_GEMFILE']
puts "BUNDLER GEMFILE #{myvar}"
EOF
```

- Execute a regular bash command

```shell
hoop exec run:APP-NAME -i 'ls -l' -- bash
# or a bash script
hoop exec run:APP-NAME -- bash <<EOF
echo "Bash Script"
echo "base64-input" | base64
EOF
```