import dba from '../lib/dba';
import Client from './Client';

const cacheTimeInSeconds = 60 * 5; // 5 mins of redis cache
export default class Policy {
  constructor(id) {
    this.id = id;
  }

  async getLinkedUser() {
    return new Promise(resolve => dba.cachePromiseQuery(
      null,
      cacheTimeInSeconds,
      `SELECT p.clientId
        FROM policies p
        WHERE p.id = ?`,
      [this.id],
    ).then(async (res) => {
      if (res && res[0] && res[0].clientId) {
        const [{ clientId }] = res;
        return resolve(await Client.getById(clientId));
      }
      return resolve({});
    }).catch(() => resolve({})));
  }

  static async getAllByUserName(name) {
    return new Promise(resolve => dba.cachePromiseQuery(
      null,
      cacheTimeInSeconds,
      `SELECT p.id, p.amountInsured, p.email, p.inceptionDate, p.installmentPayment, p.clientId
        FROM policies p, clients c
        WHERE c.id = p.clientId 
        AND c.name = ?`,
      [name],
    ).then(res => resolve(res || []))
      .catch(() => resolve([])));
  }
}
