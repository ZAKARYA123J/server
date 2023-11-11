const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost', // Remove "http://" from the host
    user: 'root',
    password: '',
    database: 'react_data'
});
module.exports = pool  