import dba from '../lib/dba';

const cacheTimeInSeconds = 60 * 5; // 5 mins of redis cache
export default class Client {
  static async getById(id) {
    return new Promise(resolve => dba.cachePromiseQuery(
      null,
      cacheTimeInSeconds,
      'SELECT id, name, email, role FROM clients WHERE id = ?', [id],
    ).then(res => resolve((res && res[0]) || {}))
      .catch(() => resolve({})));
  }

  static async getByEmail(email) {
    return new Promise(resolve => dba.cachePromiseQuery(
      null,
      cacheTimeInSeconds,
      'SELECT id, name, email, role FROM clients WHERE email = ?', [email],
    ).then(res => resolve((res && res[0]) || {}))
      .catch(() => resolve({})));
  }

  static async getAllByName(name) {
    return new Promise(resolve => dba.cachePromiseQuery(
      null,
      cacheTimeInSeconds,
      'SELECT id, name, email, role FROM clients WHERE name = ?', [name],
    ).then(res => resolve(res || []))
      .catch(() => resolve([])));
  }
}
