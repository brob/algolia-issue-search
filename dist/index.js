/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 749:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 782:
/***/ ((module) => {

module.exports = eval("require")("algoliasearch");


/***/ }),

/***/ 669:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const { inspect } = __nccwpck_require__(669);
const core = __nccwpck_require__(749);
const algoliasearch = __nccwpck_require__(782);

async function run() {
  try {
    const inputs = {
      appId: core.getInput('app_id'),
      apiKey: core.getInput('api_key'),
      indexName: core.getInput('index_name'),
      issueTitle: core.getInput('issue_title'),
    };
    core.info(`Inputs: ${inspect(inputs)}`);

    if (!inputs.appId && !inputs.apiKey && !inputs.indexName) {
      core.setFailed('Missing one or more of Algolia app id, API key, or index name.');
      return;
    }

    // core.info(`Writing record to index ${inputs.indexName}`)
    const client = algoliasearch(inputs.appId, inputs.apiKey);
    const index = client.initIndex(inputs.indexName);

    index.search("", { 
        similarQuery: inputs.issueTitle,

      }).then(({hits}) => {
      core.info(`Searching for record`);
      core.info(`Hits: ${inspect(hits)}`);

      const message = `## Found ${hits.length} records matching your issue.\n${hits.map(hit => `* [${hit.title}](${hit.url})`).slice(0,2).join('\n')}`
 
      core.info(message)
      core.setOutput('comment_body', message);
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
})();

module.exports = __webpack_exports__;
/******/ })()
;