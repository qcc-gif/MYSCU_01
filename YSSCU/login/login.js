// pages/login/login.js
const api = require('./../../api/api')
const app = getApp();

Page({
  data: {
    studentnumber: "",
    pwd: "",
    stuerrmsg: "",
    pwderrmsg: "",
  },
  loginIn: async() => {
    // console.log(this.data.studentnumber, this.data.pwd)
    // wx.switchTab({
    //   url: './../mine/mine',
    // })
    let res = await api.post('http://zhjw.scu.edu.cn/j_spring_security_check',{
      'j_username':'201914146032',
      'j_password':'0a06dc7fa59dc8d1038d98839019ea31',
    })
    console.log(res)
  },
  onLoad: async () => {
    // let res = await app.getopenid()
    // console.log(res)
    let res = await api.get('http://zhjw.scu.edu.cn/img/captcha.jpg?4')
    console.log(res)
  }
})