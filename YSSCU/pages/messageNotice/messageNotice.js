// pages/messageNotice/messageNotice.js
// 管理员发送系统消息
const api = require("../../api/api")
const app = getApp();

Page({
  data: {
    studentNumber: "",  // 学号
    mtext: "",          // 发送的消息
    navigateId: 0,
    submitAble: true
  },

  onLoad: function(e){
    this.setData({
      studentNumber: e.studentNumber,
      submitAble: true
    })
    console.log('studentNumber', this.data.studentNumber)
  },

  onShow: function () {
    
  },

  //输入框获得焦点时跳转搜索页面
  search: function(){
    wx.navigateTo({
    url: `/pages/searchUser/searchUser?navigateId=${this.data.navigateId}`,
    });
  },

  // 点击 + ，跳转
  addClick: function(){
    wx.navigateTo({
      url: `/pages/searchUser/searchUser?navigateId=${this.data.navigateId}`,
    })
  },

   // 获取输入文本
  GetMsg: function(e){
    console.log('input', e.detail.value)
    this.setData({
      mtext: e.detail.value
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
    // 选了了用户并且输入了内容
    if(this.data.studentNumber && this.data.mtext){
      // 禁止反复发送同一条
      this.setData({
        submitAble: false
      })
      // 发送
      console.log('studentNumber', )
      if(!this.data.imgFilePath){  // 用户没有发送图片
        let url = app.globalData.url + '/message/messageNotice'
        api.post(url, {
          adminId: wx.getStorageSync('adminAccount'),
          studentNumber: this.data.studentNumber,
          mtext: this.data.mtext,
      }).then((res)=>{
        // let data = JSON.parse(res.data)
        if(res.data.success == true){
          wx.showToast({
            title: '发布成功！',
            duration: 3000,
          }).then((res) => {
            wx.navigateBack({
            delta: 1,
          })
        })
      }else{   
        wx.showToast({
          title: '发送失败',
          icon: 'error',
          duration: 3000,
        })
      }
    })
    }else{    // 用户发送了图片
      console.log('onSending Picture...')
      console.log('mtext', this.data.mtext)
      let url = app.globalData.url + '/message/img'
      let filePath = this.data.imgFilePath
      api.adminUpload(url, filePath, {
        adminId: wx.getStorageSync('adminAccount'),
        studentNumber: this.data.studentNumber,
        mtext: this.data.mtext,
      }).then((res)=>{
        let data = JSON.parse(res.data)
        if(data.success == true){
          wx.showToast({
            title: '发送成功',
            duration: 3000,
          }).then((res) => {
            wx.reLaunch({
              url: '/pages/adminstor/adminstor',
            })
          })
        }else{
          wx.showToast({
            title: '发送失败',
            icon: 'error',
            duration: 3000,
          })
        }
      })
    } 
    }else{
      wx.showToast({
        title: '请输入正确内容',
        icon: 'error'
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