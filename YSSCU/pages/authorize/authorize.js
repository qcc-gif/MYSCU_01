const api = require("../../api/api");
const app = getApp();

// pages/authorize/authorize.js
Page({
    data: {
        openid: "",
    },

    onLoad: function (options) {
        
    },

    bindGetUserInfo: function(){
        wx.login({
            success (res) {
              if (res.code) {
                //发起网络请求
                let url = app.globalData.url + '/users/login'
                api.post(url, {code: res.code}).then((res)=>{  // 得到openid
                    console.log(res.data.openid)
                    app.globalData.openid = res.data.openids,
                    wx.setStorageSync('openid', res.data.openid) // 缓存openid
                    wx.reLaunch({  // 跳转到用户界面
                      url: '/pages/mine/mine',
                    })
                }).catch((err)=>{
                    console.log(err)
                })
              }
            }
        })
    },

    toAdmin: function(){
        wx.navigateTo({
          url: '/pages/adminlogin/adminlogin',
        })
    },
})