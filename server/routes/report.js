const express = require('express')
const router = express.Router()
const dbs = require('./../db/dbs')

router.post('/deletePoc', async (req, resp) => {
    // isDelete 是否删除 1全删，false只是从举报列表删
    // poc 贴子或者评论 1 是贴子
    // pid 
    // 如果isDelete为true 就删除这个贴子或者评论
    // 从举报列表里面删
    let { isDelete, poc, pid, studentNumber } = req.body;
    let sql = ` delete from report where
        stuNum = ${studentNumber} 
        and poc = ${poc}
        and rid = ${pid}`;
    let sqlres = dbs.Run(sql);
    console.log('从举报列表删除');
    console.log(sql);
    console.log(isDelete)

    if (isDelete == 1) {
        if (poc == 1) {
            console.log('删除贴子')

            // post表中删除贴子
            let sql = ` delete from post where pid =  ${pid} `
            await dbs.Run(sql)
            sql = ` delete from com where pid = ${pid} `
            await dbs.Run(sql)

            sql = ` delete from trans  where pid = ${pid}`
            await dbs.Run(sql)
            sql = ` delete from thumb  where pid = ${pid}`
            await dbs.Run(sql)
            sql = ` delete from star  where pid = ${pid}`
            await dbs.Run(sql)
        } else {
            // 删除评论
            console.log('删除评论')

            let sql = ` select pid from com
            where cid = ${pid};`;
            sqlres = await dbs.QueryOne(sql);
            console.log('执行的sql和结果',sql);
            console.log(sqlres)
            if (typeof (sqlres) != 'undefined') {
                console.log(sqlres.pid)
                let ppid = Number(sqlres.pid)
                sql = `select pcom from post 
                where pid=${ppid}`
                sqlres = await dbs.QueryOne(sql)
                let pcom = Number(sqlres.pcom)
                let newCom = pcom - 1;
                sql = ` update post set pcom = ${newCom} where pid=${ppid}`
                await dbs.Run(sql)
                sql = ` delete from com where cid=${pid}`
                await dbs.Run(sql)
                console.log(sql)
            }
        }
    }
    resp.json({
        success: true
    })
})


module.exports = router
