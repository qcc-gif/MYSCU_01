// pages/adminstorFullText/adminstorFullText.js
const api = require("../../api/api")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        postList:[{
            postId: '1',                                          // 帖子id
            profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',   // 头像
            name: '大白',
            title:'标题',
            studentNumber:'2019',
              position1: '教学楼',
              position2:'一教',
              time:  '2000年11月14日 14:00',
              detail: "这里是我发的帖子",
              thumbnum:'2',
              chatnum: '2',
              sharenum: '2',
              starnum: '2'
          }],
          commentList:[{
              postId:'1',                                          // 帖子id
          commentId:'1',
        profilePhoto:'https://img.yzcdn.cn/vant/cat.jpeg',
        name: '大',
        studentNumber:'2019',
          time:  '2000年11月14日 14:00',
          detail: "这里是我发的评论",
          thumbnum: '1'
          }]
    },

    onLoad: function (options) {
        console.log(options)
        this.setData({
            pid:options.postId
        })

    },
    onShow: function () {
        console.log(options.postId)
        let url=app.globalData.url+'/full/userFullText';               // 请求帖子和评论列表
     api.post(url, {  
        pid:this.data.postId
     }).then((res) => {                                               // 展示帖子和评论列表
    if(!res.data.empty){
        for (var chr of res.data.postList) {
          chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
        }
        this.setData({
            postList:res.data.postList,                               // 获取我发送的pid的帖子
            commentList:res.data.commentList                          // 获取该帖子的评论列表
        })
      }else{                                                          // 请求失败
        wx.showLoading({
          title: '加载中',
        })      
      }
 })
    },
})