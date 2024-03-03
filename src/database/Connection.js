const mysql = require('mysql');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'custom_list'
});

con.connect((err) => {
    if(err){
        console.error('Error connecting to database:', err);
    } else {
        console.log("Connection successful");
    }
});


module.exports = { con }