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
        report(){     
          var poc = 0;                                   // 举报
            wx.navigateTo({
              url: '/pages/report/report?postId='+this.data.postId+'&poc='+poc,
            })
        },
        onShow(num,status) {
          this.setData({
            thumbnum:num,
            thumbStatus: status

          })
        },
        thumb(){                                         // 点赞
            let url = app.globalData.url + '/action/Thumb'
              api.post(url, {
                pid:this.data.postId,
                studentNumber:app.globalData.studentNumber,
                poc:1
              }).then((res) => {
                if(!res.data.empty){
                    this.setData({
                      thumbnum:res.data.thumbnum,
                      thumbStatus: res.data.isThumb
                    })
                  this.onShow(this.data.thumbnum,this.data.thumbStatus)
                    console.log("Thumb:",this.data.thumbStatus,this.data.thumbnum)
                }else{
                  console.log(res.data)
                }
              })
        },
        chat(){                                                    // 评论
           wx.navigateTo({
             url: '/pages/addComment/addComment?postId='+this.data.postId,
           })
        },
         /**
* 用户点击右上角分享（index.js）
*/
 onShareAppMessage: function (ops) {
  if (ops.from === 'button') {                               // 来自页面内转发按钮
    console.log(ops.target)
                    
  }
  return {
    title: '云上川大小程序',
    path: 'pages/fullText/fullText?id=123&age=18',           // 路径，传递参数到指定页面。
    imageUrl:'',                                             // 分享的封面图
    success: function (res) {                                // 转发成功
      console.log("转发成功:" + JSON.stringify(res));
    },
    fail: function (res) {                                   // 转发失败
      console.log("转发失败:" + JSON.stringify(res));
    }
  }

},
share(){
  let url = app.globalData.url + '/action/PostTrans'                        
              api.post(url, {
                pid:this.data.postId,
                studentNumber:app.globalData.studentNumber
              }).then((res) => {
                    this.setData({
                      sharenum:res.data.sharenum,
                    })
              })
},
        star(){                                                  
            let url = app.globalData.url + '/action/PostStar'                        
              api.post(url, {
                pid:this.data.postId,
                studentNumber:app.globalData.studentNumber
              }).then((res) => {
                if(!res.data.empty){
                    this.setData({
                      starnum:res.data.starnum,
                      starStatus:res.data.isStar,
                    })
                    console.log(this.data.starnum)
                }
                else{
                  console.log(res.data)
                }
              })
        },
       

    }
})
