// pages/userlogin/userlogin.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
        openid: "",
        studentnumber: "",
        password: "",
        avatarUrl: "", 
        nickName: "",
        url: "",
    },

    onLoad: function () {
      console.log(app.globalData.openid)
      // 已注册登录过的用户
      if(wx.getStorageSync('studentnumber')){
        app.globalData.openid = wx.getStorageSync('openid')
        app.globalData.studentnumber = wx.getStorageSync('studentnumber')
        // 判断是否被封号
        let url = app.globalData.url + '/users/frozen'
        api.post(url, {
          openid: app.globalData.openid,
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
      // 获取昵称和头像
      wx.getUserProfile({
        desc: '用于完善个人资料',
        success: (res) => {
          app.globalData.avatarUrl = res.userInfo.avatarUrl,
          app.globalData.nickName = res.userInfo.nickName,
          console.log('success:', res.userInfo.avatarUrl, res.userInfo.nickName)
        }
      })
      // 登录
      wx.login({
        success(res){
          // 请求并获取openid
          let url = app.globalData.url + '/users/check'
          api.post(url,{code: res.code}).then((res)=>{
            console.log('openid', res.data.openid)
            app.globalData.openid = res.data.openid,
            wx.setStorageSync('openid', res.data.openid)
            // 输入账号和密码登录教务处
            let url = app.globalData.url + '/users/login'
            console.log(app.globalData.openid)
            api.post(url,{
              openid: app.globalData.openid,
              account: that.data.studentnumber,
              pwd: that.data.password,
              nickName: app.globalData.nickName,
              avatarUrl: app.globalData.avatarUrl
            }).then((res)=>{
              console.log(res)
              // 登录成功，跳转到个人界面
              if(res.data.success){
                wx.setStorageSync('studentnumber', that.data.studentnumber)
                app.globalData.studentnumber = that.data.studentnumber
                console.log('reLaunch...')
                wx.reLaunch({
                  url: '/pages/mine/mine',
                })
              }else{ // 登陆失败，弹出提示框
                wx.showToast({
                  title: '学号或密码错误！',
                  icon: 'none',
                })
              }
            }).catch((err)=>{
              console.log('err', err)
            })
          })
        }
      })
    },

  // 获取输入的学号
  GetStuno: function(event){
    this.setData({
      studentnumber: event.detail,
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

