var mysql = require('mysql');

let Sports = ['Football'];

exports.Schedule = function(req, res){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: 'sportcentrum'
      });

    let sql = "SELECT * FROM schedule WHERE Type = '" + Sports[0] + "'";

    for (let i = 1; i < Sports.length; i++) {
        sql = sql + " OR Type = '" + Sports[i] + "'";
    }

    con.query(sql, (error, results, fields) => {
        if (error) throw err;
        
        console.log(results);
        res.send(results);
        });
    con.end();
};