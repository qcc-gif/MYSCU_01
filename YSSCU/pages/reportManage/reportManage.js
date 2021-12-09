// pages/reportManage/reportManage.js
const api = require("../../api/api")
const app = getApp();
Page({
  data: {
    navTab: ["帖子", "评论"],  // 顶部导航栏的内容
    currentNavtab: 0,         // 目前的下标（0是帖子，1是评论）
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
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    this.onShow(currentNavtab);
   },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (currentNavtab) {
      wx.showLoading({
        title: 'Loading...',
      })
          if(currentNavtab==0){
          let url = app.globalData.url+'/admin/reportManage'
        // 请求举报帖子列表
        api.post(url, {  
          
        }).then((res) => {
          wx.hideLoading()
          //展示举报帖子列表
          this.setData({
          //postList:res.data.accountList,
          commentList:null
          })
        })
      }
      else{
        let url = app.globalData.url+'/admin/reportManage'
        // 请求举报评论列表
        api.post(url, {  
          
        }).then((res) => {
          //展示举报评论列表
          this.setData({
          //commentList:res.data.accountList
          postList:null
          })
        })
      }
    },
})