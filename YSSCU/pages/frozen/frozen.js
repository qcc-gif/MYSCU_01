// pages/frozen/frozen.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
      openid: "",
    },

    onLoad: function (options) {
      this.setData({
        openid: app.globalData.openid,
      })
    },

    bindGetUserInfo: function(){
      let openid = this.data.openid
      wx.navigateTo({
        url: `/pages/appeal/appeal?openid=${openid}`,
      })
    }
})