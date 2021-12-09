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
    postId: '',
    isEmpty:true
  },

  onLoad: function (options) {
    console.log('postId', options.postId)
    this.setData({
      postId: options.postId
    })
  },

  onShow: function (){
    let url=app.globalData.url+'/full/userFullText';             // 请求帖子和评论列表
    api.post(url, { 
      studentNumber: app.globalData.studentNumber,
      pid: this.data.postId
    }).then((res) => { 
      console.log(res) ;                                         // 展示帖子和评论列表
      if(!res.data.empty){
        for (var chr of res.data.postList) {
          if(chr.profilePhoto==null){
            chr.profilePhoto = chr.profilePhoto
          }else{
            chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
          }
          for (var chr of res.data.commentList) {
            if(chr.profilePhoto==null){
              chr.profilePhoto = chr.profilePhoto
            }else{
              chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
            }
          }
        }
        console.log('postList:', res.data.postList);
        console.log('commentList:', res.data.commentList);
        this.setData({
          postList: res.data.postList,
          commentList:res.data.commentList,
          isEmpty:false
       })
       console.log('commentList', this.data.commentList)
       }else{                                       // 请求结果为空列表
        this.setData({
          isEmpty:true
       })
      }
    })
  },
    
})