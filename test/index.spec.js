/* eslint-env node, mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

const mock = require('mock-require');

mock('../lib/dba.js', {
  cachePromiseQuery: async () => [],
  promiseQuery: async () => [],
});


const serverInitialize = require('../bin/server').default;

process.env.BABEL_ENV = 'test';
chai.use(chaiHttp);

describe('SERVER', () => {
  it('should reply to PING', async () => {
    const server = await serverInitialize();
    return new Promise((resolve) => {
      chai
        .request(server)
        .get('/ping')
        .end((err, res) => {
          chai.assert.equal(res.text, 'PONG');
          chai.assert.equal(res.status, 200);
          resolve();
        });
    });
  });
});
