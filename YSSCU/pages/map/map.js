// pages/map/map.js
const api = require("../../api/api")
const app = getApp();
Page({
  data: {
    allPostNum: 20,
    addPostNum: 20,
    hotSpot1:'综合楼',
    hotSpot2:'图书馆',
    hotSpot3:'体育馆',
    longitude: "",
    latitude: "",
  },

  onLoad: function () {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        console.log(res.longitude, res.latitude)
      }
    })
    setInterval(function () {
      console.log(res)
      let url = app.globalData.url+'/post/getpost'
      // 请求总贴子数，今日新增，今日热门
      api.post(url, {  

      }).then((res) => {
         //设置总贴子数，今日新增，今日热门
        this.setData({
          allPostNum: res.data.totalpost, 
          addPostNum: res.data.todaypost,
          hotSpot1: res.data,
          hotSpot2: res.data,
          hotSpot3: res.data,
        })
      })
    }, 60000)  
  }, 

})