// components/complaint/complaint.js
const api = require("../../api/api");
const app = getApp();

Component({
  properties: {
    studentNumber:{                                 // 学号
      type: String,
      value: '20191414'
    },
    profilePhoto:{                                 // 头像
      type:String,
      value: 'https://img.yzcdn.cn/vant/cat.jpeg'
    },
    name: {                                       // 名字
      type: String,
      value: '大白'
    },
    time: {                                      // 时间
      type: String,
      value: '2000年11月14日 14:00'
    },
    atype: {                                      // 理由
      type: String,
      value: "言论过激，以后注意。"
    },
    areason: {                                   // 阐述细节
      type: String,
      value: "言论过激，以后注意。"
    },
    aphone: {                                     // 联系方式
      type: String,
      value: "言论过激，以后注意。"
    }
  },

  data: {
    isAgree: false                              // false拒绝，true同意
  },

  methods: {
    switchChange(e) {
      this.setData({
        isAgree: e.detail.value
      })
      console.log(this.data)
    },

    // 点击发送
    sendClick(){
      var allpages = getCurrentPages();//获取全部页面数据
      var nowpage = allpages[allpages.length - 1];//获取页面，包括数据和方法
      var that=this
      wx.showLoading({
        title: '正在发送...',
      });
      
      // 判断是否解冻
      if(isAgree){
        var url = app.globalData.url + ''//同意解冻
      }else{
        var url = app.globalData.url + ''//拒绝解冻
      }

      api.post(url, {
        studentNumber: this.data.studentNumber
      }).then((res) => {
        if(res.data.success){
          wx.showToast({
            title: '发送成功！',
            duration: 3000,
          })
          console.log(res.data);
          nowpage.onShow()
        }else{
          wx.showToast({
            title: '发送失败！',
            icon: 'none',
            duration: 3000,
          })
        }
      })
    },

  }
})
