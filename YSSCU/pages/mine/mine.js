const api = require("../../api/api")

// pages/mine/mine.js
var app = getApp();

Page({
  data: {
    postnum: 20,                // 发帖数
    starnum: 10,                // 收藏数
    commentnum: 10,             // 评论数
    showAction: false,
    personLabel: "这个人很懒~",  // 个人标签
    studentNumber: "",          // 学号
    hiddenmodalput: true,
    newLabel: "",
  },

  contactFonfirm: function(){
    this.setData({
      showAction: true
    })
  },

  // 退出登录
  logOut: function(){
    wx.showModal({
      title: '提示',
      content: '您确定要退出登录吗',
      success: function (res) {
        if (res.confirm) { //点击确定
          console.log('用户点击确定')
          wx.setStorageSync('studentNumber', null); 
          wx.reLaunch({
            url: '/pages/userlogin/userlogin', //跳去登录页
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

  onShow: function(){
    let url = app.globalData.url + '/mine/space'
    // 请求个人标签，我的发帖数，我的收藏数
    api.post(url, {  
        nickName: app.globalData.nickName,
        studentAvatarUrl: app.globalData.studentAvatarUrl,
        account: app.globalData.studentNumber,
    }).then((res) => {
       //设置个人标签，我的发帖数，我的收藏数，我的评论数
      this.setData({
        personLabel: res.data.personLabel, 
        postnum: res.data.postnum,
        starnum: res.data.starnum,
        commentnum: res.data.commentnum,
      })
    })
  },

  // 修改个人标签
  labelinput: function(event){
    console.log('label', event.detail)
    this.setData({
      personLabel: event.detail,
    })
    let url = app.globalData.url + '/mine/label'
    api.post(url, {
      "account": app.globalData.studentNumber,
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

  // 取消修改个人标签
  bindcancel: function(){
    this.setData({
      bindconfirm: true
    })
  },

  // 确认修改个人标签
  confirm: function(){
    console.log('confirm')
    // post 个人标签
    let url = app.globalData.url + '/mine/label'
    api.post(url, {
      "account": app.globalData.studentNumber,
      "personLabel": this.data.newLabel, 
    }).then((res) => {
      if(res.data.success){
        this.setData({
          personLabel: this.data.newLabel,
          hiddenmodalput: true
        })
      }
    })
  },

  // 我的发帖
  onClickPost: function(){
    wx.navigateTo({
      url: '/pages/mypost/mypost',
    })
  },
  
  // 我的收藏
  onClickCollection: function(){
    wx.navigateTo({
      url: '/pages/myCollection/myCollection',
    })
  },

  // 我的评论
  onClickComment: function(){
    wx.navigateTo({
      url: '/pages/myComment/myComment',
    })
  }

})

