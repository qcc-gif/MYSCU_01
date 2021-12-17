// components/adminstorPost/adminstorPost.js
const api = require("../../api/api");
const app = getApp();

Component({
  properties: {
    postId: {
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
    place: {
      type: String,
      value: '一教'
    },
    label: {
      type: String,
      value: ''
    },
    time: {
      type: String,
      value: '2000年11月14日 14:00'
    },
    title: {
      type: String,
      value: "这里是我的标题"
    },
    detail: {
      type: String,
      value: "这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子这里是我发的帖子"
    },
    thumbnum: {
      type: Number,
      value: 1111
    },
    chatnum: {
      type: Number,
      value: 1111
    },
    sharenum: {
      type: Number,
      value: 1111
    },
    starnum: {
      type: Number,
      value: 1111
    }
  },
  data: {
    isDelete: false
  },

  methods: {
    // 删除帖子
    delete() {
      console.log("pid:", this.data.postId)
      var allpages = getCurrentPages(); // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1]; // 获取页面，包括数据和方法
      let url = app.globalData.url + '/action/PCDrop' // 删除帖子
      api.post(url, {
        pid: this.data.postId,
        poc: 1
      }).then((res) => {
        console.log(res)
        if (res.data.success) { // 返回一个状态，是否删除成功
          console.log(res.data)
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
      })

    },

    // 点击帖子跳转详情
    fullDetails() {
      wx.navigateTo({
        url: '/pages/adminstorFullText/adminstorFullText?postId=' + this.data.postId,
      })
      console.log('adminstorPost PostId:', this.data.postId)
    }
  }
})