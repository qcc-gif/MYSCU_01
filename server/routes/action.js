const express = require('express')
const router = express.Router()
const dbs = require('../db/dbs')

// 用户 对帖子和评论 点赞 收藏  转发 
// 举报  删除 

/**
 * @function Thumb 点赞 
 * 需要点赞者的学号和被点赞的标识号和一个poc是否非帖子还是评论的bool值
 * @param {pid} 
 * @param {studentNumber} 学号
 * @param {poc} 0 是评论 1是贴子
 */
router.post('/thumb', async (req, resp) => {
    console.log(`请求点赞帖子或评论`)
    console.log(req.body)
    let { pid, studentNumber, poc } = req.body
    if (poc == 1) {
        console.log(`点赞帖子`)
        // 判断这个用户是否点赞过
        let sql = `select pid,stuNum from thumb 
            where pid='${pid}' and 
            stuNum='${studentNumber}' and poc='1' `
        let sqlres = await dbs.Query(sql)
        if (sqlres.length != 0) {
            console.log(`请求取消点赞`)
            sql = `select pthumb from post where pid ='${pid}'`
            sqlres = await dbs.QueryOne(sql)
            var oldThumb = Number(sqlres.pthumb)
            var newThumb = oldThumb - 1
            sql = `update post set pthumb='${newThumb}' where pid='${pid}';`
            sqlres = await dbs.Run(sql)
            sql = `delete from thumb where pid='${pid}'
                and stuNum='${studentNumber}' and poc='1' `
            sqlres = await dbs.Query(sql)
            resp.json({
                'isThumb': 0,
                'thumbnum': newThumb
            })
            return;
        }
        else {
            console.log("没有点赞过这个帖子")
            sql = `select pthumb from post where pid ='${pid}'`
            sqlres = await dbs.QueryOne(sql)
            console.log(sqlres)
            var oldThumb = Number(sqlres.pthumb)
            var newThumb = oldThumb + 1
            sql = `update post set pthumb='${newThumb}' where pid='${pid}'`
            sqlres = await dbs.Run(sql)
            sql = `insert into thumb(stuNum,pid) values('${studentNumber}','${pid}') `
            sqlres = await dbs.Run(sql)
            resp.json({
                'isThumb': 1,
                'thumbnum': newThumb
            })
            return
        }
    }
    else {
        console.log(`请求点赞评论`)
        // 判断这个用户是否点赞过
        let sql = `select pid,stuNum from thumb 
            where pid='${pid}' and stuNum='${studentNumber}'and poc='0';`
        let sqlres = await dbs.Query(sql)
        if (sqlres.length != 0) {
            console.log(`请求取消点赞`)
            sql = `select cthumb from com where cid ='${pid}'`
            sqlres = await dbs.QueryOne(sql)
            var oldThumb = Number(sqlres.cthumb)
            var newThumb = oldThumb - 1
            sql = `update com set cthumb='${newThumb}' where cid='${pid}'`
            sqlres = await dbs.Run(sql)
            sql = `delete from thumb  where pid='${pid}'and stuNum='${studentNumber}'and poc='0' `
            sqlres = await dbs.Query(sql)
            resp.json({
                'isThumb': 0,
                'thumbnum': newThumb
            })
            return
        }
        else {
            console.log("没有点赞过这条评论")
            let sql = `select cthumb from com where cid ='${pid}'`
            let sqlres = await dbs.QueryOne(sql)
            var oldThumb = Number(sqlres.cthumb)
            var newThumb = oldThumb + 1
            sql = `update com set cthumb='${newThumb}' where cid='${pid}'`
            sqlres = await dbs.Run(sql)
            sql = `insert into thumb(stuNum,pid,poc) 
                values ('${studentNumber}','${pid}','0'); `
            sqlres = await dbs.Run(sql)
            resp.json({
                'isThumb': 1,
                'thumbnum': newThumb
            })
            return
        }
    }
})



/**
 * @function PostStar 收藏帖子
 * 需要收藏者的学号和被收藏的帖子号
 */
