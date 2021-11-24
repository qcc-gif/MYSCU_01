// components/adminstorPost/adminstorPost.js
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
        name: {
            type: String,
            value: '大白'
          },
          position: {
            type: String,
            value: '教学楼 一教'
          },
          time: {
            type: String,
            value: '2000年11月14日 14:00'
          },
          detail: {
            type: String,
            value: "这里是我发的帖子"
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
            // let url = app.globalData.url + ''
            //         api.post(url, {
            //           "openid": app.globalData.openid,
            //           'postId':this.data.userId,
            //           'isDelete':this.data.isDelete
            //         }).then((res) => {
            //           if(res.data.success){
            //              console.log(this.data.isDelete)
            //           }
            //         })

        }

    }
})
