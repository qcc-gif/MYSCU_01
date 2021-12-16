const express = require('express')
const router = express.Router()
const dbs = require('./../db/dbs')

/**
 * 账号申诉  信息填写提交
 */
router.post('/', async (req, resp) => {
    console.log('账号申诉,存数据库')

    let { studentNumber, atype, areason, aphone } = req.body
    console.log(req.body)
    let sql = ` select count(*) as num from appeal
            where stuNum ='${studentNumber}'; `
    let sqlres = await dbs.QueryOne(sql)
    if (sqlres.num == 0) {
        sql = ` insert into appeal(stuNum,atype,areason,aphone) values
            ('${studentNumber}','${atype}','${areason}','${aphone}'); `

    } else {
        sql = ` update appeal set atype='${atype}',
            areason='${areason}',aphone='${aphone}' where stuNum = '${studentNumber}' `
    }
    sqlres = await dbs.Run(sql)
    console.log(sqlres.success)
    if (sqlres.success) {
        resp.send({
            'success': true
        })
    }
})

module.exports = router

