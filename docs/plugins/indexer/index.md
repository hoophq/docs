---
sidebar_position: 1
slug: /plugins/indexer/overview
---

# Indexer

When enabled, indexes the contents of executions (sessions) made by users in which you could use a powerful query syntax to search.


## Information Available

| FIELD NAME      | TYPE     | DESCRIPTION                              |
| --------------- | -------- | ---------------------------------------- |
| session         | keyword  | the id of the session                    |
| user            | keyword  | the id of the user                       |
| connection      | keyword  | the connection name of this session      |
| connection_type | keyword  | the connection type of this session      |
| verb            | keyword  | the type of the execution (exec,connect) |
| size            | numeric  | the size in bytes indexed                |
| input           | string   | the input sent by the user               |
| output          | string   | output returned from the remote service  |
| error           | boolean  | if the execution returned an error       |
| started         | datetime | when the execution started               |
| completed       | datetime | when the execution ended                 |
| duration        | numeric  | the duration of the session in seconds   |


## Scope Searching

The scope of the search is bound for non-admin users. Only admin users can search for sessions that belongs to other users using the qualifier `user:<user-email>`.

## Content Truncation

The fields `input` and `output` are indexed truncated when it reaches 600KB. You are able to filter sessions truncated using `is:truncated in:<input|output>` qualifiers. 

## Session Indexing

Content is indexed if the plugin is enabled, configured for a particular connection and after the session is closed. Additionally, a job is started daily at 23:30 UTC to index all sessions that are enabled for connections. It index the last 45 days by default.

## Experimental Client

You can try the search api with the hoop command line, consult the [search syntax page](./search-syntax) to see how to interact with the API.

```
hoop search <QUERY>
```

```
Search for content in sessions

Usage:
  hoop search QUERY [flags]

Flags:
      --facets strings   The facets to display, [connection,connection_type,user,error,verb,duration]
      --fields strings   The fields to display
  -f, --file string      The path of the file containing the bleve index
  -h, --help             help for search
  -l, --limit int        The max results to return (default 50)
  -m, --mark             Highlight results
  -o, --offset int       The offset to paginate results
```

