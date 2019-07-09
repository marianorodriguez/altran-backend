/* eslint-env mocha */
import { assert, expect } from 'chai';
import { Client } from '../../models';

const mockClient = {
  id: '0059ba44-75dc-4f73-9a9f-0e2376909e28',
  name: 'Jacquelyn',
  email: 'jacquelynblankenship@quotezart.com',
  role: 'admin',
};

describe('CLIENT MODEL', () => {
  it('should return valid client searching by user id', async () => {
    const client = await Client.getById(mockClient.id);
    assert.deepEqual(client, mockClient);
  });

  it('should return empty client when searching by invalid user id', async () => {
    const invalidId = '12345';
    const client = await Client.getById(invalidId);
    assert.deepEqual(client, {});
  });

  it('should return an empty array when searching by invalid client name', async () => {
    const clients = await Client.getAllByName('invalid name');
    assert.deepEqual(clients, []);
  });

  it('should return a client list when searching by valid client name', async () => {
    const clients = await Client.getAllByName('Jacquelyn');
    expect(clients).to.be.an('array');
    assert(clients.length > 0);
    clients.forEach((c) => {
      assert(c.name === 'Jacquelyn');
    });
  });

  it('should not retrieve a client by searching for valid partial name', async () => {
    const clients = await Client.getAllByName('Jacq');
    assert(clients.length === 0);
  });
});
