import api from "./../../api/api"
const app = getApp();

Page({
  data: {
    account: "",    // 管理员账号
    password: "",   // 管理员密码
    url: "",        
  },

  // 管理员无需重复登录
  onLoad: function() {
    if (wx.getStorageSync('account')){
      app.globalData.account = wx.getStorageSync('account');  // 有缓存就直接登录
      let name = wx.getStorageInfoSync('name')
      let img = wx.getStorageInfoSync('img')
      wx.reLaunch({
        url:  `/pages/adminstor/adminstor?name=${name}&img=${img}`,
      })
    }
  },

  onShow: function () {
    wx.hideHomeButton({
    })
  },

  // 获取登录账号
  adminnumber: function(event){
    this.setData({
     account: event.detail,
    })
    console.log('account:', this.data.account)
  },

  // 获取密码
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
        wx.setStorageSync('name', name)
        wx.setStorageSync('img', img)
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