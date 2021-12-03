// pages/frozen/frozen.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
      studentNumber: "",       // 学号
    },

    onShow: function (options) {

    },

   // 点击举报
   bindGetUserInfo: function(){
    let studentNumber = app.globalData.studentNumber
    wx.navigateTo({
      url: `/pages/appeal/appeal?openid=${studentNumber}`,
    })
  },

})