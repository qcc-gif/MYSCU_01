var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./../ysscu.db');


// 执行SQL语句
const runSQL = async (sql) => {
    return new Promise(async (resolve,reject) => {
        db.run(sql, (err) => {
            reject(err)
        })
    })
}

// 查询
const queryPromise = async (sql) => {
    return new Promise(async (resolve,reject) => {
        db.all(sql,function(err,rows){
            if(err){
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports =  {
    runSQL,
    queryPromise
}