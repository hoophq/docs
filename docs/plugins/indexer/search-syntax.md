---
sidebar_position: 3
slug: /plugins/indexer/search-syntax
---

# Search Syntax

When searching Hoop, you can construct queries that match specific numbers and words.

### Content Searching

A query can contain any combination of search qualifiers supported on Hoop. The format of the search query is:

```
SEARCH_KEYWORD_1 SEARCH_KEYWORD_N QUALIFIER_1 QUALIFIER_N
```

For example, if you wanted to search for all sessions owned by `johndoe@corp.tld` that contained the keywords `dwarf` and `kingdom` in the `output` of a session, you would use the following query:

```
dwarf kingdom in:output user:johndoe@corp.tld
```

To lookup for content in the index, use the qualifiers `in:input` or `in:output`

### Qualifiers

Qualifiers are attributes that are used to refine your query. Any [indexed field](./index.md#indexed-fields) could be used as a qualifier to filter results with except of `input` and `output`.

Some qualifiers has a special usage and are used in conjuction with indexed fields or to configure a specific search term

- `in` indicate that a query will be scoped to the fields `input` or `output`
- `is` can be used with boolean fields
- `fuzzy` configures the [fuzziness](https://en.wikipedia.org/wiki/Levenshtein_distance) of a term query

### Query Operators 

It's possible to use the query operators `AND`, `OR` or `NOT` to build more advanced queries.

For example, if you wanted to search for python execution sessions with the keywords `environ` and `kwargs` and not `requests`.

```
environ AND kwargs NOT requests in:input
```

### Fuzzy

A fuzzy query is a term query that matches terms within a specified edit distance ([Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)). So you could infer the amount of fuzziness of a query by using the `fuzzy` qualifier.

```
now in:output fuzzy:1
```

> The max size of fuzziness is `2`


### Wildcard Search

Wildcard searches are possible using the operators `*` and `?`. To match every keyword that starts with `aws*` in the `output` of a session.

```
aws* in:output
```

:::caution IMPORTANT
There's a limitation of a max of three (3) operators per query and with a minimum of 3 characters. Thus, searching `*` in the index is not allowed.
:::


### Query for values greater or less than another value

You can use `>` and `<` to search for values that are greater than or less than to another value.

| Query | Example |
| ----- | ------- |
| `>n`  | **duration:>30** matches sessions that were running for longer than 30 seconds. |
| `<n`  | **size:<10000** matches sessions that are smaller than 10 KB. |


### Query for values between a range

You can use the range syntax n..n to search for values within a range, where the first number n is the lowest value and the second is the highest value.

| Query  | Example |
| ------ | ------- |
| `n..n` | **duration:10..120** matches sessions that have between 10 and 120 seconds of duration. |

### Query for dates

You can search for dates that are earlier or later than another date, or that fall within a range of dates, by using `>`, `<`, range  or relative time queries. Date formatting must follow the RFC3339 standard (a profile of [ISO8601](https://en.wikipedia.org/wiki/ISO_8601)), which is YYYY-MM-DD (year-month-day) or `YYYY-MM-DDTHH:MM:SSZ`

| Query         | Example |
| ------------- | ------- |
| `>YYYY-MM-DD` | **started:>2023-03-13** matches sessions that begin after March 13, 2023. |
| `<YYYY-MM-DD` | **completed:<2023-01-29** matches sessions that were completed before January 29, 2023. |

You can also add optional time information THH:MM:SS+00:00 after the date, to search by the hour, minute, and second. That's T, followed by HH:MM:SS (hour-minutes-seconds), and a UTC offset (+00:00).

| Query                       | Example |
| --------------------------- | ------- |
| `YYYY-MM-DDTHH:MM:SS+00:00` | **started:2023-01-01T01:00:00+07:00..2023-03-01T15:30:15+07:00** matches sessions started between January 1, 2023 at 1 a.m. with a UTC offset of 07:00 and March 1, 2023 at 3 p.m. with a UTC offset of 07:00. |

Another option is using relative time to filter sessions using `-ns`, `-nm` or `-ns`.

| Query | Example |
| ----- | ------- |
| `-60s`| **started:-60s** matches sessions started 60 seconds ago. |
| `-5m` | **completed:5m** matches sessions that were completed 5 minutes ago. |
| `-2h` | **completed:5m** matches sessions that were completed 2 hours ago. |

### Exclude certain results

You can exclude results containing a certain word, using the `NOT` syntax. The `NOT` operator can only be used for string keywords. It does not work for numerals or dates.

| Query | Example |
| ----- | ------- |
| `NOT` | **info NOT debug** matches sessions that have the word "info" but not the word "debug". |

Another way you can narrow down search results is to exclude certain subsets. You can prefix any search qualifier with a - to exclude all results that are matched by that qualifier.

| Query          | Example |
| -------------- | ------- |
| `-qualifier`     | **-connection:bash -user:johndoe@corp.tld** matches all sessions that doesn't belong to "johndoe@corp.tld" and are not from connection "bash" |


### Boolean Queries

You could search for sessions that returned error using the `is` qualifier filter

| Query          | Example |
| -------------- | ------- |
| `is:error`     | **is:error** matches all sessions that were reported as error |
| `is:truncated` | **is:truncated in:input** matches all sessions with truncated input |
| `is:truncated` | **is:truncated in:output** matches all sessions with truncated output |

