Component({
    properties: {
      userId:{
        type: String,
        value: '1'
      },
      name: {
        type: String,
        value: '大白'
      },
      profilePhoto:{
        type:String,
        value: 'https://img.yzcdn.cn/vant/cat.jpeg'
    },
      position: {
        type: String,
        value: '教学楼 一教'
      },
      time: {
        type: String,
        value: '2000年11月14日 14:00'
      },
      detail: {
        type: String,
        value: "这里是我发的帖子"
      }
    },
    data: {
      isDelete:'true'
    },
    methods: {
      // retainClick(){
      //      this.setData({
      //       isDelete:false
      //      })
      //      this.deleteClick();
      // },
      // deleteClick(){
      //   this.setData({
      //     isDelete:true
      //    })
      //    this.deleteClick();
      // },
      // determineClick(){
      //   var that=this
      //         wx.showLoading({
      //           title: '正在发送...',
      //         });
      //         let url = app.globalData.url + ''
      //         api.post(url, {
      //           "openid": app.globalData.openid,
      //           'userId':that.data.userId,
      //           'isDelete':that.data.isDelete
      //         }).then((res) => {
      //           if(res.data.success){
      //               wx.showToast({
      //                   title: '发送成功！',
      //               })
      //               console.log(res.data);
      //           }
      //           else{
      //               wx.showToast({
      //                   title: '发送失败！',
      //               })
      //           }
      //         })
      // }
  
    }
  })