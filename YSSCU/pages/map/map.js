// pages/map/map.js
const api = require("../../api/api")
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allPostNum: 20,
    addPostNum: 20,
    location:'图书馆',
    distance:200,
    hotSpot1:'综合楼',
    hotSpot2:'图书馆',
    longitude:104.0002,
    latitude:30.55675
    // marks:[//标记点位置
    //   { id:0,
    //     latitude:30.556759,
    //     longitude:104.0002,
    //     iconPath:"../static\icons\markPoint.png",
    //   }
    // ]

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // setInterval(function () {
    //   console.log(res)
    //   let url = app.globalData.url+'url'
    //   // 请求总贴子数，今日新增，今日热门
    //   api.post(url, {  
    //     "openid": app.globalData.openid,
    //   }).then((res) => {
    //      //设置总贴子数，今日新增，今日热门
    //     this.setData({
    //       allPostNum: res.data, 
    //       addPostNum: res.data,
    //       hotSpot1: res.data,
    //       hotSpot2: res.data,
    //     })
    //   })
    // }, 1000)  
  }, 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }


})