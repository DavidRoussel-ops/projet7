const mysql = require("mysql2");
require('dotenv').config();

const userDB = process.env.USER_ENV;
const passDB = process.env.PASSWORD_ENV;

const db = mysql.createConnection({
    host : 'localhost',
    user : userDB,
    password : passDB,
    database : 'groupomanie'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecter à MySQL Server!');
});

module.exports = db;