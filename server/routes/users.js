const express = require('express')
const router = express.Router()
const dbs = require('./../db/dbs')
const md5 = require('./../utils/md5')
const api = require('./../api/api')

var config = require('./config.json')
appId = config.appId
appScrect = config.appScrect

/**
 * @function check 用户code到微信后台换取openid,进行验证
 * userlogin用户登录页
 */
// router.post('/check', async (req, resp) => {
// 	console.log('用户code到微信后台换取openid,进行验证')
// 	console.log('用户的Code', req.body.code)
// 	let appurl = 'https://api.weixin.qq.com/sns/jscode2session'
// 	let url = `${appurl}?appid=${appId}&secret=${appScrect}&js_code=${req.body.code}&grant_type=authorization_code`
// 	let appres = await api.Get(url)
// 	let openid = JSON.parse(appres.body).openid
// 	console.log('openid', openid)
// 	let sql = `select stuNum from users where openid = '${openid}'`
// 	let sqlres = await dbs.QueryOne(sql)
// 	if (typeof (sqlres) == "undefined") {
// 		console.log('查询结果为空')
// 	}
// 	console.log(sqlres)

// 	resp.json({ 'openid': openid })
// })

/**
 * @function login 首次登录，需要用学号和密码到教务处进行验证
 */
router.post('/login', async (req, resp) => {
	console.log(`账号密码接收成功`)
	let { account, pwd } = req.body
	let jwcurl = 'http://47.108.67.131/timetable_api/v1/timetables'
	let url = jwcurl + '?account=' + account + '&password=' + md5.hex_md5(pwd)

	let jwcres = await api.Get(url)
	// console.log(jwcres.body)
	console.log('账号密码检验返回状态码', jwcres.response.statusCode)
	if (jwcres.response.statusCode == 200) {
		let sql = `select stuNum from users where stuNum = '${account}'`
		let sqlres = await dbs.QueryOne(sql)
		console.log('数据库查询结果', sqlres)
		if (typeof (sqlres) == "undefined") {
			sql = `insert into users(stuNum) values ('${account}')`
			await dbs.Run(sql)
		}
		resp.json({
			'success': true
		})
	}
	else {
		resp.json({
			'success': false
		})
	}
})

/**
 * @function 判断是否被封号
 */
router.post('/frozen', async (req, resp) => {
	console.log('判断是否被封号')
	let { studentNumber } = req.body
	console.log('studentNumber',studentNumber);
	let sql = ` select * from appeal where stuNum = '${studentNumber}'`
	let sqlres = await dbs.QueryOne(sql)
	console.log('appeal表中查询结果', sqlres)
	if (typeof (sqlres) == "undefined") {
		resp.json({ 'isfrozen': false })
	} else {
		resp.json({ 'isfrozen': true })
	}
})

/**
 * @function report 举报帖子或评论
 */
router.post('/report', async (req, resp) => {
	console.log('举报')
	console.log(req.body)
	let { studentNumber, pid, poc, rtype } = req.body
	let sql = `select count(*) as num from report where
			stuNum = '${studentNumber}'and rid ='${pid}' and poc = '${poc}'; `
	let sqlres = await dbs.QueryOne(sql)
	if (sqlres.num) {
		resp.json({
			'success': false
		})
		return
	}
	sql = `insert into report(stuNum,rid,poc,rtype) values('${studentNumber}','${pid}','${poc}','${rtype}'); `
	sqlres = await dbs.Run(sql)
	console.log(sqlres.success)
	if (sqlres.success) {
		resp.json({
			'success': true
		})
	} else {
		resp.json({
			'success': false
		})
	}
})




module.exports = router
