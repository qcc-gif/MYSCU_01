const { runSQL, queryPromise } = require('./tableAdmins');
const fs = require('fs')

const dropTable = async () => {
    const err = await runSQL('drop table if exists adminstor')
    console.log(err)
}

const createTabel = async () => {
    var sql = fs.readFileSync('./sqls/tablesAdminstor.sql', 'utf-8');
    console.log(sql);
    const err = await runSQL(sql);
    console.log(err);
}

const insert = async (admin) => {
    var account = admin.account;
    var pwd = admin.pwd;
    var adminname = admin.adminname;
    var sql = `insert into adminstor (account,pwd,adminname) values ('${account}','${pwd}','${adminname}')`;
    console.log(sql);
    const err = await runSQL(sql);
    console.log(err)
}

const selectByAccount = async (account) => {
    var sql =  `select * from adminstor where account='${account}'`
    console.log(sql)
    const rows = await queryPromise(sql)
    console.log(rows)
}

// dropTable();
// createTabel();

// insert();

admin = {
    account: 'ysscu002',
    pwd: 'root',
    adminname: 'admin02'
}

// insert(admin)
// selectByAccount('002')

// module.exports =  {
//     dropTable,
//     createTabel,
//     insert,
//     selectByAccount
// }
selectByAccount('ysscu002')