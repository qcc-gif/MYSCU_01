// components/adminstorPost/adminstorPost.js
Component({
    /**
     * 组件的属性列表
     */
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
    
          }

    },

    /**
     * 组件的初始数据
     */
    data: {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        delete(){//叉删除
          console.log(this.data.isDelete,this.data.postId)
          
            let url = app.globalData.url + ''
                    api.post(url, {
                      openid: app.globalData.openid,
                      pid:this.data.postId,
                    }).then((res) => {
                      if(res.data.success){
                        console.log(res.data)
                     }
                     else(
                       wx.showToast({
                         title: '无法删除帖子，请稍后再试',
                         icon:'none'
                       })
                     )
                    })

        },
        fullDetails(){//点击帖子跳转详情
          wx.navigateTo({
            url: '/pages/adminstorFullText/adminstorFullText?postId='+this.data.postId,
          })

        }

    }
})
