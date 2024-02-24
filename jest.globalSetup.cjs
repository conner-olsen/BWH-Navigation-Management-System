// jest.globalSetup.cjs
global.fetch = require('jest-fetch-mock');
// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
jest.setMock('cross-fetch', require('jest-fetch-mock'));
