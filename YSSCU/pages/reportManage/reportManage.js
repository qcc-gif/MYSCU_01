// pages/reportManage/reportManage.js
const api = require("../../api/api")
const app = getApp();
Page({
  data: {
    navTab: ["帖子", "评论"],  // 顶部导航栏的内容
    currentNavtab: '',         // 目前的下标（0是帖子，1是评论）
    postList:[{postId:'1',
      name: '大',
      studentNumber:'2019',
      profilePhoto:'https://img.yzcdn.cn/vant/cat.jpeg',
      position:'教学楼 一教',
      time: '2000年11月14日 14:00',
      detail: "这里是我发的帖子",
      reason:"不实信息"
      }
    ],
    commentList:[{postId:'1',
      name: '大',
      studentNumber:'2019',
      profilePhoto:'https://img.yzcdn.cn/vant/cat.jpeg',
      position:'教学楼 一教',
      time: '2000年11月14日 14:00',
      detail: "这里是我发的帖子",
      reason:"不实信息"
      }
    ]

  },
   // 切换顶部导航栏
   switchTab: function(e){
     console.log(e)
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.onShow(this.data.currentNavtab);
   },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
     format (shijian) {
      let date = new Date(shijian)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var minute = date.getMinutes()
      minute = minute < 10 ? ('0' + minute) : minute
      var second = date.getSeconds()
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },
  
    onShow: function (currentNavtab) {
      wx.showLoading({
        title: 'Loading...',
      })
         
          let url = app.globalData.url+'/admin/reportManage'
        // 请求举报帖子列表
        api.post(url, {  
          
        }).then((res) => {
          wx.hideLoading()
          if(!res.data.empty){
            for (var chr of res.data.postList) {
              chr.ptime=this.format(chr.ptime)
            }
            for (var chr of res.data.comList) {
              chr.ctime=this.format(chr.ctime)
              console.log("comcid",chr.cid)
              if(chr.cimgurl==null){
                chr.cimgurl = chr.cimgurl
              }
              else{
                chr.cimgurl = app.globalData.url + '/' + chr.cimgurl
              }
              console.log(chr.cimgurl)
            }
          
            console.log('postList:', res.data.postList);
            this.setData({
              postList: res.data.postList,
            commentList:res.data.comList,
              isEmpty:false
           })
           console.log('commentList', this.data.commentList)
           }else{                                       // 请求结果为空列表
            this.setData({
              isEmpty:true
           })
          }
          //展示举报列表
        })
     
    },
})