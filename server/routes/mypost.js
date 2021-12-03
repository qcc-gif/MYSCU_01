// var express = require('express')
// var router = express.Router()
// var dbs = require('./../db/dbs')

// /**
//  * 查看并管理我的历史发布
//  */

// router.post('/login', async (req, resp) => {
//     console.log(req.body)
//     let { account } = req.body
//     let sql = ` select * from post where account = '${account}' `
//     let sqlres = await dbs.Query(sql)
//     console.log(sqlres)
//     if (sqlres.length > 0) {
//         for (var i = 0; i < sqlres.length; i++) {
//             resp.json({
//                 'success': true,
//                 'name': sqlres[i].adminname,
//                 'img': sqlres[i].image,
//                 'title': sqlres[i].title,
//                 'position1': sqlres[i].plabel,
//                 'time': sqlres[i].ptime,
//                 'detail': sqlres[i].ptext,
//                 // 'thumbnum': 点赞
//                 // 'chatnum': 
//                 // 'sharenum':
//                 // 'starnum': 
//             }

//             )
//         } else {
//             resp.json({
//                 'success': false
//             })
//         }
//     })


// module.exports = router