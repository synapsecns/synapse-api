# synapse-api

Synapse REST API

* Development: https://syn-api-dev.herokuapp.com/apidoc/

* Production: https://syn-api-x.herokuapp.com/apidoc/

Documentation hosted at `/apidoc`

### Setup
* `npm i`
* `npm start`
* Generate documentation locally: `npm run gendoc`
  * Note: This script first removes `"type": module` from `package.json` as apidoc.js is not compatible with ES6 syntax, then generates documentation without the template for the `main.bundle.js` file to show up, then uses the template to generate stylized documentation, and finally replaces the `"type"` in package.json