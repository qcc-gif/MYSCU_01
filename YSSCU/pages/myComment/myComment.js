// pages/myComment/myComment.js
const api = require("../../api/api")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentList:[{
            postId:'1',//帖子id
        commentId:'1',
      profilePhoto:'https://img.yzcdn.cn/vant/cat.jpeg',
      name: '大',
        time:  '2000年11月14日 14:00',
        detail: "这里是我发的评论",
        thumbnum: '1'
        }],
        isEmpty:true

    },
    onShow: function () {
            let url = app.globalData.url+'/mine/myComment'
        // 请求我的评论列表
        api.post(url, {  
            stuNum: wx.getStorageSync('studentNumber')
        }).then((res) => {
           //展示我的评论列表
           console.log(res)
         if(!res.data.empty){
          for (var chr of res.data.commentList) {
            if(chr.profilePhoto==null){
              chr.profilePhoto = chr.profilePhoto
            }
            else{
              chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
            }
          }
          this.setData({
            commentList:res.data.commentList,
              isEmpty:false
         })
        }else{                                 
          this.setData({
              isEmpty:true
         })      
        }
          
        })
    },
    
})