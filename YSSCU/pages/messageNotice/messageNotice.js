// pages/messageNotice/messageNotice.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue:'',
        editMessage:'',
        picture:'',
        userId:[]
    },
    //输入框获得焦点时跳转搜索页面
    search:function(){
       var navigateId=2;
            wx.navigateTo({
            url:'/pages/searchUser/searchUser?navigateId='+navigateId
          });
    },
    pictureClick:function(e){
        var index = e.currentTarget.dataset.index;
        var count = 1;
        var that = this;
        wx.chooseImage({
          count: count,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            var tempFilePaths = res.tempFilePaths;
            that.setData({
              tempFilePaths: res.tempFilePaths,
            })
            var imagename=that.data.tempFilePaths[0];
            console.log(imagename)
            var testName=imagename.split('/')[3] || imagename.split('/')[2];
            console.log(testName);
            that.setData({
              imagename:testName,
              picType:testName.split('.')[1]
            });
            wx.getFileSystemManager().readFile({
              filePath: res.tempFilePaths[0], //选择图片返回的相对路径
              encoding: "base64", 
              success: res => { //成功的回调
                //返回base64格式
                //console.log('data:image/png;base64,' + res.data)
                that.setData({
                  picture:res.data
                })
              
              }
            })
          }
        })
    
        },
    //获取输入的内容
        getEdit:function(event){
            
            this.setData({
                editMessage: event.detail
           });
           console.log('text:', this.data.editMessage);
          },
          //发送
          sendClick:function(){
            var that=this
            if(!that.data.value){
                wx.showModal({
                  title:'请添加用户！'
                })
                return;
              }
              wx.showLoading({
                title: '正在发送...',
              });
              let url = app.globalData.url + ''
              api.post(url, {
                "openid": app.globalData.openid,
                'picture':that.data.picture,
                'editMessage':that.data.introduce,
                'userId':that.data.userId
              }).then((res) => {
                if(res.data.success){
                    wx.showToast({
                        title: '发送成功！',
                    })
                    console.log(res.data);
                }
                else{
                    wx.showToast({
                        title: '发送失败！',
                    })
                }
              })
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