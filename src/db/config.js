const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const {MONGO_DB} = process.env
const url = MONGO_DB

mongoose
.connect(url)
module.exports = mongoose;