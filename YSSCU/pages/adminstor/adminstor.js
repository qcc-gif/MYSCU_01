// pages/adminstor/adminstor.js
import Dialog from "./../../miniprogram/miniprogram_npm/@vant/weapp/dialog/dialog"

Page({
  data: {
    name: "",
    imgUrl: ""
  },
  onLoad: function (e) {
    console.log(e)
    this.setData({
      name: e.name,
      imgUrl: e.image
    })
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
      })
      .catch(() => {
        // on cancel
        console.log('cancel')
      });
  }
})