// pages/report/report.js
const api = require("../../api/api");
const app = getApp();

// pages/appeal/appeal.js
Page({
  data: {
    reason: "不实信息",
    columns: ['不实信息', '垃圾广告信息', '诱导赞同、关注等行为', '辱骂、人身攻击等不友善行为', 
    '有人意图自杀或自残','骚扰','不规范转载或涉嫌侵权','清朗行动专项举报'],
    phone: "",                     // 联系方式
    detail: "",                    // 阐述的举报细节
    poc: "",                       // 帖子/评论
    pid: "",                       // 帖子或评论的ID
    showpopup: false,
  },

  onLoad(e){
    this.setData({  // 从帖子或评论的阅读界面传的参数：（1）poc: 帖子/评论；（2）pid: 帖子或评论的ID
      poc: e.poc,
      pid: e.pid,
    })
    console.log('info', this.poc, this.pid)
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

  // 获取细节
  GetDetail: function(event){
    this.setData({
     detail: event.detail,
    })
    console.log('detail:', this.data.detail)
  },

  // 获取联系方式
  GetContactInfo: function(event){
    this.setData({
     phone: event.detail,
    })
    console.log('phone:', this.data.phone)
  },

  // 发送举报
  onPostAppeal: function(){
    let url = app.globalData.url + '/users/report'
    if(this.data.detail){
      api.post(url, {
        studentNumber: this.data.studentNumber,
        poc: this.data.poc,
        pid: this.data.pid,
        rtype: this.data.reason,
        rreason: this.data.detail,
        rphone: this.data.phone,
      }).then((res) => {
        console.log(res)
        if(res.data.success){
          wx.showToast({
            title: '提交成功！',
            duration: 2000,
          }).then((res) => {
            wx.navigateBack({
              delta: 1,
            })
          })
        }else{
          wx.showToast({
            title: '不可以重复举报！',
            icon: 'none',
          })
        }
      })
    }else{
      wx.showToast({
        title: '请阐述理由',
        icon: 'none',
      })
    }
   
  }

})