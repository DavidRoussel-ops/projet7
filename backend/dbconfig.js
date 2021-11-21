const mysql = require("mysql2");
require('dotenv').config();

const nameDB = process.env.DB_NAME;
const userDB = process.env.DB_USER;
const passDB = process.env.DB_PASSWORD;

const db = mysql.createConnection({
    host: 'localhost',
    user: userDB,
    password: passDB,
    database: nameDB
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connecter à MySQL Server!');
});

module.exports = db;