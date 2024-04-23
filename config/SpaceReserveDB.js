const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Nichapa3829',
    database:'vacCenter'
});

module.exports = connection;