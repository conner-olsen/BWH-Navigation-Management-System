/* eslint-disable @typescript-eslint/no-var-requires */
const nodeFetch = require('cross-fetch');
global.fetch = nodeFetch;

// Mock console.log to suppress logs during tests
// eslint-disable-next-line no-undef
console.log = jest.fn();
