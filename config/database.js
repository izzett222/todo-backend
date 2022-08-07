const dotenv = require("dotenv");
dotenv.config()
const { DEV_URL, PROD_URL } = process.env
module.exports = {
  development: {
    url: DEV_URL,
    dialect: 'postgres',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  url: {
    url: PROD_URL,
    dialect: 'postgres',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
}
