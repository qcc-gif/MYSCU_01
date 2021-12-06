// pages/adminstor/adminstor.js
// 管理员界面
import Dialog from "./../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog"
const app = getApp();

Page({
  data: {
    adminName: "",
    adminAvatarUrl: "",
  },

  onLoad: function (e) {
    this.setData({
      adminName: e.adminName,
      adminAvatarUrl: e.adminAvatarUrl,
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
        wx.setStorageSync('adminAccount', null)
        wx.reLaunch({
          url: '/pages/userlogin/userlogin',
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
      url: '/pages/messageNotice/messageNotice',
    })
  },

  msg: function(){
    wx.navigateTo({
      url: '/pages/adminstorPost/adminstorPost',
    })
  },

  frozen: function(){
    wx.navigateTo({
      url: '/pages/frozenAccount/frozenAccount',
    })
  },

})