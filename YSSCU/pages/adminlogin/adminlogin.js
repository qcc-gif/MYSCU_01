const app = getApp();

// import Toast from "./../../miniprogram_npm/@vant/weapp/toast/toast"
// import Dialog from "./../../miniprogram_npm/@vant/weapp/dialog/dialog"
import api from "./../../api/api"

Page({
  data: {
    account: "", // 管理员账号
    password: "",
    url: "http://127.0.0.1:3000",
  },

  onLoad: function() {
    if (wx.getStorageSync('account')){
      app.globalData.account = wx.getStorageSync('account');
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
    api.post(this.data.url + 'admin/login', {
      account: this.data.account,
      pwd: this.data.password
    }).then((res) => {
      if (res.success) {
        console.log("验证成功")
        console.log(res)
        // let path = `name=${res.adminname}&image=${res.image}`
        app.globalData.account = this.data.account
        wx.setStorageSync('account', this.data.account);  // account的本地缓存
        wx.reLaunch({
          url: 'pages/adminstor/adminstor',
        });
      } else {
        console.log("验证失败")
      }
    }).catch((err) => {
      console.log("err", err)
    })
  },

})