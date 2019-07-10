/* eslint-env mocha */

import {
  assert, request, use, expect,
} from 'chai';
import chaiHttp from 'chai-http';

const mockClient = {
  id: '0059ba44-75dc-4f73-9a9f-0e2376909e28',
  name: 'Jacquelyn',
  email: 'jacquelynblankenship@quotezart.com',
  role: 'admin',
};

const serverInitialize = require('../../bin/server').default;

process.env.BABEL_ENV = 'test';
use(chaiHttp);

describe('MIDDLEWARE', () => {
  let server = null;
  beforeEach(() => {
    server = serverInitialize();
  });
  it('should reply with a valid token when succesfully logged',
    async () => new Promise((resolve) => {
      request(server)
        .post('/login')
        .send({ email: mockClient.email })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.success, true);
          expect(res.body.token).to.be.a('string');
          resolve();
        });
    }));

  it('should return empty token on unauthorized login',
    async () => new Promise((resolve) => {
      request(server)
        .post('/login')
        .send({ email: 'invalid_email' })
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.success, false);
          assert.equal(res.body.token, null);
          resolve();
        });
    }));

  it('should return empty token when no email is passed',
    async () => new Promise((resolve) => {
      request(server)
        .post('/login')
        .end((err, res) => {
          assert.equal(res.status, 401);
          assert.equal(res.body.success, false);
          assert.equal(res.body.token, null);
          resolve();
        });
    }));
});
