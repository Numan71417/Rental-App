// dbConnec.js

const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})

connection.connect((err)=>{
        if(err) {
            console.log("error ---- ",err)
            return;
        }
        console.log("mysql DB connected ✅")
    })


process.on('SIGINT', () => {
    connection.end();
    process.exit();
  });

module.exports = connection;