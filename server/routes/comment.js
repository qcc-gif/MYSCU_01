const express = require('express')
const router = express.Router()
const dbs = require('./../db/dbs')
var multer = require("multer")


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

// var upload = multer({ dest: '../uploads/', inMemory: true, includeEmptyFields: true })
/**
 * 评论不带图片的处理
 */
router.post('/addComment', async (req, resp) => {
    console.log('添加评论')
    console.log(req.body)
    let { studentNumber, postId, ptext } = req.body
    var d = new Date()
    let time = d.getTime()
    let sql = `insert into com (stuNum,ctime,ctext,pid) values ('${studentNumber}',
        '${time}','${ptext}','${postId}')`
    let sqlres = await dbs.Run(sql)
    console.log(sqlres)
    sql = `select pcom from post where pid ='${postId}'`
    sqlres = await dbs.QueryOne(sql)
    var oldCom = Number(sqlres.pcom)
    var newCom = oldCom + 1
    sql = `update post set pcom='${newCom}' where pid='${postId}'`
    sqlres = await dbs.Run(sql)

    resp.json({
        'success': true
    })
})


/**
 * 添加评论带图片的情况
 */
router.post('/img', upload.single('file'), async (req, resp) => {
    console.log(req.body)
    let { studentNumber, postId, ptext } = req.body
    let file = req.file
    var imge = file.filename
    let realPath = 'images/' + imge
    var d = new Date()
    let time = d.getTime()
    let sql = `insert into com(stuNum,ctime,ctext,pid,cimgurl) values ('${studentNumber}',
        '${time}','${ptext}','${postId}','${realPath}')`
    let sqlres = await dbs.Run(sql)
    console.log(realPath)
    sql = `select pcom from post where pid ='${postId}'`
    sqlres = await dbs.QueryOne(sql)
    var oldCom = Number(sqlres.pcom)
    var newCom = oldCom + 1
    sql = `update post set pcom='${newCom}' where pid='${postId}'`
    sqlres = await dbs.Run(sql)

    resp.send({
        'success': true
    })
})


module.exports = router
