const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: `${process.env.POSTGRE_DB_USER_DEV}`,
  host: `${process.env.POSTGRE_DB_HOST_DEV}`,
  database: `${process.env.POSTGRE_DB_NAME_DEV}`,
  password: `${process.env.POSTGRE_DB_PASSWORD_DEV}`,
  port: process.env.POSTGRE_DB_PORT_DEV,
});

module.exports = pool;
