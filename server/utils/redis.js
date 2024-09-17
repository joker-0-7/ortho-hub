const { Redis } = require("ioredis");
const redisClient = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error("Redis Connection Failed");
};
module.exports = new Redis(redisClient());
