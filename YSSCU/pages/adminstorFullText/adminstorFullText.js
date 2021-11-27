// pages/adminstorFullText/adminstorFullText.js
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
            studentNumber:'2019',
              position1: '教学楼',
              position2:'一教',
              time:  '2000年11月14日 14:00',
              detail: "这里是我发的帖子",
              thumbnum:'2',
              chatnum: '2',
              sharenum: '2',
              starnum: '2'
          }],
          commentList:[{
              postId:'1',//帖子id
          commentId:'1',
        profilePhoto:'https://img.yzcdn.cn/vant/cat.jpeg',
        name: '大',
        studentNumber:'2019',
          time:  '2000年11月14日 14:00',
          detail: "这里是我发的评论",
          thumbnum: '1'
          }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.postId)
        // let url='url';
     // api.post(url, {  //请求帖子和评论列表
        //"postId":this.data.options.postId
 // }).then((res) => {
 //    //展示帖子和评论列表
 //   this.setData({
 //    postList：res.data
 //commentList：
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