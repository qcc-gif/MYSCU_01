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
    // 管理员删除全文
    delete(){
      var allpages = getCurrentPages();     // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1];    // 获取页面，包括数据和方法
      console.log(this.data.postId)
      let url = app.globalData.url + '/action/PCDrop'             // 删除帖子
      api.post(url, {
        pid:this.data.postId,
        poc:1
      }).then((res) => {
        console.log("delete",res)
        if(res.data.success){                           // 返回一个状态，是否删除成功
          console.log(res.data)
          wx.showToast({
            title: '删除成功',
            icon:'none'
         })
         nowpage.onShow()
       }else{
        wx.showToast({
          title: '出错啦！',
          icon:'error'
        })
      }
    }).catch((err)=>{
      console.log(err)
      wx.showToast({
        title: '删除异常！',
        icon: 'error'
      })
    })
  },
}
})
