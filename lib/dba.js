import mysql from 'mysql';
import crypto from 'crypto';
import redis from 'redis';

const dbConfig = {
  charset: 'latin1',
  connectionLimit: 1,
  database: 'altran',
  host: 'localhost',
  password: '123456',
  user: 'root',
};

const connection = mysql.createPool(dbConfig);

function promiseQuery(...args) {
  return new Promise((resolve, reject) => {
    connection.query(...args, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

const redisClient = redis.createClient();

function redisPromiseGet(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, res) => {
      if (err) return reject(err);
      return resolve(res);
    });
  });
}

async function cachePromiseQuery(keyNoPrefix = null, ...args) {
  let key = `SQL|${keyNoPrefix}`;
  if (!keyNoPrefix) {
    const md5 = crypto.createHash('md5').update(JSON.stringify(args)).digest('hex');
    key = `SQL|${md5}`;
  }

  const cacheQuery = await redisPromiseGet(key);
  if (cacheQuery) {
    return JSON.parse(cacheQuery);
  }

  const rows = await promiseQuery(...args);
  redisClient.set(key, JSON.stringify(rows));
  return rows;
}

export default {
  promiseQuery,
  cachePromiseQuery,
};
