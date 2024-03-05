const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST  || 'localhost',
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'custom_list',
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0
});

con.connect((err) => {
    if(err){
        console.error('Error connecting to database:', err);
    } else {
        console.log("Connection successful");
    }
});


module.exports = { con }