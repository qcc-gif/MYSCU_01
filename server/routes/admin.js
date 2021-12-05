var express = require('express')
var router = express.Router()
var dbs = require('./../db/dbs')


/**
 * 账号登录
 */
router.post('/login', async (req, resp) => {
    console.log(req.body)
    let { account, pwd } = req.body
    let sql = ` select * from adminstor where account = '${account}' and pwd = '${pwd}' `
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    if (sqlres.length > 0) {
        resp.json({
            'success': true,
            'adminName': sqlres[0].adminname,
            'adminAvatarUrl': sqlres[0].image
        })
    } else {
        resp.json({
            'success': false
        })
    }
})




module.exports = router