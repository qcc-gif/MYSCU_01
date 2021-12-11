// pages/frozen/frozen.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
      studentNumber: "",       // 学号
    },

    onLoad(e){
      this.setData({
        studentNumber: e.studentNumber
      })
    },

    onShow: function (options) {

    },

   // 点击举报
   bindGetUserInfo: function(){
    wx.navigateTo({
      url: `/pages/appeal/appeal?studentNumber=${this.data.studentNumber}`,
    })
  },

})