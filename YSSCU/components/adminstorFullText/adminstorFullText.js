// components/adminstorFullText/adminstorFullText.js
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
          type: String,
          value: '20191414'
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
            value: 1111
    
          },
          photo:{
            type:String,
            value: 'https://img.yzcdn.cn/vant/cat.jpeg'
          },
    },

    data: {
    },

    methods: {
      
        delete(){
          
          console.log(this.data.postId)
            let url = app.globalData.url + '/post/deleteComment'             // 删除帖子
                    api.post(url, {
                      pid:this.data.postId,
                      poc:1
                    }).then((res) => {
                      if(res.data.success){                                  // 返回一个状态，是否删除成功
                        console.log(res.data)
                        wx.showToast({
                         title: '删除成功',
                         icon:'none'
                       })
       
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
