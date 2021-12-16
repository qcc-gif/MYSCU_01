const express = require('express');
const router = express.Router();
const dbs = require('./../db/dbs');
var multer = require("multer")

/**
 * @function login 账号登录
 */
router.post('/login', async (req, resp) => {
    console.log(req.body);
    let { account, pwd } = req.body;
    let sql = ` select * from adminstor 
        where account = '${account}' 
        and pwd = '${pwd}' ;`;
    let sqlres = await dbs.Query(sql);
    console.log('数据库查询结果', sqlres);
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

/**
 * @function accountManage  申诉管理 返回所有申诉者列表
 */
router.post('/accountManage', async (req, resp) => {
    console.log(req.body)
    console.log(`请求所有申诉者列表`)
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
                users.nickname as nickname,
                atype,areason,aphone
                from appeal,users
                where appeal.stuNum = users.stuNum `
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }
    console.log(sqlres)
    let res = []
    // let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
            'name': sqlres[i].nickname,
            "studentNumber": sqlres[i].stuNum,
            'profilePhoto': sqlres[i].simgurl,
            'atype': sqlres[i].atype,
            'areason': sqlres[i].areason,
            'aphone': sqlres[i].aphone
        }
        res.push(tmpjson)
    }
    resp.json({
        "empty": false,
        "complaintList": res
    })
})


/**
 * @function frozenList 冻结账号列表
 */
router.post('/frozenList', async (req, resp) => {
    console.log(req.body)
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
                users.nickname as nickname,
                from users,appeal
                where appear.stuNum=users.stuNum`
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }
    console.log(`所有被冻结的账号`)
    console.log(sqlres)
    let res = []
    // let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
            'name': sqlres[i].nickname,
            'simgurl': sqlres[i].simgurl,
            'studentNumber': sqlres[i].stuNum
        }
        res.push(tmpjson)
    }
    resp.json({
        "empty": false,
        "accountList": res
    })
})


/**
 * @function reportManage 举报管理帖子和评论 返回所有被举报的帖子和评论
 */
router.post('/reportManage', async (req, resp) => {
    console.log(req.body)
    // 先查贴子
    let sql = `select users.stuNum as studentNumber,
                users.simgurl as profilePhoto,
                users.nickname as name,post.pid as pid,
                ptext,pimgurl ,ptitle,ptime,plabel,ppos,
                rtype 
                from users,report,post
                where report.poc=1 
                and report.rid=post.pid
                and post.stuNum = users.stuNum
                 `
    let postres = await dbs.Query(sql);
    if (postres.length == 0) {
        console.log('被举报的贴子为空')
    }
    // 查询被举报的评论
    sql = `select users.stuNum as studentNumber,
        users.simgurl as profilePhoto,
        users.nickname as name,
        com.cid as cid,
        ctext,cimgurl,ctime,rtype
        from users,report,com
        where report.poc=0
        and report.rid=com.cid
        and com.stuNum = users.stuNum `
    let comres = await dbs.Query(sql)
    if (comres.length == 0) {
        console.log('被举报的评论为空')
    }
    console.log('评论列表',comres);

    // let len = sqlres.length > 200 ? 200 : sqlres.length
    resp.json({
        "empty": false,
        postList: postres,
        comList: comres
    })
})


/**
 *  管理员删除帖子 会把下面的评论一起全部删除
 */
router.post('/deletePost', async (req, resp) => {
    console.log('删除帖子')
    let { pid } = req.body
    let sql = ` select count(*) from post where pid ='${pid}'; `
    let sqlres = await dbs.QueryOne(sql)
    if (sqlres.num == 0) {
        resp.json({ 'success': false })
        return
    }
    sql = `select count(*) from com where pid='${pid}';`
    sqlres = await dbs.QueryOne(sql)
    if (sqlres.num) {
        sql = `delete from com where pid='${pid}' `
    }
    sql = ` delete from post where pid='${pid}'; `
    sqlres = await dbs.Run(sql)
    console.log(sqlres.success)
    if (sqlres.success) {
        resp.json({ 'success': true })
    } else {
        resp.json({ 'success': false })
    }
})

/**
 *  管理员 删除评论
 */



module.exports = router