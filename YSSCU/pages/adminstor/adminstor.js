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
    console.log('e', e)
    this.setData({
      adminName: e.adminName,
      adminAvatarUrl: e.adminAvatarUrl,
    })
    wx.hideLoading()
    console.log('info', e)
  },

  onShow: function () {
    wx.hideHomeButton({
    })
  },

  // 退出登录
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
        wx.showToast({
          title: '出错啦！',
          icon: 'error'
        })
        console.log('err', err)
      });
  },

  // 举报管理
  report: function(){
    wx.navigateTo({
      url: '/pages/reportManage/reportManage',
    })
  },

  // 账号申诉管理
  account: function(){
    wx.navigateTo({
      url: '/pages/accountManage/accountManage',
    })
  },

  // 发送消息通知
  syspost: function(){
    wx.navigateTo({
      url: '/pages/messageNotice/messageNotice',
    })
  },

  // 帖子管理
  msg: function(){
    wx.navigateTo({
      url: '/pages/adminstorPost/adminstorPost',
    })
  },

  // 账号冻结管理
  frozen: function(){
    wx.navigateTo({
      url: '/pages/frozenAccount/frozenAccount',
    })
  },

})