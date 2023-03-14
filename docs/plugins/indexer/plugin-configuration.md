---
sidebar_position: 2
slug: /plugins/indexer/configuring
---

# Plugin Configuration

The indexer plugin is enabled per organization, it doesn't rely in any specific configuration.

```
POST /api/plugins
{
    "name": "indexer",
    "connections": []
}
```

After enabling it, sessions will be indexed in the filesystem by default at `/opt/hoop/indexes`. This behavior could be changed configuring the environment variable `PLUGIN_INDEX_PATH` when starting the gateway.


:::caution IMPORTANT
The content to be indexed are persisted in the filesystem and indexed after the session is closed. For self hosted installation it's important to configure persistent volumes to avoid losing indexes.
:::


The search API is available at `POST /api/plugins/indexer/search`, the request bellow performs a search in the index:

```json
{
    "query": "size:>0",
    "limit": 50,
    "offset": 0,
    "highlight": true,
    "fields": ["output", "input", "connection", "verb", "user"]
}
```
