// components/adminstorFullText/adminstorFullText.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId:{
            type: String,
            value: '1'
          },//帖子id
        profilePhoto:{
            type:String,
            value: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        studentNumber:{
          type: String,
          value: '20191414'
        },
        name: {
            type: String,
            value: '大白'
          },
          position1: {
            type: String,
            value: '教学楼'
          },
          position2: {
            type: String,
            value: '一教'
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
            type: String,
            value: '1'
          },
          chatnum:{
            type: String,
            value: '1'
          },
          sharenum:{
            type: String,
            value: '1'
          },
          starnum:{
            type: String,
            value: '1'
    
          }

    },

    /**
     * 组件的初始数据
     */
    data: {
        isDelete:false//falae删除，true保留
    },

    /**
     * 组件的方法列表
     */
    methods: {
        delete(){
          this.setData({
            isDelete:true
          })
          console.log(this.data.isDelete,this.data.postId)
          
            // let url = app.globalData.url + ''
            //         api.post(url, {
            //           "openid": app.globalData.openid,
            //           'postId':this.data.postId,
            //           'isDelete':this.data.isDelete
            //         }).then((res) => {
            //           if(res.data.success){
            //              console.log(this.data.isDelete)
            //           }
            //         })

        },
        thumb(){//点赞

        },
        chat(){//评论

        },
        share(){//分享

        },
        star(){//收藏

        }

    }
})
