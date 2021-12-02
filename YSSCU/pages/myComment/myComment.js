// pages/myComment/myComment.js
const api = require("../../api/api")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentList:[{
            postId:'1',//帖子id
        commentId:'1',
      profilePhoto:'https://img.yzcdn.cn/vant/cat.jpeg',
      name: '大',
        time:  '2000年11月14日 14:00',
        detail: "这里是我发的评论",
        thumbnum: '1'
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
        // 请求我的评论列表
        api.post(url, {  
            openid: wx.getStorageInfoSync('openid')
        }).then((res) => {
           //展示我的评论列表
          this.setData({
           commentList:res.data
          })
        })
    },
    
})