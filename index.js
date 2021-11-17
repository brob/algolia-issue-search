const { inspect } = require('util');
const core = require('@actions/core');
const algoliasearch = require('algoliasearch');

async function run() {
  try {
    const inputs = {
      appId: core.getInput('app_id'),
      apiKey: core.getInput('api_key'),
      indexName: core.getInput('index_name'),
      issueTitle: core.getInput('issue_title'),
      maxResults: core.getInput('max_results'),
    };
    core.info(`Inputs: ${inspect(inputs)}`);

    if (!inputs.appId && !inputs.apiKey && !inputs.indexName) {
      core.setFailed('Missing one or more of Algolia app id, API key, or index name.');
      return;
    }

    inputs.maxResults = inputs.maxResults || 3;

    // core.info(`Writing record to index ${inputs.indexName}`)
    const client = algoliasearch(inputs.appId, inputs.apiKey);
    const index = client.initIndex(inputs.indexName);

    index.search('', { 
        similarQuery: inputs.issueTitle,
        hitsPerPage: inputs.maxResults
      }).then(({hits}) => {
      core.info(`Searching for record`);
      core.info(`Hits: ${inspect(hits)}`);
      const message = `## Other issues similar to this one:\n${hits.map(hit => `* [${hit.title}](${hit.url})`).join('\n')}`
      const listItems = `${hits.map(hit => `* [${hit.title}](${hit.url})`).join('\n')}\n`
      core.info(message)
      core.info(listItems)
      core.setOutput('comment_body', message);
      core.setOutput('issues_list', listItems);
    })
      .catch(err => {
        core.setFailed(err.message);
      }
    );



    // index.saveObject(JSON.parse(inputs.record), {'autoGenerateObjectIDIfNotExist': true})
    //   .then(({ objectID }) => {
    //     core.setOutput('object_id', objectID);
    //     core.info(
    //       `Created record in index ${inputs.indexName} with objectID ${objectID}.`
    //     );
    //   })
    //   .catch((err) => {
    //     core.setFailed(`Failed to save object: ${err}`);
    //   });

  } catch (error) {
    core.debug(inspect(error));
    core.setFailed(error.message);
    if (error.message == 'Resource not accessible by integration') {
      core.error(`See this action's readme for details about this error`);
    }
  }
}

run();