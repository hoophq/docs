---
sidebar_position: 1
slug: /plugins/runbooks/overview
---

# Runbooks

A runbook allows you to create templates that will be run against a connection runtime. Those templates are fetched from any git server source.

A runbook specifies how a client will render the inputs in order to run it:

```shell
# get-customer.runbook.sql
SELECT customerid, firstname, lastname, gender, country, phone, email, income
FROM customers
WHERE customerid = {{ .customer_id 
                    | description "the id of the customer"
                    | required "customer_id is required"
                    | type "number"
                    | squote }}
AND country = {{ .country
                | type "text"
                | description "the country code US; BR, etc"
                | default "US"
                | squote }}
```

The runbook above generates two inputs:

- **customer_id**
  - input-type: number
  - required: true
  - description: the id of the customer

- **country**
  - input-type: text
  - required: false
  - default-value: US
  - description: the country code US; BR, etc

> The `squote` is a function to put the rendered value in a single quote


When this template is run against a connection, it will be rendered replacing the placeholders. Below there's an example of how to execute it:

```
POST /api/plugins/runbooks/connections/pg-prod/exec
{
    "file_name": "get-customer.runbook.sql",
    "parameters": {"customer_id": "1040", "country": "UK"}
}
```

- It will render the following input

```sql
SELECT customerid, firstname, lastname, gender, country, phone, email, income
FROM customers
WHERE customerid = '1040'
AND country = 'UK'
```

- Assuming this runbook is issued against a `psql` connection runtime, what will happen when executing this runbook is:

```shell
psql (...) <<EOF
SELECT customerid, firstname, lastname, gender, country, phone, email, income
FROM customers
WHERE customerid = '1040'
AND country = 'UK'
EOF
```

```mdx-code-block
import DocCardList from '@theme/DocCardList';

<DocCardList />
```
