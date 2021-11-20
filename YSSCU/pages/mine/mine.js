const api = require("../../api/api")

// pages/mine/mine.js
var app = getApp();

Page({
  data: {
    postnum: 20,
    starnum: 10,
    showAction: false,
    personLabel: "个人标签",
    openid: "",
    hiddenmodalput: true,
    newLabel: "",
  },

  contactFonfirm: function(){
    this.setData({
      showAction: true
    })
  },

  logOut: function(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: function (res) {
        if (res.confirm) { //点击确定
          console.log('用户点击确定')
          wx.setStorageSync('openid', null); 
          wx.navigateTo({
            url: '/pages/login/login', //跳去登录页
          })
        } else { //点击取消
          console.log('用户点击取消')
        }
      }
    })
  },

  onCloseAct:  function(){
    this.setData({
      showAction: false
    })
  },

  onLoad: function(){
    let url = app.globalData.url + '/mine/space'
    // 请求个人标签，我的发帖数，我的收藏数
    api.post(url, {  
      "openid": app.globalData.openid,
    }).then((res) => {
       //设置个人标签，我的发帖数，我的收藏数
      this.setData({
        personLabel: res.data.personLabel, 
        postnum: res.data.postnum,
        starnum: res.data.starnum,
      })
    })
  },

  labelinput: function(event){
    // 从输入框获取个人标签
    console.log('label', event.detail)
    this.setData({
      personLabel: event.detail,
    })
    // post 个人标签
    let url = app.globalData.url + '/mine/label'
    api.post(url, {
      "openid": app.globalData.openid,
      "personLabel": this.data.personLabel, 
    }).then((res) => {
      if(res.data.success){
        this.setData({
          personLabel: personLabel
        })
      }
    })
  },

  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },

  bindcancel: function(){
    this.setData({
      bindconfirm: true
    })
  },

  confirm: function(){
    console.log('confirm')
    // post 个人标签
    let url = app.globalData.url + '/mine/label'
    api.post(url, {
      "openid": app.globalData.openid,
      "personLabel": this.data.newLabel, 
    }).then((res) => {
      if(res.data.success){
        this.setData({
          personLabel: this.data.newLabel,
          hiddenmodalput: true
        })
      }
    })
  }
})

