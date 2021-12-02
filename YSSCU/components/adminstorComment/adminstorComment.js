// components/adminstorComment/adminstorComment.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId:{
            type: Number,
            value: 1
          },//帖子id
          commentId:{
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
          time: {
            type: String,
            value: '2000年11月14日 14:00'
          },
          detail: {
            type: String,
            value: "这里是我发的评论"
          },
          thumbnum:{
            type: Number,
            value: 1
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
    },

    /**
     * 组件的方法列表
     */
    methods: {
        delete(){
            console.log(this.data.isDelete,this.data.postId)
            let url = app.globalData.url + ''//删除评论
                    api.post(url, {
                      openid: app.globalData.openid,
                      pid:this.postId,
                      commentId:this.data.commentId,
                    }).then((res) => {
                      if(res.data.success){
                         console.log(res.data)
                      }
                      else{
                         wx.showToast({
                           title: '无法删除评论，请稍后再试',
                           icon:'none'
                         })
                      }
                    })
        },
    }
})
