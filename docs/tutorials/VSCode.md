---
sidebar_position: 4
slug: /tutorials/vscode
---

# VSCode

Send any script from VSCode to hoop.dev

Requirements

* Install hoop.dev CLI

Steps

1. Create a VSCode task

Create a file in the path: `.vscode/task.json` of your workspace with the contents:

```json
{
    // See https://go.microsoft.com/fwlink/?LinkId=733558
    // for the documentation about the tasks.json format
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run query with hoop.dev",
            "type": "shell",
            "command": "hoop exec ${input:connectionName} -f ${file}",
            "panel": "new",
            "showReuseMessage": false,
            "clear": true
            
        },
    ],
    "inputs": [
        {
          "type": "pickString",
          "id": "connectionName",
          "description": "Where do you want to run this script?",
          "options": [
            "db-write",
            "pg-db",
            "customers-database",
            "products-database"
          ],
          "default": "component"
        }
      ]
    
}
```

'''info
Update the `options` list with the names of the connections you want to use.
'''

2. Run your file in hoop.dev from VSCode!

Hit `ctrl+shift+P` and type `hoop.dev` to select our execution task:

![VSCode Task](https://ms80j0hi.directus.app/assets/2bc18604-09a6-45ff-8006-bdd669ed2544)
