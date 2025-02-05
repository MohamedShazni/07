const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_mysql_password', // replace with your MySQL root password
    database: 'ticket_system' // the name of the database you created
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = connection;
