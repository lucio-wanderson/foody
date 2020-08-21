const {Pool} = require('pg')

module.exports = new Pool({
    user: "postgres",
    password: "lulu",
    host: "localhost",
    port: 5432,
    database: "foodfy"
})