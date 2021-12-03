// pages/messageNotice/messageNotice.js
// 管理员发送系统消息
const api = require("../../api/api")
const app = getApp();

Page({
  data: {
    studentnumber: "",  // 学号
    // avatar: "",         // 学生头像
    ptext: "",          // 发送的消息
    countIndex: 1,      // 上传图片的最大数量
    imgFilePath: null,  // 上传图片的路径
  },

  onShow: function (e) {
    if(e){
      // 获取并显示搜索结果
      this.setData({
        studentnumber: e.studentNumber,
        avatar: e.profilePhoto,
      })
    }else{

    }
    
  },

  //输入框获得焦点时跳转搜索页面
  search: function(){
    wx.navigateTo({
    url:'/pages/searchUser/searchUser',
    });
  },

   // 获取输入文本
  GetMsg: function(e){
    console.log('input', e.detail.value)
    this.setData({
      msg: e.detail.value
    })
    console.log('message', this.data.msg)
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
    // 没有上传图片
    if(!this.data.imgFilePath){
      let url = app.globalData.url + '/post'
      api.post(url, {
        studentnumber: this.data.studentnumber,
        ptext: this.data.ptext,
      }).then((res)=>{
        if(res.data.success){
          wx.showToast({
            title: '发送成功',
          }).then((res) => {
            wx.navigateBack({    // 回到上一个界面
              delta: 1,  
            })
          })
      }else{
        wx.showToast({
          title: '发送失败',
          icon: 'none',
        })
      }
    })
    }else{   // 上传了图片
      let url = app.globalData.url + '/post/img'
      let filePath = this.data.imgFilePath
      api.upload(url, filePath, {
        studentNumber: this.data.studentnumber,
        ptext: this.data.ptext
      }).then((res)=>{
        console.log(res)
        if(res.statusCode=='200'){
          wx.showToast({
            title: '发送成功',
          }).then((res) => {
            wx.navigateBack({   // 回到上一个页面
              delta: 1,
            })
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

  // 点击删除
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