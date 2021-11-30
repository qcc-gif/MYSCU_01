// pages/frozen/frozen.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
      openid: "",
    },

    onShow: function (options) {
      this.setData({
        openid: wx.getStorageInfoSync('openid'),
      })
    },

    bindGetUserInfo: function(){
      let openid = this.data.openid
      wx.navigateTo({
        url: `/pages/appeal/appeal?openid=${openid}`,
      })
    }
})