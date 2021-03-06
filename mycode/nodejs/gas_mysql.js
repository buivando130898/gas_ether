var fetchUrl = require("fetch").fetchUrl;

function date_gas()
{
    let today_time = new Date();
    let gas_date_month = today_time.getUTCMonth() + 1;
    let gas_date = today_time.getUTCFullYear() + "-" + gas_date_month  + "-" + today_time.getUTCDate();
    return gas_date;

}

function time_gas()
{
    let today_time = new Date();
    let gas_time = today_time.getUTCHours() + ":" + today_time.getUTCMinutes() + ":" + today_time.getUTCSeconds();
    return gas_time;
}

function data_gas()
{

fetchUrl("https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=A3MXYC2RACK6CAKUN1J1GDFIF78F9QYKKI", function(error, meta, body){
    let call_api = body.toString();
    let obj = JSON.parse(call_api);
    //console.log(call_api );
    //console.log( obj.result.SafeGasPrice );

let mysql = require('mysql');
let con = mysql.createConnection({
  host: "172.17.0.3",
  user: "root",
  password: "ngangongao05",
  database: "update_gas"
});
    
con.connect(function(err) {
    if (err) throw err;
    console.log("y");
    let sql = `INSERT INTO gas (gas_date, gas_time, low, average, high) VALUES ("${date_gas()}", "${time_gas()}",${obj.result.SafeGasPrice},${obj.result.ProposeGasPrice},${obj.result.FastGasPrice} )`;
    //console.log(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      //console.log("1 record inserted");
      con.end();
    });
  });

});

}

setInterval(data_gas, 60000);
