// components/adminstorComment/adminstorComment.js
const api = require("../../api/api");
const app = getApp();

Component({
  properties: {
    commentId: {
      type: Number,
      value: 1
    },
    profilePhoto: {
      type: String,
      value: 'https://img.yzcdn.cn/vant/cat.jpeg'
    },

    name: {
      type: String,
      value: '大白'
    },
    time: {
      type: String,
      value: '2000年11月14日 14:00'
    },
    detail: {
      type: String,
      value: "这里是我发的评论"
    },
    thumbnum: {
      type: Number,
      value: 1
    },
    photo: {
      type: String,
      value: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },

  data: {

  },

  methods: {
    // 删除评论
    delete() {
      var allpages = getCurrentPages(); // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1]; // 获取页面，包括数据和方法
      console.log(this.data.isDelete, this.data.postId)
      let url = app.globalData.url + '/action/PCDrop'
      api.post(url, {
        pid: this.data.commentId,
        poc: 0
      }).then((res) => {
        console.log(res)
        if (res.data.success) { // 返回一个状态，是否删除成功
          console.log(res)
          wx.showToast({
            title: '删除成功',
          })
          nowpage.onShow()
        } else {
          wx.showToast({
            title: '出错啦！',
            icon: 'error'
          })
        }
      }).catch((err) => {
        console.log(err)
        wx.showToast({
          title: '删除异常！',
          icon: 'error'
        })
      })
    },
  }
})