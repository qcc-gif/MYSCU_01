// pages/adminstor/adminstor.js
import Dialog from "./../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog"
const app=getApp();

Page({
  data: {
    name: "",
    img: "",
  },
  onLoad: function (e) {
    this.setData({
      name: e.name,
      img: e.img,
    })
    console.log('info', e)
  },
  // 由上一级跳转后，隐藏返回
  onShow: function () {
    wx.hideHomeButton({
    })
  },
  exitLogin: function () {
    Dialog.confirm({
      title: '提示',
      context: this,   // 增加this可用
      message: '确认退出？',
    })
      .then(() => {
        // on confirm
        console.log('confirm')
        app.globalData.account = null
        wx.reLaunch({
          url: '/pages/authorize/authorize',
        })
      })
      .catch(() => {
        // on cancel
        console.log('cancel')
      });
  },

  report: function(){
    wx.navigateTo({
      url: '/pages/reportManage/reportManage',
    })
  },

  account: function(){
    wx.navigateTo({
      url: '/pages/accountManage/accountManage',
    })
  },

  syspost: function(){
    wx.navigateTo({
      url: '/pages/systempost/systempost',
    })
  },

  msg: function(){
    wx.navigateTo({
      url: '/pages/msgManage/msgManage',
    })
  }
})