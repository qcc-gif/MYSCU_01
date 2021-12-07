// pages/fullText/fullText.js
const api = require("../../api/api")
const app = getApp();

Page({
  data: {
    postList:[{
      postId: '1',                 // 帖子id
      profilePhoto: '',           // 头像
      name: '',
      title:'',
      position1: '',
      position2:'',
      time:  '',
      detail: "",
      thumbnum: 0,
      chatnum: 0,
      sharenum: 0,
      starnum: 0,
    }],
    commentList:[{
      postId:'1',                                     //帖子id
      commentId:'1',
      profilePhoto:'',
      name: '',
      time:  '',
      detail: "",
      thumbnum: 0,
    }],
    postId: '1',
  },

  onLoad: function (options) {
    console.log(options.postId)
    this.setData({
      postId: options.postId
    })
  },

  onShow: function (){
    let url=app.globalData.url+'/full/userFullText';             // 请求帖子和评论列表
    api.post(url, { 
      studentNumber: app.globalData.studentNumber,
      pid: this.data.postId
    }).then((res) => {                                           // 展示帖子和评论列表
      if(!res.data.empty){
        for (var chr of res.data.postList) {
          chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
        }
        this.setData({
          postList: res.data.postList,
          commentList: res.data.commentList
       })
        }else{                                                   // 请求失败
          wx.showLoading({
            title: 'Loading...',
          })      
        }
    })
  },
    
})