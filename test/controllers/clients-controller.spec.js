/* eslint-env mocha */

import {
  assert, request, use,
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

describe('CLIENTS CONTROLLER', () => {
  let server = null;
  beforeEach(async () => {
    server = await serverInitialize();
  });

  it('should reply with a client when passed a clientId',
    async () => new Promise((resolve) => {
      request(server)
        .get(`/clients/byId/${mockClient.id}`)
        .end((err, res) => {
          assert.equal(res.body.found, true);
          assert.deepEqual(res.body.client, mockClient);
          assert.equal(res.status, 200);
          resolve();
        });
    }));

  it('should reply with an empty object when searching by invalid client id',
    async () => new Promise((resolve) => {
      request(server)
        .get('/clients/byId/invalid_id')
        .end((err, res) => {
          assert.equal(res.body.found, false);
          assert.deepEqual(res.body.client, {});
          assert.equal(res.status, 200);
          resolve();
        });
    }));

  it('should reply with a client list when passed a client name',
    async () => new Promise((resolve) => {
      request(server)
        .get(`/clients/byName/${mockClient.name}`)
        .end((err, res) => {
          assert.equal(res.body.found, true);
          assert(res.body.clients.length > 0);
          res.body.clients.forEach((c) => {
            assert.equal(c.name, mockClient.name);
          });
          resolve();
        });
    }));

  it('should reply with an empty client list when passed an invalid client name',
    async () => new Promise((resolve) => {
      request(server)
        .get('/clients/byName/invalid_name')
        .end((err, res) => {
          assert.equal(res.body.found, false);
          assert(res.body.clients.length === 0);
          resolve();
        });
    }));
});
