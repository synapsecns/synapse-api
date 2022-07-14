# synapse-api

Synapse REST API. Please refer to [FAQs](https://syn-api-dev.herokuapp.com/apidoc/#api-_header) before using the API or opening a discord ticket

* API: https://syn-api-dev.herokuapp.com/apidoc/

### Local Setup
* `npm i`
* `npm start`

### Run with Docker

* `docker build . -t syn-api`
* `docker run -d -p 8080:8080 syn-api`

### Documentation

* Documentation is hosted at the `/apidoc` endpoint for all hosted API instances.
* Generating documentation locally: `npm run gendoc`
  * Note: The `gendoc` script first temporarily sets the `type` attribute for `package.json`to `commonjs` as apidoc.js is incompatible with ES6 syntax. It then generates documentation without the template (to generate the `main.bundle.js` file, which is not generated with when using the template flag), then finally uses the template to generate stylized documentation inside of `docs/apidoc` and reverts the `type` attribute.