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

After enabling it, you could enable which connection to index. Sessions will be indexed in the filesystem by default at `/opt/hoop/indexes`. This behavior could be changed configuring the environment variable `PLUGIN_INDEX_PATH` when starting the gateway.


:::caution IMPORTANT
The content to be indexed are persisted in the filesystem and indexed after the session is closed. For self hosted installation it's important to configure persistent volumes to avoid losing indexes.
:::
