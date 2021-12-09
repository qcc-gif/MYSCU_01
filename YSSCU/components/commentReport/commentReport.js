// components/commentReport/commentReport.js
const api = require("../../api/api");
const app = getApp();

Component({
  properties: {
    commentId:{
      type: Number,
      value: 1
    },
  studentNumber:{
    type: String,
    value: '20191414'
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
    value: "这里是我发的评论"
  },
  photo:{
    type:String,
    value: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  reason:{
    type:String,
    value:"不实信息"
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
      var allpages = getCurrentPages(); // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1]; // 获取页面，包括数据和方法
      var that=this
        wx.showLoading({
          title: '正在发送...',
        });
        if(isDelete){
          let url = app.globalData.url + 'url'                       //系统删除
        }else{
          let url = app.globalData.url + 'url'                       //保留
        }
        api.post(url, {
          cid:this.data.commentId
        }).then((res) => {
          if(res.data.success){
            wx.showToast({
              title: '发送成功！',
            })
            console.log(res.data);
            nowpage.onShow()
          }else{
            wx.showToast({
            title: '发送失败！',
            })
          }
        })
    },
  }
})