router.post('/PostStar', async (req, resp) => {
    console.log(`请求收藏帖子`)
    let { pid, studentNumber } = req.body
    let sql = `select pid,stuNum from star where pid='${pid}'and stuNum='${studentNumber}'`
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    if (sqlres.length != 0) {
        console.log(`请求取消收藏这个帖子`)
        sql = `select pstar from post where pid ='${pid}'`
        sqlres = await dbs.QueryOne(sql)
        var oldStar = Number(sqlres.pstar)
        var newStar = oldStar - 1
        sql = `update post set pstar='${newStar}' where pid='${pid}'`
        sqlres = await dbs.Run(sql)
        sql = `delete from star where pid='${pid}' and stuNum='${studentNumber}' `
        sqlres = await dbs.Run(sql)
        resp.json({
            'isStar': 0,
            'starnum': newStar
        })
        return;
    }
    else {
        console.log(`没有收藏过这个帖子`)
        sql = `select pstar from post where pid ='${pid}'`
        sqlres = await dbs.QueryOne(sql)
        var oldStar = Number(sqlres.pstar)
        var newStar = oldStar + 1
        sql = `update post set pstar='${newStar}' where pid='${pid}'`
        sqlres = await dbs.Run(sql)
        sql = `insert into star(stuNum,pid) values('${studentNumber}','${pid}') `
        sqlres = await dbs.Run(sql)
        resp.json({
            'isStar': 1,
            'starnum': newStar
        })
        return;
    }

})


/**
 * @function PostTrans 转发帖子
 *需要转发者的学号和被转发的帖子号
 */
router.post('/PostTrans', async (req, resp) => {
    console.log(`请求转发帖子`)
    let { pid, studentNumber } = req.body
    sql = `select ptrans from post where pid ='${pid}'`
    sqlres = await dbs.QueryOne(sql)
    var oldTrans = Number(sqlres.ptrans)
    var newTrans = oldTrans + 1
    sql = `update post set ptrans='${newTrans}' where pid='${pid}'`
    sqlres = await dbs.Run(sql)
    sql = `insert into trans(stuNum,pid)values('${studentNumber}','${pid}') `
    sqlres = await dbs.Run(sql)
    resp.json({
        'sharenum': newTrans
    })
})

/**
 * @function PCDrop 管理员或者用户 删除帖子或者评论
 */
router.post('/PCDrop', async (req, resp) => {
    console.log(`请求删除帖子或评论`)
    console.log("请求内容", req.body)
    let { pid, poc } = req.body
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
        var sqlres = await dbs.QueryOne(sql);
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

    resp.json({
        success: true
    })
})


/**
 * @function freeze 管理员冻结账号
 */
router.post('/freeze', async (req, resp) => {
    console.log(`管理员请求冻结账号`)
    let { studentNumber } = req.body
    console.log(req.body);
    console.log(studentNumber);
    let sql = ` select count(*) as num from users where stuNum ='${studentNumber}'; `
    let sqlres = await dbs.QueryOne(sql)
    if (sqlres.num == 0) {
        resp.json({ 'success': false })
    } else {
        sql = ` select count(*) as num from appeal
                where stuNum = '${studentNumber}'`
        sqlres = await dbs.QueryOne(sql)
        console.log(sqlres)
        if (sqlres.num == 0) {
            sql = `insert into appeal(stuNum) values ('${studentNumber}');`
            sqlres = await dbs.Run(sql)
            resp.json({ 'success': true })
        } else {
            resp.json({
                'success': false,
                'isFrozen': true
            })
        }
    }
})


/**
 * @function unfreeze 管理员解冻账号
 */
router.post('/unfreeze', async (req, resp) => {
    console.log(`管理员请求解冻账号`)
    let { studentNumber } = req.body

    let sql = ` select count(*) as num from appeal where stuNum ='${studentNumber}'; `
    console.log(sql)
    let sqlres = await dbs.QueryOne(sql)
    console.log('sqlres', sqlres)
    if (sqlres.num == 0) {
        resp.json({
            success: false
        })
    } else {
        console.log('要删除')
        sql = ` delete from appeal where stuNum = '${studentNumber}' `
        console.log(sql)
        await dbs.Run(sql)
        resp.json({
            success: true
        })
    }
})

module.exports = router
