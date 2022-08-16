const dotenv = require("dotenv");
dotenv.config()
const { DEV_URL, DATABASE_URL } = process.env
module.exports = {
  development: {
    url: DEV_URL,
    dialect: 'postgres',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
}
