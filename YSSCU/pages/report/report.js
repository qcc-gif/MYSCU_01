// pages/report/report.js
const api = require("../../api/api");
const app = getApp();

Page({
  data: {
    reason: "不实信息",
    columns: ['不实信息', '垃圾广告信息', '诱导赞同、关注等行为', '辱骂、人身攻击等不友善行为', '有人意图自杀或自残','骚扰','不规范转载或涉嫌侵权','清朗行动专项举报'],
    poc: 0,                       // 帖子或评论的标识
    pid: "",                       // 帖子或评论的ID
    showpopup: false,
  },

  onLoad(e){
    // 从帖子或评论的阅读界面传的参数：（1）poc: 1帖子/1评论；（2）pid: 帖子或评论的ID
    this.setData({  
      poc: e.poc,
      pid: e.postId,
    })
    console.log('info', this.data.poc, this.data.pid)
  },

  // 获取理由
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

  // 发送举报
  onPostAppeal: function(){
    let url = app.globalData.url + '/users/report'
    api.post(url, {
      studentNumber: wx.getStorageSync('studentNumber'),
      poc: this.data.poc,
      pid: this.data.pid,
      rtype: this.data.reason,
    }).then((res) => {
      console.log(res)
      if(res.data.success){
        wx.showToast({
          title: '提交成功！',
          duration: 5000,
        }).then((res) => {
          wx.navigateBack({
            delta: 1,
          })
        })
      }else{
        wx.showToast({
          title: '不可以重复举报！',
          icon: 'none',
          duration: 3000,
        })
      }
    })
  },

})