// components/comment/comment.js
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
    photo: {
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
      value: 1111
    },
    thumbStatus: {
      type: Number,
      value: 0
    }
  },

  data: {
    poc: 0,
  },

  methods: {
    thumb() {
      // 点赞
      var allpages = getCurrentPages(); // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1];
      let url = app.globalData.url + '/action/thumb'
      api.post(url, {
        pid: this.data.commentId,
        studentNumber: app.globalData.studentNumber,
        poc: 0
      }).then((res) => {
        console.log(res)
        //if(res.data.empty){
        this.setData({
          thumbStatus: res.data.thumbnum,
          thumbnum: res.data.isThumb
        })
        nowpage.onShow()
        //}
        console.log('thumb:', this.data.thumbnum, 'thumbstatus:', this.data.thumbStatus)
      })
    },

    // 举报
    report() {
      var poc = 0;
      wx.navigateTo({
        url: '/pages/report/report?poc=' + poc + "&postId=" + this.data.commentId
      })
    },
  }
})