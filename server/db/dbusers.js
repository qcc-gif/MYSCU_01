var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./ysscu.db');

const queryByAccount = async (account) => {
    return new Promise(async (resolve, reject) => {
        let sql = `select * from adminstor where account = '${account}'`
        db.all(sql, function (err, rows) {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

const insertAdmin = async (admin) => {
    return new Promise(async (resolve, reject) => {
        let account = admin.account;
        let pwd = admin.pwd;
        let sql = `insert into adminstor (account,pwd) values ('${account}','${pwd}')`;
        db.run(sql,(err)=>{
            resolve(err)
        })
    })
}

const checkLogin = async (account,pwd) => {
    return new Promise(async (resolve,reject) => {
        let sql = `select * from adminstor where account = '${account}' and pwd='${pwd}'`
        // console.log(sql)
        db.all(sql,(err,rows)=>{
            if(err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = {
    queryByAccount,
    insertAdmin,
    checkLogin
}