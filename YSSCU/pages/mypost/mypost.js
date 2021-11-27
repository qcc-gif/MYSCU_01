// pages/mypost/mypost.js
Page({
  data: {
    postList:[{
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
  onLoad: function () {
    //     let url = 'url'
    // // 请求我的历史发布帖子列表
    // api.post(url, {  
      
    // }).then((res) => {
    //    //展示我的历史发布帖子列表
    //   this.setData({
    //    postList：res.data
    //   })
    // })

    }
})