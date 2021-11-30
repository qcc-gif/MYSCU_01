// pages/square/square.js
const api = require("../../api/api")
const app = getApp();

Page({
  data: {
    active: 0,
    searchvalue: "", // 搜索栏的值
    index: 0,
    array: ['全部', '教学区', '餐厅区', '运动区','宿舍区','失物招领','表白'],
    objectArray: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '教学区'
      },
      {
        id: 2,
        name: '餐厅区'
      },
      {
        id: 3,
        name: '运动区'
      },
      {
        id: 4,
        name: '宿舍区'
      },
      {
        id: 5,
        name: '失物招领'
      },
      {
        id: 6,
        name: '表白'
      }
    ],
    openid: "",
    postList:[{   //
      postId: '1',                                        //帖子id
      profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg', //头像
      name: '大白',                                       // 发帖者微信名
      title:'标题',                                       // 标题
        position1: '教学楼',
        position2:'一教',
        time:  '2021-11-30 14:00',
        detail: "这里是我发的帖子",
        thumbnum:'0',
        chatnum: '0',
        sharenum: '0',
        starnum: '0'
    }]
  },

  onLoad: function(){

  },

  onShow: function () {
    //请求所有帖子
    let url = app.globalData.url + 'url';
    api.post(url, {  
        openid: wx.getStorageInfoSync('openid')
   }).then((res) => {
    // 请求成功
    if(res.data.postList){
      this.setData({
        postList: res.data,
     })
    }else{  // 请求失败
      wx.showLoading({
        title: '加载中',
      })      
    }
  })
},

  // 获取选项并搜索
  bindPickerChange: function (e) {
    console.log('picker:', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    // 按选项搜索
    let url = app.globalData.url + 'url';
    api.post(url, {  
        openid: wx.getStorageInfoSync('openid'),
        choice: this.data.array[this.data.index],
   }).then((res) => {
    // 请求成功
    if(res.data.postList){
      this.setData({
        postList: res.data,
     })
    }else{  // 请求失败
      wx.showLoading({
        title: '加载中',
      })      
    }
  })
  },

  // 用户点击搜索框，跳转到搜索界面
  bindFocus: function(){
    wx.navigateTo({
      url: '/pages/searchPost/searchPost',
    })
  },
  
})
