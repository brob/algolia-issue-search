# Create or Update Algolia Index Record

A GitHub action to add or update a record in an Algolia index.

## Usage

```yml
      - name: Add to index
        uses: ./.github/actions/add-index-record
        with:
          app_id: ${{ secrets.ALGOLIA_APP_ID }}
          api_key: ${{ secrets.ALGOLIA_API_KEY }}
          index_name: ${{ github.event.repository.name }}
          record: |
            {
              "title": "${{ github.event.issue.title }}", 
              "url": "${{ github.event.issue.html_url }}", 
              "labels": "${{ github.event.issue.labels }}",
              "objectID": "${{ github.event.issue.number }}"
            }
```

### Action inputs

| Name | Description | Required |
| --- | --- | --- |
| `app_id` | ID of this application in your Algolia account (best stored in a Github Secret). | true |
| `api_key` | API key with write permissions to the index in your Algolia account (best stored in a Github Secret). | true |
| `index_name` | Name of the Algolia index to write this record. | true |
| `record` | JSON record to write to this index as a string (see https://www.algolia.com/doc/guides/sending-and-managing-data/prepare-your-data/#algolia-records for details). | true |

#### Outputs

Outputs the ID of the created record object. Note that in order to read the step output the action step must have an id.

```yml
      - name: Add to index
        id: index_step
        uses: chuckmeyer/add-algolia-record@v0
        with:
          app_id: ${{ secrets.ALGOLIA_APP_ID }}
          api_key: ${{ secrets.ALGOLIA_API_KEY }}
          index_name: ${{ github.event.repository.name }}
          record: |
            {"title": "${{ github.event.issue.title }}", "url": "${{ github.event.issue.html_url }}", "labels": "${{ github.event.issue.labels }}",
             "objectID": "${{ github.event.issue.number }}"}
      - name: Check outputs
        run: |
          echo "Object ID - ${{ steps.index_step.outputs.object_id }}"
```

## License

[MIT](LICENSE)