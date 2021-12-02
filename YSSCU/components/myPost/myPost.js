Component({
    properties: {
      postId:{
        type: Number,
        value: 1
      },//帖子id
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
      position: {
        type: String,
        value: '教学楼'
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
        value: 1
      },
      
      chatnum:{
        type: Number,
        value: 1
      },
      sharenum:{
        type: Number,
        value: 1
      },
      starnum:{
        type: Number,
        value: 1

      },
    },
    data: {
      thumbStatus:'',//点赞状态
      starStatus:''//收藏状态
    },
    lifetimes:{
      attached: function() {
        // 在组件实例进入页面节点树时执行
        let url=app.globalData.url+'url'//请求点赞状态和收藏状态
        api.post(url,{
          pid:this.data.postId,
          openid: wx.getStorageInfoSync('openid')
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
      fullDetails(){//跳转帖子详情
        wx.navigateTo({
          url: '/pages/fullText/fullText?postId='+this.postId,
        })
      },
     
    }
  })