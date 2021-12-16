var express = require('express')
var router = express.Router()
var dbs = require('./../db/dbs')
var multer = require("multer")
const format = require('../utils/format')

/**
 * 进入个人主页，获取标签，点赞数和发帖数量
 */
router.post('/space', async (req, resp) => {
    console.log('进入个人主页,返回基本信息')
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

        sql = ` select count(*) as num from com where stuNum = '${account}' `
        sqlres = await dbs.QueryOne(sql)
        let comNum = sqlres.num
        console.log(`个人标签是`, label, `我的发帖数`, postNum, `我的收藏数`, starNum, `我的评论数`, comNum)
        data = {
            'success': true,
            'personLabel': label,
            'postnum': postNum,
            'starnum': starNum,
            'commentNum': comNum
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

/**
 * 我的发帖
 */
router.post('/mypost', async (req, resp) => {
    console.log(`请求我的发布`)
    console.log(req.body)
    let { stuNum } = req.body
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
        users.nickname as nickname,
        plabel,ptime,ptitle,ptext,pid,
        pimgurl,ppos,pstar,ptrans,pcom,pthumb
        from post,users
        where post.stuNum = users.stuNum
        and users.stuNum='${stuNum}'`
    sql += ' order by ptime desc '

    let sqlres = await dbs.Query(sql)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }

    console.log(`帖子 按照发布时间排序`)
    console.log(sqlres)
    let res = []
    let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < len; i++) {
        let tmpjson = {
            'pid': sqlres[i].pid,
            'stuNum': sqlres[i].stuNum,
            'name': sqlres[i].nickname,
            'simgurl': sqlres[i].simgurl,
            'ptitle': sqlres[i].ptitle,
            'profilePhoto': sqlres[i].pimgurl,
            'position1': sqlres[i].plabel,
            'position2': sqlres[i].ppos,
            'time': format.format(sqlres[i].ptime),
            'detail': sqlres[i].ptext,
            'thumbnum': sqlres[i].pthumb,
            'chatnum': sqlres[i].pcom,
            'sharenum': sqlres[i].ptrans,
            'starnum': sqlres[i].pstar
        }
        res.push(tmpjson)
    }
    console.log(res)
    resp.json({
        "empty": false,
        "postList": res
    })

})

/**
 * 我的评论
 */
router.post('/myComment', async (req, resp) => {
    console.log(req.body)
    let { stuNum } = req.body
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
        users.nickname as nickname,
        cid,pid,ctext,ctime,cthumb,cimgurl
        from com,users
        where com.stuNum = users.stuNum
        and users.stuNum='${stuNum}'`
    sql += ' order by ctime desc '

    let sqlres = await dbs.Query(sql)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }

    console.log(`评论 按照发布时间排序`)
    console.log(sqlres)
    let res = []
    let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
            'cid': sqlres[i].cid,
            'stuNum': sqlres[i].stuNum,
            'name': sqlres[i].nickname,
            'simgurl': sqlres[i].simgurl,
            'profilePhoto': sqlres[i].cimgurl,
            'time': format.format(sqlres[i].ctime),
            'detail': sqlres[i].ctext,
            'thumbnum': sqlres[i].cthumb,
        }
        res.push(tmpjson)
    }
    resp.json({
        "empty": false,
        "commentList": res
    })

})

/**
 * 我的收藏
 */

router.post('/myCollection', async (req, resp) => {
    console.log(req.body)
    let { stuNum } = req.body
    let sql = `select users.stuNum,simgurl,nickname,
        post.stuNum as pstuNum,
        plabel,ptime,ptitle,ptext,post.pid as pid,
        pimgurl,ppos,pstar,ptrans,pcom,pthumb
        from post,users,star
        where star.pid =post.pid and post.stuNum=users.stuNum 
        and star.stuNum='${stuNum}'`
    sql += ' order by ptime desc '

    let sqlres = await dbs.Query(sql)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }

    console.log(`帖子 按照发布时间排序`)
    console.log(sqlres)
    let res = []
    let isThumb=0,isTrans=0,isStar=0,isCom=0
    let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < sqlres.length; i++) {
        let sql = `select stuNum from thumb where stuNum='${stuNum}' 
                and pid='${sqlres[i].pid}'and poc='1'`
        let sqlres1 = await dbs.Query(sql)
        isThumb = sqlres1.length

        sql = `select stuNum from trans 
            where stuNum='${stuNum}' and pid='${sqlres[i].pid}'`
        sqlres1 = await dbs.Query(sql)
        isTrans = sqlres1.length

        sql = `select stuNum from star 
            where stuNum='${stuNum}' and pid='${sqlres[i].pid}'`
        sqlres1 = await dbs.Query(sql)
        isStar = sqlres1.length
        
        sql = `select stuNum from com 
            where stuNum='${stuNum}' and pid='${sqlres[i].pid}'`
        sqlres1 = await dbs.Query(sql)
        isCom = sqlres1.length

        let tmpjson = {
            'pid': sqlres[i].pid,
            'stuNum': sqlres[i].pstuNum,
            'name': sqlres[i].nickname,
            'simgurl': sqlres[i].simgurl,
            'ptitle': sqlres[i].ptitle,
            'profilePhoto': sqlres[i].pimgurl,
            'position1': sqlres[i].plabel,
            'position2': sqlres[i].ppos,
            'time': format.format(sqlres[i].ptime),
            'detail': sqlres[i].ptext,
            'thumbnum': sqlres[i].pthumb,
            'chatnum': sqlres[i].pcom,
            'sharenum': sqlres[i].ptrans,
            'starnum': sqlres[i].pstar,
            'isThumb': isThumb,
            'isStar': isStar,
            'isTrans': isTrans,
            'isCom': isCom
        }
        res.push(tmpjson)
    }
    resp.json({
        "empty": false,
        "postList": res
    })
})


module.exports = router
