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
    // 删除评论
    delete(){
      var allpages = getCurrentPages();  // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1];  // 获取页面，包括数据和方法
      console.log(this.data.isDelete,this.data.postId)
      let url = app.globalData.url + '/comment/deleteComment'     
      api.post(url, {
        cid:this.data.commentId,
        poc:0
      }).then((res) => {
        if(res.data.success){                      // 返回一个状态，是否删除成功
          console.log(res.data)
          wx.showToast({
            title: '删除成功',
            icon:'none'
          })
          nowpage.onShow()                               
        }else{
          wx.showToast({
            title: '无法删除评论，请稍后再试',
            icon:'none'
          })
        }
      })
    },
  }
})
