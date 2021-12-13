// components/fullText/fullText.js
const api = require("../../api/api");
const app = getApp();
Component({
  properties: {
    postId:{
      type: Number,
      value: 1
    },
    profilePhoto:{
      type:String,
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
    label:{
      type:String,
      value:''
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
    thumbnum:{
      type: Number,
      value: 111
    },
    chatnum:{
      type: Number,
      value: 111
    },
    sharenum:{
      type: Number,
      value: 111
    },
    starnum:{
      type: Number,
      value: 111
    },
    photo:{
      type:String,
      value: ''
    },
    thumbStatus:{
      type:Number,
      value:0
    },
    starStatus:{
      type:Number,
      value:0
    },
  },
  data: {

  },

  methods: {
    // 举报
    report(){     
      var poc = 1;                                  
        wx.navigateTo({
          url: '/pages/report/report?postId='+this.data.postId+'&poc='+poc,
        })
    },

    // 点赞
    thumb(){                                        
      var allpages = getCurrentPages();   // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1];   // 获取页面，包括数据和方法
      let url = app.globalData.url + '/action/Thumb'
      api.post(url, {
        pid:this.data.postId,
        studentNumber:app.globalData.studentNumber,
        poc:1
      }).then((res) => {
        console.log(res)
        if(!res.data.empty){
          this.setData({
            thumbnum:res.data.thumbnum,
            thumbStatus: res.data.isThumb
          })
          console.log("Thumb:",this.data.thumbStatus,this.data.thumbnum)
        }else{
          console.log(res.data)
        }
        nowpage.onShow()
      })
    },

    // 评论
    chat(){                                                    
      wx.navigateTo({
        url: '/pages/addComment/addComment?postId='+this.data.postId,
      })
   },
  
   // 分享
   onShareAppMessage: function (ops) {
    if (ops.from === 'button') {                   // 来自页面内转发按钮
      console.log(ops.target)            
    }
    return {
      title: '云上川大小程序',
      path: 'pages/fullText/fullText?id=123&age=18',           // 路径
      imageUrl:'',                                             // 分享的封面图
      success: function (res) {                                // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {                                   // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      },
    }
  },

  // 更新分享数据
  share(){
    var allpages = getCurrentPages();//获取全部页面数据
    var nowpage = allpages[allpages.length - 1];//获取页面，包括数据和方法
    let url = app.globalData.url + '/action/PostTrans'                        
    api.post(url, {
      pid: this.data.postId,
      studentNumber: app.globalData.studentNumber
    }).then((res) => {
      this.setData({
        sharenum:res.data.sharenum,
      })
      nowpage.onShow()
    })
  },

  // 收藏
  star(){   
    var allpages = getCurrentPages();//获取全部页面数据
    var nowpage = allpages[allpages.length - 1];
    let url = app.globalData.url + '/action/PostStar'                        
    api.post(url, {
      pid: this.data.postId,
      studentNumber: app.globalData.studentNumber
    }).then((res) => {
      if(!res.data.empty){
        this.setData({
        starnum:res.data.starnum,
        starStatus:res.data.isStar,
        })
        console.log(this.data.starnum)
      }else{
        console.log(res.data)
      }
      nowpage.onShow()
    })
  },

  }
})
