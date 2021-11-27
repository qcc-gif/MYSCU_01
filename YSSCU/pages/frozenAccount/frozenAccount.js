// pages/frozenAccount/frozenAccount.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        accountList:[{id:'1',
        userId: '1',
        studentNumber: '2019',
        profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',
        name:  '大白',
          }]
    },
    search:function(){
        var navigateId=1;
        wx.navigateTo({
        url:'/pages/searchUser/searchUser?navigateId='+navigateId
      });
},
   

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
    //     let url = 'url'
    // // 请求用户账号列表
    // api.post(url, {  
      
    // }).then((res) => {
    //    //展示用户账号列表
    //   this.setData({
    //    accountList：res.data
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