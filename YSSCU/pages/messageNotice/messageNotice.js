// pages/messageNotice/messageNotice.js
// 管理员发送系统消息
const api = require("../../api/api")
const app = getApp();

Page({
  data: {
    studentNumber: "",  // 学号
    ptext: "",          // 发送的消息
  },

  onShow: function (e) {
    if(e){
      // 获取并显示搜索结果
      this.setData({
        studentnumber: e.studentNumber,
      })
    }else{
    }
  },

  //输入框获得焦点时跳转搜索页面
  search: function(){
    wx.navigateTo({
    url: '/pages/searchUser/searchUser',
    });
  },

  // 点击 + ，跳转
  addClick: function(){
    wx.navigateTo({
      url: '/pages/searchUser/searchUser',
    })
  },

   // 获取输入文本
  GetMsg: function(e){
    console.log('input', e.detail.value)
    this.setData({
      msg: e.detail.value
    })
    console.log('message', this.data.msg)
  },

  // 点击发送
  onClickSend: function(){
    let url = app.globalData.url + '/post'
    if(this.data.studentNumber){     // 选择发送用户
      api.post(url, {
        studentnumber: this.data.studentnumber,
        ptext: this.data.ptext,
      }).then((res)=>{
        if(res.data.success){
          wx.showToast({
            title: '发送成功',
            duration: 3000,
          }).then((res) => {
            wx.navigateBack({    // 回到上一个界面
              delta: 1,  
            })
          })
      }else{       // 发送失败
        wx.showToast({
          title: '发送失败',
          icon: 'none',
          duration: 3000,
        })
      }
    })
    }else{       // 未选择发送用户
      wx.showToast({
        title: '请选择发送对象！',
        icon: 'none',
        duration: 3000
      })
    }  
  },

})