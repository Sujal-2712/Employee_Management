const mysql=require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});


function queryDatabase(query,values) {
    return new Promise((resolve, reject) => {
      con.connect(function (err) {
          if(err) reject(err);  
          con.query(query,values,(err,result)=>{
              if(err) reject(err);
  
              resolve(result);
          })
      })
    })
  }


module.exports={queryDatabase};
