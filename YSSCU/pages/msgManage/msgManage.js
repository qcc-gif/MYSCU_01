// pages/systempost/systempost.js
const api = require("../../api/api");
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msgList:[
            {
            name:'管理员',
            time: '2000.11.14 12:00',
            msg: '这是一条系统消息'}
        ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let url = app.globalData.url+'url'
    // 请求系统消息列表
    api.post(url, {  
        openid: wx.getStorageInfoSync('openid')
    }).then((res) => {
       //展示系统消息列表
       if(res.data.success){
        this.setData({
            msgList:res.data
        })
      }
    })
    },

})