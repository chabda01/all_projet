const mysql = require('mysql2');

const connection = mysql.createPool({
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD
});

connection.getConnection(function(error, conn) {
    if (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
    console.log('connected to the database MYSQL.');
    conn.release();
});

module.exports = connection;
