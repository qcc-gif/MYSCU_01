const api = require("../../api/api");
const app = getApp();

// pages/appeal/appeal.js
Page({
  data: {
    reason: "学习竞赛需要",
    columns: ['学习竞赛需要', '专业背景相关', '账号被盗', '对不起，我错了', '其他'],
    phone: "",
    detail: "",
    showpopup: false,
    openid: "",  
  },

  onLoad(e){
    this.setData({  // 从封号界面传的参数：被封号用户的openid
      openid: e,
    })
    console.log('info', e)
  },

  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      reason: value
    })
  },

  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      reason: value,
      showpopup: false
    })
  },

  onCancel() {
    console.log('取消')
    this.setData({
      showpopup: false
    });
  },

  onClosePopup() {
    this.setData({
      showpopup: false
    });
  },

  showPicker: function () {
    console.log(12)
    this.setData({
      showpopup: true
    });
  },

  GetDetail: function(event){
    this.setData({
     detail: event.detail,
    })
    console.log('detail:', this.data.detail)
  },

  GetContactInfo: function(event){
    this.setData({
     phone: event.detail,
    })
    console.log('phone:', this.data.phone)
  },

  onPostAppeal: function(){
    let url = app.globalData.url + '/user/?'
    api.post(url, {
      openid: this.data.openid,
      reason: this.data.reason,
      detail: this.data.detail,
      phone: this.data.phone,
    }).then((res) => {
      wx.showToast({
        title: '提交成功！',
      })
      wx.navigateBack({
        delta: 1,
      })
    })
  }

})