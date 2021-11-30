// pages/login/login.js
const api = require('./../../api/api')
const app = getApp();  // 全局变量

Page({
  data: {
    studentnumber: "",
    ans: "",
    stuerrmsg: "",
    pwderrmsg: "",
    problem: [['三餐在江安X园（一个字）？', '西'],
      ['创高一学期几次（数字）？', '20'],
      ['吴玉章学院住在几舍（数字）？', '22'],
      ['教务处选课时会崩（是/否）？', '是']],
      k: Math.floor(Math.random()*0 + 3)
  },

  onLoad: function() {
      if (wx.getStorageSync('studentnumber')){  // 用户不用重复登录
        app.globalData.studentnumber = wx.getStorageSync('studentnumber');
        wx.reLaunch({
          url: '/pages/mine/mine',
        })
      }
  },

  getUserInfo:function(){
    console.log('getUserInfo')
    return new Promise((resolve,reject) => {
      wx.getUserProfile({
        desc: '用户完善个人资料', 
        success: (res) => {
          console.log('sucess', res),
          resolve(res)
        },
        fail:(err) => {
          reject(err)
        }
      })
    })
  },

  getLogin:function(){
    api.post(this.data.url + '/users/login', {
      studentnumber: this.data.studentnumber,
    }).then((res) => {
      if (res.success) {
        console.log("认证成功"),
        app.globalData.studentnumber = this.data.studentnumber
        wx.setStorageSync('studentnumber', studentnumber)
        wx.reLaunch({
          url: '/pages/mine/mine',
        });
      } else {
        console.log("认证失败")
      }
    }).catch((err) => {
      console.log("err", err)
    })
  },

  // 登录
  register: function(){
    // 校验学号和问题的答案
    // this.checkStudentNumber()
    // this.checkAns()
    
    // 用户同意后登录
    let userRes = this.getUserInfo()
    let loginRes = this.getLogin()
    console.log(userRes)
    Promise.all([userRes,loginRes]).then((res) => {
      console.log('成功', res)
    })
  },

  toAdmin: function(){
    console.log('点击了管理员登录')
    wx.reLaunch({
      url: '/pages/adminlogin/adminlogin',
    });
  },

  // 获取输入的学号
  stuno: function(event){
    this.setData({
      studentnumber: event.detail,
    })
    console.log('stuno:', this.data.studentnumber)
  },

  // 获取输入的答案
  ans: function(event){
    this.setData({
      ans: event.detail,
    })
    console.log('stuno:', this.data.ans)
  },

  // 校验学号
  checkStudentNumber: function(){
    if(!this.data.studentnumber){
      wx.showModal({
        title: '学号输入错误',
        content: '学号不能为空！',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    let reg = /^20(0|1)[0-9]{10}$/
    if(!reg.test(this.data.studentnumber)){
      wx.showModal({
        title: '学号输入错误',
        content: '请检查您的学号！',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  // 校验答案
  checkAns: function(){
    var index = this.data.k;
    var ans = this.data.problem[index][1];
    if(!ans){
      wx.showModal({
        title: '回答错误',
        content: '请填写问题的回答！',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

    if(ans!=this.data.ans){
      wx.showModal({
        title: '回答错误',
        content: '请检查您的回答！',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },  
})