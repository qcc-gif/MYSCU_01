// pages/mypost/mypost.js
const api = require("../../api/api")
const app = getApp();
Page({
  data: {
    postList:[{
      studentNumber: "",
      postId: '1',//帖子id
      profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',//头像
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
    }]
  },
    onShow: function (){
           let url = app.globalData.url+'/mine/mypost'
      // 请求我的历史发布帖子列表
      api.post(url, {  
        stuNum: wx.getStorageSync('studentNumber')
      }).then((res) => {
        console.log('res', res)
        //展示我的历史发布帖子列表
        this.setData({
        postList:res.data.postList
        })
      })
    }
  
})