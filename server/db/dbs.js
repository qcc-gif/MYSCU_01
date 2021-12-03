var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./ysscu.db');

/**
 * @function Query DQL 执行数据库查询语句
 * @param {String} sql 
 * @returns {Array} 查询结果
 */
const Query = async (sql) => {
    return new Promise(async (resolve, reject) => {
        db.all(sql, async (err, rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

/**
 * @function QueryOne DQL 查询一条记录
 * @param {String} sql 
 * @returns {JSON} 查询结果
 */
const QueryOne = async (sql) => {
    return new Promise(async (resolve,reject) => {
        db.get(sql, async (err,result)=>{
            if(err){
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

/** 
 * @function Run  执行DDL和DML语句 如建表、删表、增加/删除行数据
 * @param {String} sql 
 */
const Run = async (sql) => {
    return new Promise(async (resolve, reject) => {
        db.run(sql, async (err) => {
            if (err) {
                reject(err)
            } else {
                resolve({ 'success': true })
            }
        })
    })
}

module.exports = {
    Query,
    Run,
    QueryOne
}