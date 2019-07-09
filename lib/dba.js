import mysql from 'mysql';
import crypto from 'crypto';
import redis from 'redis';
import dbParams from './DB_CONFIG.json';

const dbConfig = {
  charset: 'latin1',
  connectionLimit: 1,
  database: 'altran',
  host: dbParams.host,
  password: dbParams.password,
  user: dbParams.user,
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
const isProduction = process.env.NODE_ENV === 'production';

async function cachePromiseQuery(keyNoPrefix = null, timeInSecs = 60, ...args) {
  let key = `SQL|${keyNoPrefix}`;
  if (!keyNoPrefix) {
    const md5 = crypto.createHash('md5').update(JSON.stringify(args)).digest('hex');
    key = `SQL|${md5}`;
  }
  if (isProduction) {
    const cacheQuery = await redisPromiseGet(key);
    if (cacheQuery) {
      return JSON.parse(cacheQuery);
    }
  }

  const rows = await promiseQuery(...args);
  if (isProduction) {
    redisClient.set(key, JSON.stringify(rows));
    redisClient.expire(key, timeInSecs);
  }
  return rows;
}

export default {
  promiseQuery,
  cachePromiseQuery,
};
