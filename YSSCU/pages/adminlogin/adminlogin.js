import api from "./../../api/api"
const app = getApp();

Page({
  data: {
    adminAccount: "", // 管理员账号
    password: "", // 管理员密码
    url: "",
  },

  // 管理员无需重复登录
  onLoad: function () {
    // 有缓存就直接登录
    if (wx.getStorageSync('adminAccount')) {
      app.globalData.account = wx.getStorageSync('adminAccount');
      var adminName = wx.getStorageInfoSync('adminName')
      var adminAvatarUrl = wx.getStorageInfoSync('adminAvatarUrl')
      wx.reLaunch({
        url: `/pages/adminstor/adminstor?name=${adminName}&img=${adminAvatarUrl}`,
      })
    }
  },

  onShow: function () {
    wx.hideHomeButton({})
  },

  // 获取登录账号
  adminnumber: function (event) {
    this.setData({
      adminAccount: event.detail,
    })
    console.log('account:', this.data.adminAccount)
  },

  // 获取密码
  pwd: function (event) {
    this.setData({
      password: event.detail,
    })
    console.log('pwd:', this.data.password)
  },

  // 点击登录
  register: function () {
    let url = app.globalData.url + '/admin/login'
    api.post(url, {
      account: this.data.adminAccount,
      pwd: this.data.password,
    }).then((res) => { // 返回状态
      if (res.data.success) {
        app.globalData.adminAccount = this.data.adminAccount,
          wx.setStorageSync('adminAccount', this.data.adminAccount)
        wx.setStorageSync('adminName', res.data.adminName)
        wx.setStorageSync('adminAvatarUrl', res.data.adminAvatarUrl)
        wx.reLaunch({
          url: `/pages/adminstor/adminstor?adminName=${res.data.adminName}&adminAvatarUrl=${res.data.adminAvatarUrl}`,
        })
      } else {
        wx.showToast({
          title: '账号或密码错误！',
          icon: 'error',
        })
      }
    }).catch((err) => {
      wx.showToast({
        title: '出错啦！',
        icon: 'error'
      })
      console.log(err)
    })
  },

})