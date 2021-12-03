const express = require('express')
const router = express.Router()
const dbs = require('../db/dbs')
var multer = require("multer")




var config = require('./config.json')
appId = config.appId
appScrect = config.appScrect
/**
 * @function url 请求所有的帖子 进行广场展示
 * url
 */
router.post('/url', async (req, resp) => {
    console.log('请求所有的帖子')
    let { choice } = req.body
    if (!choice)
        let sql = `select * from post order by ptime desc`
    else
        let sql = `select * from post where plabel = '${choice}' order by ptime desc`
    let sqlres = await dbs.Query(sql)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
    }

    console.log(`帖子 按照发布时间排序`)
    console.log(sqlres)
    if (sqlres.length > 0) {
        for (var i = 0; i < sqlres.length; i++) {
            //对于每一条帖子查询其信息
            let sql1 = `select `
            resp.json({
                'success': true,
                // 'name': sqlres[i].adminname,发布者微信名字
                'img': sqlres[i].image,
                'postId': sqlres[i].pid,
                // 'profilePhoto': sqlres[i].pimgurl,
                // 'title': sqlres[i].title,
                'position1': sqlres[i].plabel,
                'position2': sqlres[i].ppos,
                'time': sqlres[i].ptime,
                'detail': sqlres[i].ptext,
                'thumbnum': sqlres[i].pstar,
                'chatnum': sqlres1[i],
                'sharenum': sqlres[i].ptrans,
                'starnum': sql1res2[i]
            }
            )
        }
    }
    else {
        resp.json({
            'success': false
        })
    }
})

/**
 * @function 输入需要
 * url
 */
router.post('/', async (req, resp) => {
    console.log(`搜索自己感兴趣的帖子`)
    let { key } = req.body
    let sql = `select * from post where plabel = '%${key}%' order by ptime desc`
    let sqlres = await dbs.Query(sql)
    if (typeof (sqlres) == "undefined") {
        console.log('查询结果为空')
    }
    for (var i = 0; i <= sqlres.length; i++) {
        let sql1 = `select count(cid) from com where pid='${sqlres[i].pid}'`
        let sqlres1 = await dbs.Query(sql1)
        let sql2 = `select count(openid)from star where pid='${sqlres[i].pid}'`
        let sql1res2 = await dbs.Query(sql2)
    }

    console.log(`搜索到的帖子 按照发布时间排序`)
    console.log(sqlres)
    if (sqlres.length > 0) {
        for (var i = 0; i < sqlres.length; i++) {
            resp.json({
                'success': true,
                'name': sqlres[i].adminname,
                'img': sqlres[i].image,
                'profilePhoto': sqlres.pimgurl,
                'title': sqlres[i].title,
                'position1': sqlres[i].plabel,
                'time': sqlres[i].ptime,
                'detail': sqlres[i].ptext,
                'thumbnum': sqlres[i].pstar,
                'chatnum': sqlres1[i],
                'sharenum': sqlres[i].ptrans,
                'starnum': sql1res2[i]
            }
            )
        }
    }
    else {
        resp.json({
            'success': false
        })
    }
})

