// components/adminstorComment/adminstorComment.js
const api = require("../../api/api");
const app = getApp();

Component({
  
    properties: {                                                    
          commentId:{
            type: Number,
            value: 1
          },
        profilePhoto:{
            type:String,
            value: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        studentNumber:{
          type: String,
          value: ""
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

    data: {
    },

    methods: {
        delete(){
            console.log(this.data.isDelete,this.data.postId)
            let url = app.globalData.url + '/comment/deleteComment'          // 删除评论
                    api.post(url, {
                      cid:this.data.commentId
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
