require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const DB_USER = process.env.DB_USER
const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASS
const DB_CLUSTER = process.env.DB_CLUSTER

module.exports = { MONGODB_URI, PORT, DB_USER, DB_NAME, DB_PASS, DB_CLUSTER }