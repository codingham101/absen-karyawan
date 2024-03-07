const sql = require('mysql')

const db = sql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "employee"
})

module.exports = db;