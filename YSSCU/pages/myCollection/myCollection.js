// pages/myCollection/myCollection.js
const api = require("../../api/api")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postList:[{
            postId: '1',//帖子id
            profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',//头像
            name: '大白',
            title:'标题',
              position1: '教学楼',
              position2:'一教',
              time:  '2000年11月14日 14:00',
              detail: "这里是我发的帖子",
              thumbnum:'2',
                chatnum: '2',
                sharenum: '2',
                starnum: '2'
          }]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

  
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
            let url = app.globalData.url+'url'
      // 请求我的收藏帖子列表
      api.post(url, {  
        openid: wx.getStorageInfoSync('openid')
      }).then((res) => {
         //展示我的收藏帖子列表
        this.setData({
         postList:res.data
        })
      })
    },
    
})