/* eslint-env mocha */

import chai from 'chai';
import chaiHttp from 'chai-http';

const serverInitialize = require('../bin/server').default;

process.env.BABEL_ENV = 'test';
chai.use(chaiHttp);

describe('SERVER', () => {
  it('should reply to PING', () => {
    const server = serverInitialize();
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
