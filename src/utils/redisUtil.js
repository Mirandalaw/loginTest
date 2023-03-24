const redis = require('redis');

const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;

const redisClient = redis.createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    },
    password: REDIS_PASSWORD,
    legacyMode: true
});
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then();

const redisCli = redisClient.v4;

module.exports = redisCli;

