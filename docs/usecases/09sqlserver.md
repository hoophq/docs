---
sidebar_position: 9
slug: /usecases/sqlserver
---

# SQL Server | sqlcmd cli

An optional way to connect into SQL Server is using the [sqlcmd client](https://learn.microsoft.com/en-us/sql/ssms/scripting/sqlcmd-use-the-utility?view=sql-server-ver16#interactive-sqlcmd-example). It's possible to create a interactive session or execute one-off commands.

## Connection Configuration

- **SERVER_ADDRESS** - The Server Address of the SQL Server to connect into
- **USER** - The username to connect in the SQL Server instance
- **PASS** - The password to connect in the SQL Server instance
- **DB** - The name of the database to connect into
- **COMMAND**

```shell
sqlcmd -b -r -S$SERVER_ADDRESS -U$USER -P$PASS -d$DB
```

## How to Use

Start an interactive session with sqlcmd client

```shell
hoop connect mssql
```

In the same connection, one-off process can be run as well

```shell
hoop exec mssql <<EOF
SELECT @@VERSION
GO
EOF
```

```shell
hoop exec mssql -f /tmp/myquery.sql
hoop exec mssql -i 'SELECT @@VERSION'
# pass arguments to sqlcmd
hoop exec mssql -- -s ";" -h -1 -W <<EOF
SELECT * FROM master.INFORMATION_SCHEMA.SCHEMATA
EOF
```

> Be aware that allowing passing arguments grants capabilities to override flags defined in the connection. E.g.: `hoop exec <conn> -- -Uoverrideuser`