// pages/addComment/addComment.js
const api = require("../../api/api");
const app = getApp();

Page({
  data: {
    postId: "",
    ptext: "",          // 正文
    countIndex: 1,      // 上传图片的最大数量
    imgFilePath: null,  // 上传图片的路径
  },

  onLoad: function(e){
    this.setData({
      // postId: e.detail.value
      postId: '1'
    })
  },

  onChangeTab: function () {

  },

  // 获取输入文本
  GetMsg: function(e){
    console.log('input', e.detail.value)
    this.setData({
      ptext: e.detail.value
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

  // 点击发送
  onClickSend: function(){
    if(this.data.ptext){ // 用户填写了文本
      // 发送
      if(!this.data.imgFilePath){  // 用户没有发送图片
        let url = app.globalData.url + '/comment/addComment'
        api.post(url, {
          studentNumber: wx.getStorageSync('studentNumber'),
          postId: this.data.postId,
          ptext: this.data.ptext,
      }).then((res)=>{
        if(res.statusCode == '200'){
          wx.showToast({
            title: '发布成功！',
            duration: 3000,
          }).then((res) => {
            wx.reLaunch({
              url: '/pages/square/square',
            })
          })
          
        }else{   
          wx.showToast({
            title: '发送失败',
            icon: 'none',
            duration: 3000,
          })
        }
      })
      }else{    // 用户发送了图片
        let url = app.globalData.url + '/comment/img'
        let filePath = this.data.imgFilePath
        api.addcomment(url, filePath, {
          studentNumber: wx.getStorageSync('studentNumber'),
          postId: this.data.postId,
          ptext: this.data.ptext,
        }).then((res)=>{
          console.log(res)
          if(res.statusCode=='200'){
            console.log('continue')
            wx.showToast({
              title: '发送成功',
              duration: 3000,
            }).then((res) => {
              wx.navigateBack({
                delta: 1,
              })
            })
          }else{
            wx.showToast({
              title: '发送失败',
              icon: 'none',
              duration: 3000,
            })
          }
        })
      } 
    }else{   // 用户未填写内容
      wx.showToast({
        title: '请填写内容！',
        icon: 'none',
        duration: 3000,
      })
    }
  },

  // 点击删除已上传的图片
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

})