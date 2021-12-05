// pages/morefunc/morefunc.js
// 多功能
Page({
  data: {
    searchvalue: "",            // 搜索值
  },

  onLoad: function (options) {

  },

  // 点击“失物招领”,跳转到广场界面
  onClickLost: function(){
    let searchvalue = '失物招领'
    console.log('searchvalue', searchvalue)
    wx.reLaunch({
      url: `/pages/square/square?searchvalue=${searchvalue}`,
    })
  },

  // 点击“表白”,跳转到广场界面
  onClickConfession: function(){
    let searchvalue = '表白'
    console.log('searchvalue', searchvalue)
    wx.reLaunch({
      url: `/pages/square/square?searchvalue=${searchvalue}`,
    })
  },

})