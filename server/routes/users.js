var express = require('express');
var router = express.Router();
var dbs = require('./../db/dbusers');

/* GET users listing. */
router.get('/register', async (req, resp, next)=> {
  let admin = {
    account: 'ysscu008',
    pwd: 'root008',
    adminname: 'admin04'
  }
  let err = await dbs.insertAdmin(admin);
  if(err){
    resp.send('already exits')
  } else {
    resp.send('success')
  }
});

router.get('/login',async (req,resp)=>{
  console.log(req.body)
  let rows = await dbs.queryByAccount('ysscu001')
  console.log(rows)
  resp.json({
    'success':true
  })
})

router.post('/login',async (req,resp)=>{
  console.log(req.body)
  let rows = await dbs.checkLogin(req.body.account,req.body.pwd)
  // console.log(rows)
  if(rows.length){
    resp.json({
      'success':true,
      'adminname': rows[0].adminname,
      'image': rows[0].image
    })
  } else {
    resp.json({
      'success': false
    })
  }
})

module.exports = router;
