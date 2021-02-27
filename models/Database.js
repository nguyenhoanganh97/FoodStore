// const format = /[~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
const path = require('path')
const dotenv = require('dotenv')
const env = dotenv.config({
    path: path.resolve(__dirname, '../', '.env')
})
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = env.parsed
const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
})
module.exports = pool