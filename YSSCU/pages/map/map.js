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
    markers: [],
    circle: [],
    // speed: 0,
    // accuracy: 0,
  },

  onLoad: function () {
    var that = this
    //获取当前的地理位置、速度
    wx.getLocation({
      type: 'wgs84', 
      success: function (res) {
        console.log('res:', res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: [{
            id: 1,
            latitude: res.latitude,
            longitude: res.longitude,
            width: 50,
            height: 50,
            iconPath: "https://img0.baidu.com/it/u=1291843146,1328854747&fm=26&fmt=auto",
            title: "您所在的位置"
          }],
          circles: [{
            latitude: res.latitude,
            longitude: res.longitude,
            color: '#FF0000DD',
            fillColor: '#7cb5ec88',
            radius: 100,
            strokeWidth: 1
          }],
        })
        console.log(res.longitude, res.latitude, that.data.markers)
      }
    })

    // setInterval(function () {
    //   // console.log(res)
    //   let that = this
    //   let url = app.globalData.url+'/post/getpost'
    //   // 请求总贴子数，今日新增，今日热门
    //   api.post(url, {  

    //   }).then((res) => {
    //      //设置总贴子数，今日新增，今日热门
    //     that.setData({
    //       allPostNum: res.data.totalpost, 
    //       addPostNum: res.data.todaypost,
    //       hotSpot1: res.data,
    //       hotSpot2: res.data,
    //       hotSpot3: res.data,
    //     })
    //   })
    // }, 600)  
  }, 

  onShow: function(){
    console.log('onshow')
    var that = this
    setInterval(function () {
      // console.log(res)
      let url = app.globalData.url+'/post/getpost'
      // 请求总贴子数，今日新增，今日热门
      api.post(url, {  

      }).then((res) => {
        console.log('result', res)
         //设置总贴子数，今日新增，今日热门
        that.setData({
          allPostNum: res.data.totalpost, 
          addPostNum: res.data.todaypost,
          hotSpot1: res.data.hostpost1,
          hotSpot2: res.data.hostpost2,
          hotSpot3: res.data.hostpost3,
        })
      })
    }, 6000000000)  
  }

})