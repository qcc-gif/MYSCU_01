Component({
    properties: {
      userId:{
        type: Number,
        value: 1
      },
      studentNumber:{
        type: Number,
        value: 20191414
      },
      name: {
        type: String,
        value: '大白'
      },
      profilePhoto:{
        type:String,
        value: 'https://img.yzcdn.cn/vant/cat.jpeg'
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
      retainClick(){
           this.setData({
            isDelete:false
           })
           this.determineClick();
      },
      deleteClick(){
        this.setData({
          isDelete:true
         })
         this.determineClick();
      },
      determineClick(){
        var that=this
              wx.showLoading({
                title: '正在发送...',
              });
              if(isDelete){
                let url = app.globalData.url + 'url'//系统删除
              }else{
                let url = app.globalData.url + 'url'//保留
              }
              api.post(url, {
                openid: app.globalData.openid,
                userId:that.data.userId,
              }).then((res) => {
                if(res.data.success){
                    wx.showToast({
                        title: '发送成功！',
                    })
                    console.log(res.data);
                }
                else{
                    wx.showToast({
                        title: '发送失败！',
                    })
                }
              })
      }
  
    }
  })