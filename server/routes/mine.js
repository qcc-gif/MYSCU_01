var express = require('express')
var router = express.Router()
var dbs = require('./../db/dbs')

/**
 * 进入个人主页，获取标签，点赞数和发帖数量
 */
router.post('/space', async (req, resp) => {
    console.log('进入个人主页')
    let { nickName, studentAvatarUrl, account } = req.body
    console.log('账号', account)
    if (account == '') {
        console.log('account为空', account == '')
        resp.json({ 'loginIn': false })
    } else {
        //保存头像
        let sql = `update users set simgurl='${studentAvatarUrl}',nickname='${nickName}' where stuNum='${account}'`
        let sqlres = await dbs.Run(sql)
        sql = ` select label from users where stuNum = '${account}' `
        sqlres = await dbs.QueryOne(sql)
        // console.log(sqlres)
        let label = sqlres.label


        sql = ` select count(*) as num from post where stuNum = '${account}' `
        sqlres = await dbs.QueryOne(sql)
        let postNum = sqlres.num

        sql = ` select count(*) as num from star where stuNum = '${account}' `
        sqlres = await dbs.QueryOne(sql)
        let starNum = sqlres.num

        console.log(`个人标签是`, label, `我的发帖数`, postNum, `我的收藏数`, starNum)
        data = {
            'success': true,
            'personLabel': label,
            'postnum': postNum,
            'starnum': starNum
        }
        resp.json(data)
    }
})

/**
 * 修改标签
 */
router.post('/label', async (req, resp) => {
    console.log('修改标签')
    let { account, personLabel } = req.body
    let sql = ` update users set label = '${personLabel}' where stuNum = '${account}' `
    let sqlres = await dbs.Run(sql)
    if (sqlres.success) {
        resp.json({ 'success': true })
    }
    else {
        resp.json({ 'success': false })
    }
})

module.exports = router
