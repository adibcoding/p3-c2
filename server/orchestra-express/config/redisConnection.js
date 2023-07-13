const Redis = require("ioredis");
const redis = new Redis({
  port: 13008, // Redis port
  host: "redis-13008.c252.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "eJhDO2FZQ0NpFP48kUUxNGZfAudcKnnJ",
});

module.exports = redis;
