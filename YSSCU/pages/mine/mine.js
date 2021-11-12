// pages/mine/mine.js
Page({
  data: {
    postnum: 20,
    starnum: 10,
    showAction: false
  },
  contactFonfirm: function(){
    this.setData({
      showAction: true
    })
  },
  onCloseAct:  function(){
    this.setData({
      showAction: false
    })
  },
})