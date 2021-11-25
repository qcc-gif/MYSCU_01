// pages/reportManage/reportManage.js
var app = getApp();
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
    //     let url = 'url'
    // // 请求举报列表
    // api.post(url, {  
      
    // }).then((res) => {
    //    //展示举报列表
    //   this.setData({
    //    reportList：res.data
    //   })
    // })

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