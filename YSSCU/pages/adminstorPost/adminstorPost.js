// pages/adminstorPost/adminstorPost.js
const api = require("../../api/api");
const app = getApp();

Page({
  data: {
    active: 0,
    index: 0,
    triggered: true,                                    // 下拉刷新触发
    searchvalue: "",                                     // 搜索栏的值
    array: ['全部', '失物招领','表白'],                   // 右侧列表选项
    objectArray: [
      {
        id: 0,
        name: '全部'
      },
      {
        id: 1,
        name: '失物招领'
      },
      {
        id: 2,
        name: '表白'
      }
    ],
    studentNumber: '',                                    // 学生学号
    postList:[{                                           // 发帖列表
      postId: '1',                                        // 帖子id
      simgurl: "",                                        // 用户头像
      profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg', // 用户发的图片
      name: '大白',                                       // 发帖者微信名
      title:'标题',                                       // 标题
      position1: '',                                      // 失物招领或表白标签
      position2:'',                                       // 教学楼
      time:  '2021-11-30 14:00',                          // 发布时间
      ptitle: "这是帖子的标题",                            // 帖子的标题
      detail: "这里是我发的帖子",                          // 帖子的内容
      thumbnum:0,                                         // 帖子点赞数
      chatnum: 0,                                         // 帖子评论数
      sharenum: 0,                                        // 帖子分享数
      starnum: 0,                                         // 帖子转发数
    }]
  },

  onLoad: function(e){
    console.log('onLoad:', e)
    this.setData({
      searchvalue: e.searchvalue
    })
    console.log('searchValue:', this.data.searchvalue)
    this.bindPickerChange();
  },

  onShow: function (e) {
    //请求所有帖子
    console.log('onShow')
    let url = app.globalData.url + '/search/requestPost';
    api.post(url, {  
      choice: '全部',
   }).then((res) => {
     console.log('onshowRequest:', res)
    // 请求成功
    if(!res.data.empty){
      for (var chr of res.data.postList) {
        chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
      }
      console.log('postList:', res.data.postList);
      this.setData({
        postList: res.data.postList,
     })
     console.log('url', this.data.url)
     }else{  // 请求失败
      wx.showLoading({
        title: '加载中',
      })      
    }
  }).catch((Error)=>{
    console.log('ERR',Error)
  })
  
},

  // 获取选项并搜索
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    // 按选项搜索
    let url = app.globalData.url + '/search/requestPost';
    console.log('choice', this.data.array[Number(this.data.index)])
    api.post(url, {  
        studentNumber: app.globalData.studentNumber,
        choice: this.data.array[this.data.index],
   }).then((res) => {
    // 请求成功
    console.log('res:', res)
    if(!res.data.empty){
      for (var chr of res.data.postList) {
        chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
      }
      this.setData({
        postList: res.data.postList,
     })
    }else{  // 请求失败
      wx.showLoading({
        title: '加载中',
      })      
    }
  })
  },

  //用户下拉动作
  onScrollRefresh: function () {
    var that=this;
    setTimeout(function(){
      that.setData({
        triggered: false,
      })
    },2000);
    this.onShow();       // 重新加载帖子
  },

  // 用户点击搜索框，跳转到搜索界面
  bindFocus: function(){
    wx.navigateTo({
      url: '/pages/adminstorSearchPost/adminstorSearchPost',
    })
  },
   
})

