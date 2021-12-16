const express = require('express')
const router = express.Router()
const dbs = require('../db/dbs')
const format = require('../utils/format')


/**
 * @function userFullText 帖子详情
 */
router.post('/userFullText', async (req, resp) => {
    console.log('请求这一条帖子详情全文和所有评论')
    console.log(req.body)
    let { pid, studentNumber } = req.body
    let sql = `select users.stuNum as stuNum,simgurl,nickname,
                    pid,plabel,ptime,ptitle,ptext,post.stuNum as pstuNum,
                    pimgurl,ppos,pstar,ptrans,pcom,pthumb
                    from post,users
                    where post.stuNum = users.stuNum and pid='${pid}' 
                    order by ptime desc; `

    let sqlres = await dbs.Query(sql)
    console.log('帖子数据库查询结果', sqlres)
    let sql1 = `select users.stuNum as stuNum,simgurl,nickname,
                    cid,pid,ctext,ctime,cthumb,cimgurl
                    from com,users
                    where com.stuNum = users.stuNum
                    and com.pid='${pid}' 
                    order by ctime,cthumb desc; `
    let sqlres1 = await dbs.Query(sql1)
    console.log('评论数据库查询结果', sqlres1)

    let sql2 = `select count(stuNum) as num 
                from thumb where stuNum='${studentNumber}' 
                and pid='${pid}'and poc='1'`
    let sqlres2 = await dbs.QueryOne(sql2)

    // queryOne 返回的是 {}
    // query 返回的是 [{},{}]
    // console.log(`sqlres2:`, sqlres2)
    // console.log(`sqlres2.num:`, sqlres2.num)
    let isThumb;
    if (sqlres2.num) {
        isThumb = Number(sqlres2.num)
    }
    else {
        isThumb = 0
    }
    sql2 = `select count(stuNum) as num 
                from trans 
                where stuNum='${studentNumber}' 
                and pid='${pid}'`
    sqlres2 = await dbs.QueryOne(sql2)
    let isTrans;
    if (sqlres2.num) {
        isTrans = Number(sqlres2.num)
    }
    else {
        isTrans = 0
    }
    sql2 = `select count(stuNum) as num from star where stuNum='${studentNumber}' and pid='${pid}'`
    sqlres2 = await dbs.QueryOne(sql2)
    let isStar;
    if (sqlres2.num) {
        isStar = Number(sqlres2.num)
    }
    else {
        isStar = 0
    }
    sql2 = `select count(stuNum) as num from com where stuNum='${studentNumber}' and pid='${pid}'`
    sqlres2 = await dbs.QueryOne(sql2)
    let isCom;
    if (sqlres2.num)
        isCom = Number(sqlres2.num)
    else {
        isCom = 0
    }
    let postList = []
    if (sqlres.length) {
        let tmpjson = {
            'pid': sqlres[0].pid,
            'stuNum': sqlres[0].stuNum,
            'name': sqlres[0].nickname,
            'simgurl': sqlres[0].simgurl,
            'ptitle': sqlres[0].ptitle,
            'profilePhoto': sqlres[0].pimgurl,
            'position1': sqlres[0].plabel,
            'position2': sqlres[0].ppos,
            'time': format.format(sqlres[0].ptime),
            'detail': sqlres[0].ptext,
            'thumbnum': sqlres[0].pthumb,
            'chatnum': sqlres[0].pcom,
            'sharenum': sqlres[0].ptrans,
            'starnum': sqlres[0].pstar,
            'isThumb': isThumb,
            'isStar': isStar,
            'isTrans': isTrans,
            'isCom': isCom
        }
        postList.push(tmpjson)
    }


    console.log('postList', postList)
    if (sqlres1.length == 0) {
        console.log('查询评论结果为空')
        resp.json({
            'empty': true,
            "postList": postList
        })
        return
    }
    let commentList = []
    for (let i = 0; i < sqlres1.length; i++) {
        let sql3 = `select count(stuNum) as num from thumb 
            where stuNum='${studentNumber}' 
            and pid='${sqlres1[i].cid}' and poc='0'`
        let sqlres3 = await dbs.QueryOne(sql3)
        let isThumb = Number(sqlres3.num)
        let tmpjson = {
            'cid': sqlres1[i].cid,
            'name': sqlres1[i].nickname,
            'simgurl': sqlres1[i].simgurl,
            'profilePhoto': sqlres1[i].cimgurl,
            'time': format.format(sqlres1[i].ctime),
            'detail': sqlres1[i].ctext,
            'thumbnum': sqlres1[i].cthumb,
            'isThumb': isThumb
        }
        commentList.push(tmpjson)
    }
    console.log('commentList', commentList)

    resp.json({
        "empty": false,
        "postList": postList,
        "commentList": commentList
    })
})

module.exports = router
