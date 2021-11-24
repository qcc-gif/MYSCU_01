// pages/morefunc/morefunc.js

Page({
  data: {
    searchvalue: "",
  },

  onLoad: function (options) {

  },

  onClickLost: function(){
    let searchvalue = '失物招领'
    wx.reLaunch({
      url: `/pages/square/square?searchvalue=${searchvalue}`,
    })
  },

  onClickConfession: function(){
    let searchvalue = '表白'
    wx.reLaunch({
      url: `/pages/square/square?searchvalue=${searchvalue}`,
    })
  },

})