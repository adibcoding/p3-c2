const MONGO_SERVER_URL =
  process.env.MONGO_SERVER_URL || "http://localhost:3000";
const SQL_SERVER_URL = process.env.SQL_SERVER_URL || "http://localhost:3001";

module.exports = { MONGO_SERVER_URL, SQL_SERVER_URL };
