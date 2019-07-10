/* eslint-env mocha */

import {
  assert, expect, request, use,
} from 'chai';
import chaiHttp from 'chai-http';

const mockPolicy = {
  id: '0039b246-5ffa-4b90-b16f-fc9f2d4033d6',
  amountInsured: 879.83,
  email: 'inesblankenship@quotezart.com',
  inceptionDate: '2014-06-29 03:41:22',
  installmentPayment: 0,
  clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86',
};
const mockClient = {
  id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
  name: 'Britney',
  email: 'britneyblankenship@quotezart.com',
  role: 'admin',
};

const serverInitialize = require('../../bin/server').default;

process.env.BABEL_ENV = 'test';
use(chaiHttp);

describe('POLICIES CONTROLLER', () => {
  let server = null;
  let adminToken = null;
  beforeEach(async () => {
    adminToken = await new Promise((resolve) => {
      server = serverInitialize();
      request(server)
        .post('/login')
        .send({ email: mockClient.email })
        .end((err, res) => {
          resolve(res.body.token);
        });
    });
  });

  it('should reply with a policy list when passed a user name',
    async () => new Promise((resolve) => {
      request(server)
        .get(`/policies/byUsername/${mockClient.name}`)
        .set('token', adminToken)
        .end((err, res) => {
          assert.equal(res.body.found, true);
          expect(res.body.policies).to.be.an('array');
          assert(res.body.policies.length > 0);
          res.body.policies.forEach((p) => {
            assert(p.clientId === mockClient.id);
          });
          assert.equal(res.status, 200);
          resolve();
        });
    }));

  it('should return an empty list when passed an invalid user name',
    async () => new Promise((resolve) => {
      request(server)
        .get('/policies/byUsername/invalid_name')
        .set('token', adminToken)
        .end((err, res) => {
          assert.equal(res.body.found, false);
          expect(res.body.policies).to.be.an('array');
          assert(res.body.policies.length === 0);
          resolve();
        });
    }));

  it('should reply with an user when searching users given a policy id',
    async () => new Promise((resolve) => {
      request(server)
        .get(`/policies/user/${mockPolicy.id}`)
        .set('token', adminToken)
        .end((err, res) => {
          assert.equal(res.body.found, true);
          expect(res.body.client).to.be.an('object');
          assert(res.body.client.id === mockClient.id);
          resolve();
        });
    }));

  it('should reply with an empty user when searching users given an invalid policy id',
    async () => new Promise((resolve) => {
      request(server)
        .get('/policies/user/invalid_policy_id')
        .set('token', adminToken)
        .end((err, res) => {
          assert.equal(res.body.found, false);
          expect(res.body.client).to.be.an('object');
          assert.deepEqual(res.body.client, {});
          resolve();
        });
    }));

  it('should return unauthorized if a token is not present in this header',
    async () => new Promise((resolve) => {
      request(server)
        .get(`/policies/user/${mockPolicy.id}`)
        .end((err, res) => {
          assert.equal(res.status, 401);
          expect(res.body.error).to.be.an('object');
          resolve();
        });
    }));

  it('should return unauthorized if called by a client with no admin role',
    async () => {
      const userToken = await new Promise((resolve) => {
        server = serverInitialize();
        request(server)
          .post('/login')
          .send({ email: 'lorettablankenship@quotezart.com' })
          .end((err, res) => {
            resolve(res.body.token);
          });
      });

      return new Promise((resolve) => {
        request(server)
          .get(`/policies/byUsername/${mockClient.name}`)
          .set('token', userToken)
          .end((err, res) => {
            assert.equal(res.status, 401);
            expect(res.body.error).to.be.an('object');
            resolve();
          });
      });
    });
});
