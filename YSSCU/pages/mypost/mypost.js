// pages/mypost/mypost.js
const api = require("../../api/api")
const app = getApp();

Page({
  data: {
    postList:[{
      studentNumber: "",
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
    isEmpty:true,

  },
    onShow: function (){
      wx.showLoading({
        title: 'Loading...',
      })
      let url = app.globalData.url+'/mine/mypost'
      // 请求我的历史发布帖子列表
      api.post(url, {  
        stuNum: app.globalData.studentNumber
      }).then((res) => {
        wx.hideLoading()
        console.log('res', res)
        //展示我的历史发布帖子列表
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
    }
  
})