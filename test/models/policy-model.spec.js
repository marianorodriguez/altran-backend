/* eslint-env mocha */
import { assert, expect } from 'chai';
import { Policy } from '../../models';

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

describe('POLICY MODEL', () => {
  it('should return valid policy list searching by user name', async () => {
    const policies = await Policy.getAllByUserName('Britney');
    expect(policies).to.be.an('array');
    assert(policies.length > 0);
    policies.forEach((p) => {
      assert(p.clientId === mockClient.id);
    });
  });

  it('should return empty policy array when searching for invalid user name', async () => {
    const policies = await Policy.getAllByUserName('invalid name');
    assert(policies.length === 0);
  });

  it('policy should be linked to proper user', async () => {
    const policy = new Policy(mockPolicy.id);
    const user = await policy.getLinkedUser();
    assert.deepEqual(user, mockClient);
  });

  it('policy should return empty user when created with invalid id', async () => {
    const policy = new Policy('invalid id');
    const user = await policy.getLinkedUser();
    assert.deepEqual(user, {});
  });
  it('should return an empty object when no data is passed', async () => {
    const p = new Policy();
    const p1 = await Policy.getAllByUserName();
    const p2 = await p.getLinkedUser();

    assert.deepEqual(p1, []);
    assert.deepEqual(p2, {});
  });
});
