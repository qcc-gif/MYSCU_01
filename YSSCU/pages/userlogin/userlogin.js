// pages/userlogin/userlogin.js
// 用户登录界面
const api = require("../../api/api");
const app = getApp();

Page({
  data: {
    studentNumber: "2019141460341",          // 川大学生学号
    password: "",               // 教务密码
    studentAvatarUrl: "",       // 微信头像
    nickName: "",               // 微信昵称
    url: "",
  },

  onLoad: function () {
    // 已注册登录过的用户
    if(wx.getStorageSync('studentNumber')){
      app.globalData.studentNumber = wx.getStorageSync('studentNumber')
      app.globalData.nickName = wx.getStorageSync('nickName')
      app.globalData.studentAvatarUrl = wx.getStorageSync('studentAvatarUrl')
      // 判断是否被封号
      let url = app.globalData.url + '/users/frozen'
      api.post(url, {
        studentNumber: app.globalData.studentNumber,
      }).then((res)=>{
        if(!res.data.frozen){  // 账号未被冻结
          wx.reLaunch({
            url: '/pages/mine/mine',
          })
        }else{  // 账号被冻结
          wx.reLaunch({
            url: '/pages/frozen/frozen',
          })
        }
      })
    }
  },

  bindGetUserInfo: function(){
    let that = this
    // 验证学号和教务处密码
    let url = app.globalData.url + '/users/login'
    console.log(app.globalData.studentNumber)
    api.post(url, {
      account: that.data.studentNumber,
      pwd: that.data.password,
    }).then((res) => {
      console.log(res)
      if(res.data.success){
        // 若账号密码正确，则获取个人信息并登录
        this.GetUserInfo().then((res) => {
          // 保存个人信息到全局变量
          app.globalData.studentAvatarUrl = res.userInfo.avatarUrl,
          app.globalData.nickName = res.userInfo.nickName,
          // 保存个人信息到缓存
          wx.setStorageSync('studentAvatarUrl', app.globalData.studentAvatarUrl)
          wx.setStorageSync('nickName', app.globalData.nickName)

          let url = app.globalData.url + '/mine/space'
          api.upload(url, app.globalData.studentAvatarUrl, {
            nickName: app.globalData.nickName,
            account: this.data.studentNumber
          }).then((res) => {
            if(res.data.success){
              wx.setStorageSync('studentNumber', that.data.studentNumber)
              app.globalData.studentNumber = that.data.studentNumber
              // 页面跳转
              console.log('reLaunch...')
              wx.reLaunch({
              url: '/pages/mine/mine',
              })
            }else{  // 失败
              wx.showToast({
                title: '登录失败！',
                icon: 'none'
                })
              }
            })

          api.post(url, {
            nickName: app.globalData.nickName,
            studentAvatarUrl: app.globalData.studentAvatarUrl,
            account: this.data.studentNumber
        }).then((res) => {
          if(res.data.success){
            wx.setStorageSync('studentNumber', that.data.studentNumber)
            app.globalData.studentNumber = that.data.studentNumber
            // 页面跳转
            console.log('reLaunch...')
            wx.reLaunch({
            url: '/pages/mine/mine',
            })
          }else{  // 失败
            wx.showToast({
              title: '登录失败！',
              icon: 'none'
              })
            }
          })
        })
      }else{
        // 登录失败，弹出提示框
        wx.showToast({
          title: '学号或密码错误！',
          icon: 'none',
        })
      }
    })
  },

  // 获取用户头像和昵称
  GetUserInfo: function(){
    return new Promise((resolve,reject) => {
      wx.getUserProfile({
        desc: '用于完善个人资料',
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  
  },

  // 获取输入的学号
  GetStuno: function(event){
    this.setData({
      studentNumber: event.detail,
    })
  },

  // 获取输入的密码
  GetPwd: function(event){
    this.setData({
      password: event.detail,
    })
  },

  // 跳转到管理员登录界面
  toAdmin: function(){
    wx.navigateTo({
      url: '/pages/adminlogin/adminlogin',
    })
  },

})



