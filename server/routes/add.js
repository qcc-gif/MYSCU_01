/**
 * 举报管理
 */
router.post('/reportMange', async (req, resp) => {
    console.log(req.body)
    let sql = `select users.stuNum as stuNum,users.simgurl as simgurl,
        users.nickname as nickname,
        plabel,ptime,ptitle,ptext,
        pimgurl,ppos,pstar,ptrans,pcom,pthumb,poc,rtype,rreason,rphone,aopinion 
        where post.stuNum=users.Num and report.stuNum=post.stuNum
        from post,users,report`
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
