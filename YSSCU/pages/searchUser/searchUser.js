// pages/searchUser/searchUser.js
Page({
    data: {
        searchValue:'',//搜索内容
        navigateId:'',//页面跳转传递的参数，1为frozenAccount页面跳转过来传递的参数
                      //2为messageNotice页面跳转过来传递的参数
        searchResultList:[
          {studentNumber:'20191414',
          userId:'1',
          profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',
          name: '大白'}],
          noneview: null,                        // 有无搜索结果: true无搜索结果 false有搜索结果

    },


    // 点击搜索
    onSearch: function(){
        console.log('onSearch')
        let url = app.globalData.url + '/'
        api.post(url, {
            key: this.data.searchValue
        }).then((res) => {
            if(res.data){  // 查找到
                this.setData({
                    noneview: false,
                    searchResultList: res.data,
                })
            }else{
                this.setData({  // 未查找到
                    noneview: true
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            navigateId:options.navigateId
        })
          
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