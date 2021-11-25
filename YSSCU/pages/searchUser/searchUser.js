// pages/searchUser/searchUser.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue:'',//搜索内容
        searchResultList:[
          {studentNumber:'20191414',
          userId:'1',
          profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',
          name: '大白'}],
        holdKeyboard:true//focus时，点击页面时收起键盘，true：不收起

    },
    // searchInput:function(event){
            
    //     this.setData({
    //         searchValue: event.detail
    //    });
    //    console.log('search:',this.data.searchValue);
    //   },
    // //搜索
    // onSearch:function(){
    //     var userId=this.data.searchValue;
    //     console.log(userId);
    //     if (userId.length == 0) {
    //         wx.showModal({
    //           title:'请输入账号！'
    //         })
    //       } else {
    //         this.searchResult(userId);
    //       }
        
    // },
    // searchResult:function(user) {
    //    let url="url?keyWord="+user;
    //     api.post(url, {  
    // }).then((res) => {
    //    //展示搜索结果
    //   this.setData({
    //    searchResultList：res.data
    //   })
    // })


    // },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.navigateId==2){
            console.log(options)
            this.navigate1(searchResultList)
        }
        else{
            console.log(options)
            this.navigate2(searchResultList)
        }
          
    },
    navigate1:function(e) {
        wx.navigateTo({
          url: '/pages/messageNotice/messageNotice?result='+e,
        })
    },
    navigate2:function(e) {
        wx.navigateTo({
          url: '/pages/frozenAccount/frozenAccount?result='+e,
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