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
    studentNumber:{
      type: Number,
      value: 20191414
    },
    name: {
        type: String,
        value: '大白'
      },
      position1: {
        type: String,
        value: '一教'
      },
      position2: {
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
    },
    
    data: {
      thumbStatus:'',                                // 点赞状态
      starStatus:''                                  // 收藏状态
    },
    lifetimes:{
      attached: function() {                         // 在组件实例进入页面节点树时执行
        let url=app.globalData.url+'url'             // 请求点赞状态和收藏状态
        api.post(url,{
          pid:this.data.postId,
          studentNumber: app.globalData.studentNumber
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
    methods: {
      fullDetails(){                                          // 跳转帖子详情
        wx.navigateTo({
          url: '/pages/fullText/fullText?postId='+this.postId,
        })
      },
     
    }
  })