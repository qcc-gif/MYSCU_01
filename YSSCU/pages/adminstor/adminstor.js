// pages/adminstor/adminstor.js
// 管理员界面
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

  onShow: function () {
    wx.hideHomeButton({
    })
  },

  exitLogin: function () {
    Dialog.confirm({
      title: '提示',
      context: this,   
      message: '确认退出？',
    }).then(() => {
        console.log('confirm')
        wx.setStorageSync('openid', null)
        wx.setStorageSync('studentnumber', null)
        wx.reLaunch({
          url: '/pages/authorize/authorize',
        })
      }).catch((err) => {
        console.log('err', err)
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
  },

})