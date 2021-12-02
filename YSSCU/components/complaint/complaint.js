// components/complaint/complaint.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      studentNumber:{
        type: Number,
        value: 20191414
      },
        userId:{
            type:Number,
            value: 1
        },
        profilePhoto:{
            type:String,
            value: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        name: {
            type: String,
            value: '大白'
          },
          time: {
            type: String,
            value: '2000年11月14日 14:00'
          },
          reason: {
            type: String,
            value: "言论过激，以后注意。"
          }

    },

    /**
     * 组件的初始数据
     */
    data: {
        isAgree:''//false拒绝，true同意

    },

    /**
     * 组件的方法列表
     */
    methods: {
        switchChange(e) {
            var sw = e.detail.value
            this.setData({
             isAgree:sw
            })
            console.log(this.data)
          },
          sendClick(){
            var that=this
              wx.showLoading({
                title: '正在发送...',
              });
              if(isAgree){
                let url = app.globalData.url + ''//同意
              }else{
                let url = app.globalData.url + ''//拒绝
              }
              api.post(url, {
                "openid": app.globalData.openid,
                'userId':that.data.userId,
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
            },


    }
})
