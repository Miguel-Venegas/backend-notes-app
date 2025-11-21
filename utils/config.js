require('dotenv').config()

const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASS
const DB_CLUSTER = process.env.DB_CLUSTER
const DB_SECRET = process.env.SECRET

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = { MONGODB_URI, PORT, DB_USER, DB_NAME, DB_PASS, DB_CLUSTER, DB_SECRET }