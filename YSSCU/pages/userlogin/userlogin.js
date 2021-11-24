// pages/userlogin/userlogin.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
        openid: "",
        studentnumber: "",
        password: "",
        url: "",
    },

    onLoad: function () {
      // 已登录过用户不用再次登录
      if(wx.getStorageSync('openid')){
        app.globalData.openid = wx.getStorageSync('openid')
        // 判断是否被封号
        let url = app.globalData.url + '/users/?'
        api.post(url, {
          openid: app.globalData.openid,
        }).then((res)=>{
          if(res.success){  // 账号未被冻结
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
      this.GetStuno();
      this.GetPwd();
      wx.login({
        success(res){
          // 请求并获取openid
          let url = app.globalData.url + '/users/login'
          api.post(url,{code: res.code}).then((res)=>{
            console.log('openid', res.data.openid)
            app.globalData.openid = res.data.openid,
            wx.setStorageSync('openid', res.data.openid)
            // 输入账号和密码登录教务处
            let url = app.globalData.url + '/users/login?'
            api.post(url,{
              studentnumber: this.data.studentnumber,
              password: this.data.password,
            }).then((res)=>{
              // 登陆成功
              wx.setStorageSync('studentnumber', studentnumber)
              app.globalData.studentnumber = this.data.studentnumber
              // 跳转到个人界面
              if(res.data.status =='200'){
                wx.navigateTo({
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
    console.log('pwd:', this.data.password)
  },

  // 跳转到管理员登录界面
  toAdmin: function(){
    wx.navigateTo({
      url: '/pages/adminlogin/adminlogin',
    })
  },

})

