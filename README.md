A GitHub action to get "related" Issues from an Algolia Index.

## Usage

```yml
      - id: search
        name: Search based on issue title
        uses: brob/algolia-issue-search@1.0
        with: 
          app_id: ${{ secrets.ALGOLIA_APP_ID }}
          api_key: ${{ secrets.ALGOLIA_API_KEY }}
          index_name: ${{ github.event.repository.name }}
          issue_title: ${{ github.event.issue.title }}
```

### Action inputs

| Name | Description | Required |
| --- | --- | --- |
| `app_id` | ID of this application in your Algolia account (best stored in a Github Secret). | true |
| `api_key` | API key with search permissions to the index in your Algolia account (best stored in a Github Secret). | true |
| `index_name` | Name of the Algolia index to search. | true |
| `issue_title` | The title of the inciting Issue. This is used to search an Algolia Index. | true |
| `max_results` | A maximum number of results to display (default: 3) | false |

### Outputs

This Action outputs two variables: `issues_list` and `comment_body`. Both return Markdown. 

#### issues_list

```markdown
* [Issue Title](issue.url)
* [Issue Title](issue.url)
* [Issue Title](issue.url)
```
#### `comment_body`
```markdown
## Other issues similar to this one:

* [Issue title](issue.url)
```


## License

[MIT](LICENSE)