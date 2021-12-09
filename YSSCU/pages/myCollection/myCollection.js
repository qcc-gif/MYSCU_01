// pages/myCollection/myCollection.js
const api = require("../../api/api")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postList:[{
            postId: '1',
            profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',
            name: '大白',
            title:'标题',
              position1: '教学楼',
              position2:'一教',
              time:  '2000年11月14日 14:00',
              detail: "这里是我发的帖子",
              thumbnum:'2',
                chatnum: '2',
                sharenum: '2',
                starnum: '2'
          }],
          isEmpty:true

    },

    onShow: function () {
            let url = app.globalData.url+'/mine/myCollection'
      // 请求我的收藏帖子列表
      api.post(url, {  
        stuNum:app.globalData.studentNumber
      }).then((res) => {
         //展示我的收藏帖子列表
         console.log(res)
         if(!res.data.empty){
          for (var chr of res.data.postList) {
            chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
          }
          this.setData({
            postList:res.data.postList,
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