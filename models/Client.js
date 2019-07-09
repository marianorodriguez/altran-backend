import dba from '../lib/dba';

export default class Client {
  static async getById(id) {
    return new Promise(resolve => dba.cachePromiseQuery(
      null,
      'SELECT id, name, email, role FROM clients WHERE id = ?', [id],
    ).then(res => resolve((res && res[0]) || {}))
      .catch(() => resolve({})));
  }

  static async getAllByName(name) {
    return new Promise(resolve => dba.cachePromiseQuery(
      null,
      'SELECT id, name, email, role FROM clients WHERE name = ?', [name],
    ).then(res => resolve(res || []))
      .catch(() => resolve([])));
  }
}
