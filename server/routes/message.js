const express = require('express')
const router = express.Router()
const dbs = require('./../db/dbs')
var multer = require("multer")
const format = require("./../utils/format")

const basePath = 'public/images'

// 设置文件存放路径和名字保留后缀 同时生成url链接
var storge = multer.diskStorage({
    destination (req, res, cb) {
        cb(null, basePath)
    },
    filename: function (req, file, cb) {
        var fileformat = (file.originalname).split('.')
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileformat[fileformat.length - 1])
    }
})

var upload = multer({
    storage: storge
})


/**
 * @function messageNotice 给某个用户发通知
 */
router.post('/', async (req, resp) => {
    console.log('给用户发送通知')

    resp.json({
        "success": true
    })
})

/**
 * @function messageNotice 给某个用户发通知
 */
router.post('/messageNotice', async (req, resp) => {
    console.log('给用户发送通知')
    let { studentNumber, mtext, adminId } = req.body
    var d = new Date()
    let time = d.getTime()
    let sql = `select stuNum from users where stuNum='${studentNumber}' `
    let sqlres = await dbs.Query(sql)
    if (!sqlres.length) {
        console.log('查询结果为空')
        resp.json({
            success: false
        })
    }
    else {
        sql = `insert into message(stuNum,mtext,adminId,mtime) 
            values ('${studentNumber}','${mtext}','${adminId}',${time});`
        sqlres = await dbs.Run(sql)
        if (sqlres.success) {
            resp.json({
                success: true
            })
        } else {
            resp.json({
                success: false
            })
        }
    }
})


/**
 * @function msgManage 请求对和自己相关的系统消息
 */
router.post('/msgManage', async (req, resp) => {
    let { studentNumber } = req.body
    let sql = `select account,adminname,image,mtime,mtext,imgurl
                    from message,adminstor
                    where message.adminId=adminstor.account
                    and message.stuNum='${studentNumber}'
                    order by mtime desc; `
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
    // let len = sqlres.length > 200 ? 200 : sqlres.length
    for (let i = 0; i < sqlres.length; i++) {
        let tmpjson = {
            'name': sqlres[i].adminname,
            'simgurl': sqlres[i].image,
            'mtime': format.format(sqlres[i].mtime),
            'msg': sqlres[i].mtext,
            'mimgurl': sqlres[i].imgurl
        }
        res.push(tmpjson)
    }
    resp.json({
        "empty": false,
        "msgList": res
    })
})


router.post('/img', upload.single('file'), async (req, resp) => {
    console.log('处理发消息带图片的情况,管理员部分')
    console.log('req,body', req.body)
    let { studentNumber, mtext, adminId } = req.body
    let file = req.file
    let img = file.filename
    let realPath = 'images/' + img
    let dtime = new Date().getTime()
    let sql = ` select stuNum from users where stuNum='${studentNumber}'; `
    let sqlres = await dbs.QueryOne(sql)
    if (typeof (sqlres) == 'undefined') {
        resp.json({
            success: false
        })
    } else {
        sql = `insert into message(stuNum,mtext,adminId,mtime,imgurl) 
            values ('${studentNumber}','${mtext}','${adminId}',${dtime},'${realPath}')`
        sqlres = await dbs.Run(sql)
        if (sqlres.success) {
            resp.json({
                success: true
            })
        } else {
            resp.jsonn({
                success: false
            })
        }
    }
})


module.exports = router
