const express = require('express')
const router = express.Router()
const dbs = require('../db/dbs')
var multer = require("multer")
const format = require('../utils/format')
/**
 * @function searchPost 请求所有的帖子 进行广场展示
 * 
 */
router.post('/requestPost', async (req, resp) => {
    console.log('请求所有的帖子')
    let { choice } = req.body
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
                    users.nickname as nickname,
                    plabel,ptime,ptitle,ptext,
                    pimgurl,ppos,pstar,ptrans,pcom,pthumb
                    from post,users
                    where post.stuNum = users.stuNum `
    if (choice != '全部') {
        sql += ` and  plabel='${choice}' `
    }
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
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
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
    resp.json({
        "empty": false,
        "postList": res
    })
})


/**
 * @function 输入需要
 * url
 */
router.post('/searchKey', async (req, resp) => {
    console.log(`搜索自己感兴趣的帖子`)
    let { key } = req.body
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
    users.nickname as nickname,
    plabel,ptime,ptitle,ptext,
    pimgurl,ppos,pstar,ptrans,pcom,pthumb
    from post,users
    where post.stuNum = users.stuNum `
    if (key != '') {
        sql += ` and  ptext like'%${key}%' `
    }
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
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
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
    resp.json({
        "empty": false,
        "postList": res
    })
})

module.exports = router