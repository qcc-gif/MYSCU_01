const app = getApp();

// import Toast from "./../../miniprogram_npm/@vant/weapp/toast/toast"
// import Dialog from "./../../miniprogram_npm/@vant/weapp/dialog/dialog"
import api from "./../../api/api"


Page({
  data: {
    account: "", // 管理员账号
    password: "",
    url: "",
  },

  onLoad: function() {
    if (wx.getStorageSync('account')){
      app.globalData.account = wx.getStorageSync('account');  // 有缓存就直接登录
      wx.reLaunch({
        url: '/pages/adminstor/adminstor',
      })
    }
  },

  onShow: function () {
    wx.hideHomeButton({
    })
  },

  adminnumber: function(event){
    this.setData({
     account: event.detail,
    })
    console.log('account:', this.data.account)
  },

  pwd: function(event){
    this.setData({
      password: event.detail,
     })
     console.log('pwd:', this.data.password)
  },

  // 点击登录
  register: function () {
    let url = app.globalData.url + '/admin/login'
    console.log('url', url)
    api.post(url, {
      account: this.data.account,
      pwd: this.data.password,
    }).then((res)=>{  // 返回状态
      if(res.data.success){
        let name = res.data.name
        let img = res.data.img
        app.globalData.account = this.data.account,
        wx.setStorageSync('account', this.data.account)
        wx.reLaunch({
          url: `/pages/adminstor/adminstor?name=${name}&img=${img}`,
        })
      }else{
        wx.showModal({
          cancelColor: 'cancelColor',
        })
      }
    }).catch((err)=>{
      console.log(err)
    })
  },

})