const mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
  });
  connection.connect(function (err) {
    if (!err) {
      console.log("Database is connected ... nn");
    } else {
      console.log("Error connecting database ... nn");
    }
  });

module.exports = connection;