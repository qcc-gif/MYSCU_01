// components/fullText/fullText.js
const api = require("../../api/api");
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
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
            value: 'https://img.yzcdn.cn/vant/cat.jpeg'
          }
    },

    /**
     * 组件的初始数据
     */
    data: {
        thumbStatus:'',
        starStatus:'',

    },
    //组件生命周期
    lifetimes:{
      attached: function() {                           // 在组件实例进入页面节点树时执行
        let url=app.globalData.url+'url'               // 请求帖子的点赞状态和收藏状态
        api.post(url,{
          pid:this.data.postId,
          studentNumber:app.globalData.studentNumber
        }).then((res)=>{
          if(res.data.success){
            this.setData({
              thumbStatus:'',
              starStatus:''
            })
          }
          else{
            console.log(res.data)
          }
        })
      },

    },

    /**
     * 组件的方法列表
     */
    methods: {
        report(){                                        // 举报
            wx.navigateTo({
              url: '/pages/appeal/appeal?postId'+this.data.postId,
            })
        },
        thumb(){                                         // 点赞
          if(this.data.thumbStatus){                     // 取消点赞
            let url = app.globalData.url + 'url'
          }else{                                         // 点赞
            let url = app.globalData.url + 'url'
          }
            
              api.post(url, {
                pid:this.data.postId,
                studentNumber:app.globalData.studentNumber
              }).then((res) => {
                if(res.data.success){
                    this.setData({
                      thumbnum:res.data,
                      thumbStatus: res.data
                    })
                }else{
                  console.log(res.data)
                }
              })
          // return this.updatePostData('thumb'),
          // this.setData({
          //   thumbnum:thumbnum,
          //   thumbStatus:thumbStatus
          // })
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
        star(){                                                          // 收藏
          if(this.data.starStatus){
            let url = app.globalData.url + 'url'                         // 取消收藏
          }else{
            let url = app.globalData.url + 'url'                          // 收藏
          }
              api.post(url, {
                pid:this.data.postId,
                studentNumber:app.globalData.studentNumber
              }).then((res) => {
                if(res.data.success){
                    this.setData({
                      starnum:res.data,
                      starStatus:res.data,
                    })
                }
                else{
                  console.log(res.data)
                }
              })
          // return this.updatePostData('star'),
          // this.setData({
          //   starnum:starnum,
          //   starStatus:starStatus,
          // })
        },
        //更新本地的点赞、收藏[]
        // updatePostData(category){
        //   switch(category){
        //       case 'star':
        //         //处理收藏
        //         if(!starStatus){
        //           //如果当前状态是未收藏
        //           starnum++;
        //           starStatus = true;
        //         }else{
        //           //如果当前状态是已收藏
        //           starnum--;
        //           starStatus = false;
        //         }
        //         break;
        //       case 'thumb':
        //         //处理点赞
        //         if(!thumbStatus){
        //           //如果当前状态是未点赞
        //           thumbnum++;
        //           thumbStatus = true;
        //         }else{
        //           //如果当前状态是已点赞
        //           thumbnum--;
        //           thumbStatus = false;
        //         }
        //         break;
        //       default:break;
        
        //   }
        // },

    }
})
