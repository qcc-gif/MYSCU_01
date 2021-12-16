const express = require('express')
const router = express.Router()
const dbs = require('../db/dbs')
var multer = require("multer")
const format = require('../utils/format')


/**
 * @function searchPost 请求所有的帖子 进行广场展示
 */
router.post('/requestPost', async (req, resp) => {
    console.log('请求所有的帖子')
    let { choice, studentNumber } = req.body
    let sql = `select users.stuNum as stuNum,
            users.simgurl as simgurl,
            users.nickname as name,pid,
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
    // let isThumb = 0, isTrans = 0, isStar = 0, isCom = 0
    console.log(`帖子按照发布时间排序`)
    let res = []
    let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < len; i++) {
        // let sql = `select stuNum from thumb where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'and poc='1'`
        // let sqlres1 = await dbs.Query(sql)
        // isThumb = sqlres1.length

        // sql = `select stuNum from trans where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'`
        // sqlres1 = await dbs.Query(sql)
        // isTrans = sqlres1.length

        // sql = `select stuNum from star where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'`
        // sqlres1 = await dbs.Query(sql)
        // isStar = sqlres1.length

        // sql = `select stuNum from com where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'`
        // sqlres1 = await dbs.Query(sql)
        // isCom = sqlres1.length

        let tmpjson = {
            'name': sqlres[i].name,
            'pid': sqlres[i].pid,
            'simgurl': sqlres[i].simgurl,
            'ptitle': sqlres[i].ptitle,
            'plabel': sqlres[i].plabel,
            'profilePhoto': sqlres[i].pimgurl,
            'position1': sqlres[i].plabel,
            'position2': sqlres[i].ppos,
            'time': format.format(sqlres[i].ptime),
            'detail': sqlres[i].ptext,
            'thumbnum': sqlres[i].pthumb,
            'chatnum': sqlres[i].pcom,
            'sharenum': sqlres[i].ptrans,
            'starnum': sqlres[i].pstar,
            // 'isThumb': isThumb,
            // 'isStar': isStar,
            // 'isTrans': isTrans,
            // 'isCom': isCom
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
 * @function searchKey 按照关键词搜索帖子
 * 
 */
router.post('/searchKey', async (req, resp) => {
    console.log(`搜索自己感兴趣的帖子`)
    let { key, studentNumber } = req.body
    console.log(key)
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
    users.nickname as nickname,pid,
    plabel,ptime,ptitle,ptext,
    pimgurl,ppos,pstar,ptrans,pcom,pthumb
    from post,users
    where post.stuNum = users.stuNum `

    if (key != '') {
        // sql += `where instr(nvl(ptext, '')||nvl(nickname,'')||nvl(plabel,'')||nvl(ptitle,''), '${key}') > 0`
        sql += ` and( ppos like '%${key}%'  `
        sql += ` or plabel like '%${key}%' `
        sql += `or ptext like '%${key}%'`
        sql += `or ptitle like '%${key}%')`
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
    // let isThumb=0,isTrans=0,isStar=0,isCom=0
    let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < len; i++) {
        // let sql = `select stuNum from thumb 
        //     where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'and poc='1'`
        // let sqlres1 = await dbs.Query(sql)
        // isThumb = sqlres1.length

        // sql = `select stuNum from trans where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'`
        // sqlres1 = await dbs.Query(sql)
        // isTrans = sqlres1.length

        // sql = `select stuNum from star where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'`
        // sqlres1 = await dbs.Query(sql)
        // isStar = sqlres1.length

        // sql = `select stuNum from com where stuNum='${studentNumber}' and pid='${sqlres[i].pid}'`
        // sqlres1 = await dbs.Query(sql)
        // isCom = sqlres1.length

        let tmpjson = {
            'name': sqlres[i].nickname,
            'pid': sqlres[i].pid,
            'simgurl': sqlres[i].simgurl,
            'ptitle': sqlres[i].ptitle,
            'plabel': sqlres[i].plabel,
            'profilePhoto': sqlres[i].pimgurl,
            'position1': sqlres[i].plabel,
            'position2': sqlres[i].ppos,
            'time': format.format(sqlres[i].ptime),
            'detail': sqlres[i].ptext,
            'thumbnum': sqlres[i].pthumb,
            'chatnum': sqlres[i].pcom,
            'sharenum': sqlres[i].ptrans,
            'starnum': sqlres[i].pstar,
            // 'isThumb': isThumb,
            // 'isStar': isStar,
            // 'isTrans': isTrans,
            // 'isCom': isCom
        }
        res.push(tmpjson)
    }
    resp.json({
        "empty": false,
        "postList": res
    })
})

/**
 * searchPuser 搜索所有申诉的账号
 */
router.post('/searchPuser', async (req, resp) => {
    console.log(req.body)
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
                users.nickname as nickname,
                atype,aname,aphone
                from appeal,users
                where appeal.stuNum = users.stuNum`
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }
    console.log(`所有申诉`)
    console.log(sqlres)
    let res = []
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
            'studentNumber': sqlres[i].stuNum,
            'name': sqlres[i].nickname,
            'simgurl': sqlres[i].simgurl,
            'atype': sqlres[i].atype,
            'aname': sqlres[i].aname,
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
 * searchAppeal 搜索某个申诉
 */
router.post('/searchAppeal', async (req, resp) => {
    console.log(req.body)
    let { stuNum } = req.body
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
                users.nickname as nickname,
                atype,aname,aphone
                from appeal,users
                where appeal.stuNum = users.stuNum and users.stuNum='${stuNum}'`
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }
    console.log(`某个申诉的信息列表 `)
    console.log(sqlres)
    let res = []
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
            'studentNumber': sqlres[i].stuNum,
            'name': sqlres[i].nickname,
            'simgurl': sqlres[i].simgurl,
            'atype': sqlres[i].atype,
            'aname': sqlres[i].aname,
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
 * searchUser 搜索所有的用户
 */
router.post('/searchUsers', async (req, resp) => {
    console.log(req.body)
    let sql = `select users.stuNum as studentNumber,
        simgurl,nickname as name, 
        appeal.frozen as isFrozen
        from users
        left join appeal 
        on users.stuNum = appeal.stuNum`
    // let sql = `select stuNum,simgurl,nickname from users `
    let stuNum = req.body.stuNum;
    if(typeof(stuNum) != 'undefined'){
        sql += ` where users.stuNum like '%${stuNum}%'`
    }
    console.log(sql)

    let sqlres = await dbs.Query(sql)
    if (sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }
    console.log(`查询结果`)
    console.log(sqlres)
    // let res = []
    // for (let i = 0; i < sqlres.length; i++) {
    //     let tmpjson = {
    //         'name': sqlres[i].nickname,
    //         'simgurl': sqlres[i].simgurl,
    //         'studentNumber': sqlres[i].stuNum
    //     }
    //     res.push(tmpjson)
    // }
    resp.json({
        "empty": false,
        "userList": sqlres
    })
})

/**
 * searchAuser 搜索某个用户
 */
router.post('/searchAuser', async (req, resp) => {
    console.log(req.body)
    let { studentNumber } = req.body
    let sql = `select stuNum,simgurl,nickname from users where stuNum='${studentNumber}'`
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    if (typeof (sqlres) == "undefined" || sqlres.length == 0) {
        console.log('查询结果为空')
        resp.json({
            'empty': true
        })
        return
    }
    console.log(`所有用户列表`)
    console.log(sqlres)
    let res = {
        'name': sqlres[i].nickname,
        'simgurl': sqlres[i].simgurl,
        'studentNumber': sqlres[i].stuNum
    }
    resp.json({
        "empty": false,
        "accountList": res
    })
})


router.post('/allUser',async (req,resp)=>{
    console.log('所有的用户，是否冻结');
    let sql = `select users.stuNum as studentNumber,
        simgurl,nickname as name, 
        appeal.frozen as isFrozen
        from users
        left join appeal 
        on users.stuNum = appeal.stuNum `

    let sqlres = await dbs.Query(sql);
    console.log(sqlres);
    if(sqlres.length == 0){
        resp.json({
            empty: false
        })
    }
    else {
        resp.json({
            empty: false,
            accountList: sqlres
        })
    }
})


module.exports = router
