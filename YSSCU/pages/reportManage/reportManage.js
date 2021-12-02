// pages/reportManage/reportManage.js
const api = require("../../api/api")
const app = getApp();
Page({
  data: {
    reportList:[{id:'1',
      userId: '1',
      name: '大',
      studentNumber:'2019',
      profilePhoto:'https://img.yzcdn.cn/vant/cat.jpeg',
      position:'教学楼 一教',
      time: '2000年11月14日 14:00',
      detail: "这里是我发的帖子"
      }
    ]

  },
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
    // 请求举报列表
    api.post(url, {  
      openid: wx.getStorageInfoSync('openid')
    }).then((res) => {
       //展示举报列表
      this.setData({
       reportList:res.data
      })
    })
    },
})