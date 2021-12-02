const api = require("../../api/api");

// pages/addComment/addComment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg:"",
        imgFilePath:""

    },
    // 获取输入文本
  GetMsg: function(e){
    console.log(e.detail)
    this.setData({
      msg: e.detail
    })
  },
  // 图片浏览及上传
  browse: function(e){
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      // itemColor: "#CED63A",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera');
          }
        }
      }
    })
  },

  // 打开相册，相机
  chooseWxImage: function(type) {
    let that = this;
    wx.chooseImage({
      count: that.data.countIndex,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      // 选择图片成功，保存imgFilePath
      success: function (res) {
        that.setData({
          imgFilePath: res.tempFilePaths[0]
        })
        console.log('imgFilePath:', res.tempFilePaths[0])
      }
    })
  },
  deleteImage: function(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          that.setData({
            imgFilePath: null,
          })
        } else if (res.cancel) {
          console.log('点击取消了');
        }
      }
    })
  },
  onClickSend:function(){
      if(!this.data.msg&&!this.data.imgFilePath){
        wx.showToast({
            title: '请添加评论内容',
            icon: 'none'
          })
      }
      else if(!this.data.imgFilePath&&this.data.msg){
        let url = app.globalData.url + 'url'
        api.post(url, {
            postId:this.data.postId,
            userId:this.data.userId,
            ptext: this.data.msg,
        }).then((res)=>{
            if(res.data.success){
                wx.showToast({
                  title: '发送成功',
                  icon: 'none'
                })
                wx.navigateBack({
                    delta:1
                })
            }else{
                wx.showToast({
                  title: '发送失败',
                  icon: 'none',
                })
              } 
      })
      }
      else{
          let url=app.globalData.url + 'url'
          api.post(url,{
            postId:this.data.postId,
            userId:this.data.userId,
            ptext: this.data.msg,
            img:this.data.imgFilePath
          }).then((res)=>{
            if(res.data.success){
                wx.showToast({
                  title: '发送成功',
                  icon: 'none'
                })
                wx.navigateBack({
                    delta:1
                })
            }else{
                wx.showToast({
                  title: '发送失败',
                  icon: 'none',
                })
              }
          }) 
      }
},


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            postId:options.detail.postId
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