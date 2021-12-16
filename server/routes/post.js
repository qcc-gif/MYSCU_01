const express = require('express')
const router = express.Router()
const dbs = require('./../db/dbs')
var multer = require("multer")


const basePath = 'public/images';

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
 * 发帖不带图片的处理
 */
router.post('/', async (req, resp) => {
    console.log('发帖')
    let { studentNumber, ppos, plabel, ptext, ptitle } = req.body
    var d = new Date()
    let time = d.getTime()
    console.log(req.body)
    let sql = `insert into post (stuNum,ppos,plabel,ptext,ptime,ptitle) values ('${studentNumber}',
        '${ppos}','${plabel}','${ptext}','${time}','${ptitle}')`
    let sqlres = await dbs.Run(sql)
    console.log(sqlres)

    resp.json({
        'success': true
    })
})


/**
 * 发帖带图片的情况
 */
// router.post('/img', upload.array('file', 3), async (req, resp) => {
//     console.log(req)
//     console.log(req.files)
//     console.log('图片数组长度', req.files.length)

//     // 第一个文件的路径
//     console.log(req.files[0].path)
//     resp.json({
//         file: req.files[0].path
//     })
// })

router.post('/img', upload.single('file'), async (req, resp) => {
    console.log(req.body)
    let { studentNumber, ppos, plabel, ptext, ptitle } = req.body
    let file = req.file
    var img = file.filename
    let realPath = 'images/' + img
    var d = new Date()
    let time = d.getTime()
    let sql = `insert into post (stuNum,ppos,plabel,ptext,ptime,pimgurl,ptitle) values ('${studentNumber}',
        '${ppos}','${plabel}','${ptext}','${time}','${realPath}','${ptitle}')`
    let sqlres = await dbs.Run(sql)
    // console.log(sqlres)
    console.log(realPath)
    // console.log(pimgurl)
    resp.json({
        'success': true
    })
})

/**
 * 
 */
router.post('/getpost', async (req, resp) => {
    console.log('map地图页:请求贴子数量')
    console.log(req.body)
    //获取总的发帖数
    let sql = ` select count(*) as num 
                    from post;`
    let totalpost = await dbs.QueryOne(sql)
    console.log('发帖总数', totalpost.num)

    // 获取当前时间
    let curtime = new Date()
    let hour = curtime.getHours()
    let minute = curtime.getMinutes()
    let second = curtime.getSeconds()

    console.log(curtime)
    let todoymidnighttime = curtime.getTime() - hour * 1000 * 60 * 60 - minute * 1000 * 60 - second * 1000
    console.log('今日十二点的时间戳', todoymidnighttime)
    sql = `select count(*) as num 
                from post 
                where ptime > ${todoymidnighttime}`
    sql1 = `drop `
    let todaypost = await dbs.QueryOne(sql)
    console.log('今日新增', todaypost.num)


    sql = ` select distinct count(*) as num,ppos
                from post 
                group by ppos 
                order by num desc;`
    let sqlres = await dbs.Query(sql)
    console.log(sqlres)
    let len = sqlres.length > 3 ? 3 : sqlres.length
    let hostpost = ['', '', '']
    for (let i = 0; i < len; i++) {
        hostpost[i] = sqlres[i].ppos
    }
    console.log('发帖数最多的三个地点', hostpost[0], hostpost[1], hostpost[2])

    resp.send({
        'totalpost': totalpost.num,
        'todaypost': todaypost.num,
        'hostpost1': hostpost[0],
        'hostpost2': hostpost[1],
        'hostpost3': hostpost[2]
    })
})



module.exports = router
