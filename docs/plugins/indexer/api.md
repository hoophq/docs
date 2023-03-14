---
sidebar_position: 4
slug: /plugins/indexer/api
---

# API

Use the REST API to search for specific items on sessions.

## About Search

You can use the REST API to search for the specific content inside sessions. As an administrator you may want to know if someone is passing something that they shouldn't be doing, or if some content is being exfiltrate from your environment.

It also gives an overview about how developers are using Hoop. It's possible to use facets to enrich your search query responses aggregating results based on fields.

Normal users could also the search to lookup for executions in Hoop.

## Ranking search results

The results are sorted by best match. Multiple factors are combined to boost the most relevant item to the top of the result list.

## Fields

The `fields` attribute allows asking to return information of a particular indexed field, see the list of available fields in the [overview section](./overview).

## Pagination

The fields `limit` and `offset` can be used to paginate the results from a search.

## Highlighters

It allows to highlight results to a specific client

### ANSI

The `ansi` highlighter mark the results to output them properly in a terminal

### HTML

The `html` mark the results to output them properly in an web application.

## Facets

Facets allow you to include aggregated information about the documents matching your query. In the request example we have two types of facets.

### Terms Facet

Without providing any other configuration options this will produce what is known as a Terms Facet. That means each term indexed for this field is treated as a unique bucket. For each result document, we include the document in the appropriate bucket, as determined by the configured field.

### Numeric Range Facet

With numeric range facets we can defined buckets to be bounded by numeric ranges.

### Request Example

- Here we have named the facet `connections` and requested the result to include the top 5 types or buckets in the facet.
- The session index has a `duration` field. With numeric range facets it's possible to define buckets to be bounded by numeric ranges. In this example we define 3 buckets which cover all numeric values, corresponding to sessions that took < 15 seconds, between 15 and 50 seconds and more than 120 seconds.

```json
{
  "connections": {
    "size": 5,
    "field": "connection"
  },
  "duration": {
    "size": 3,
    "field": "duration",
    "numeric_ranges": [
      {
        "name": "< 15sec ",
        "max": 15
      },
      {
        "name": "15s..50s ",
        "min": 15,
        "max": 50
      },
      {
        "name": "> 120sec ",
        "min": 120
      }
    ]
  }
}
```


## Search Sessions

- **`POST /api/plugins/indexer/sessions/search`**

### Request Body

```json
{
    "query": "size:>0",
    "limit": 50,
    "offset": 0,
    "highlighter": "html|ansi",
    "fields": [],
    "facets": null
}
```

| ATTRIBUTE | TYPE              | DESCRIPTION                                     |
| --------- | ----------------- | ----------------------------------------------- |
| query     | string (required) | the query syntax                                |
| limit     | numeric           | limit of results to return (max 50)             |
| offset    | numeric           | pagination offset                               |
| highlight | boolean           | highlight the results found in the search       |
| fields    | array             | array of string containing the fields to return |
| facets    | map               | a map to request for facets                     |

### Response Body

```json
{
  "status": {
    "total": 1,
    "failed": 0,
    "successful": 1
  },
  "request": {
    "query": {
      "must": {
        "conjuncts": [
          {
            "min": 0,
            "field": "size"
          }
        ]
      }
    },
    "size": 0,
    "from": 0,
    "highlight": null,
    "fields": [
      "connection",
      "connection_type",
      "user",
      "verb",
      "size",
      "duration",
      "started",
      "completed"
    ],
    "facets": null,
    "explain": false,
    "sort": [
      "-_score"
    ],
    "includeLocations": false,
    "search_after": null,
    "search_before": null
  },
  "hits": [],
  "total_hits": 2027,
  "bytesRead": 4054,
  "max_score": 0.7277920604639038,
  "took": 382666,
  "facets": null
}
```

| ATTRIBUTE  | TYPE    | DESCRIPTION                                                  |
| ---------- | ------- | ------------------------------------------------------------ |
| status     | map     | the status of the result                                     |
| request    | map     | the request that was sent to the API                         |
| hits       | map     | the results found in a search                                |
| total_hits | int64   | the total of results found in a search                       |
| bytesRead  | int64   | the amount of bytes read from a search                       |
| max_score  | float64 | the max scope found in a search                              |
| took       | int64   | the amount of time (in nanoseconds) it took to run the query |
| facets     | map     | the facets returned from the search                          |


### Hit Entry

Hits are ordened by score by default, an entry response has the following format

```json
{
  "id": "f7bd3500-d966-49ff-aaf9-7893d199c0da",
  "score": 1.3805454273456597,
  "locations": {
    "output": {
      "flag.pars": [
        {
          "pos": 110,
          "start": 798,
          "end": 808,
          "array_positions": null
        }
      ]
    }
  },
  "fragments": {
    "output": [
      "…03.423Z&#34;,&#34;caller&#34;:&#34;entrypoint.sh&#34;,&#34;msg&#34;:&#34;Foregrounding IPAM daemon ...&#34;}\nERROR: logging before <mark>flag.Parse</mark>: E0701 10:47:33.480783      11 memcache.go:138] couldn&#39;t get current server API group list; wi…"
    ]
  },
  "sort": [
    "_score"
  ],
  "fields": {
    "connection": "k8s-read"
  }
}
```

| ATTRIBUTE  | TYPE      | DESCRIPTION                                                    |
| ---------- | --------- | -------------------------------------------------------------- |
| id         | string    | the session id                                                 |
| score      | float64   | the score of the hit                                           |
| locations  | map       | the position of findings, valid only for `input|output` fields |
| fragments  | map       | the fragments returned from a search                           |
| sort       | array     | how the results were sorted                                    |
| fields     | map       | which fields was requested to return                           |

### Facets Response

A facet response contains the response how the fields were aggregated

```json
{
  "facets": {
    "connections": {
      "field": "connection",
      "total": 3,
      "missing": 0,
      "other": 0,
      "terms": [
        {
          "term": "k8s-read",
          "count": 3
        }
      ]
    },
    "duration": {
      "field": "duration",
      "total": 3,
      "missing": 0,
      "other": 0,
      "numeric_ranges": [
        {
          "name": "< 15sec ",
          "max": 15,
          "count": 3
        }
      ]
    }
  }
}
```