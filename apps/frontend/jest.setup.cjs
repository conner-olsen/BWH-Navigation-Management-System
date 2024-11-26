/* eslint-disable @typescript-eslint/no-var-requires */
const nodeFetch = require("cross-fetch");

// Polyfill fetch and related constructors globally
global.fetch = nodeFetch;
global.Request = nodeFetch.Request;
global.Response = nodeFetch.Response;
global.Headers = nodeFetch.Headers;
