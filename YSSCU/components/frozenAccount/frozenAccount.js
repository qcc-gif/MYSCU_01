// components/frozenAccount/frozenAccount.js
import api from "./../../api/api"
const app = getApp();

Component({
  properties: {
    studentNumber:{
    type: String,
    value: '20191414'
  },
  profilePhoto:{
    type:String,
    value: 'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  name: {
    type: String,
    value: '大白'
  },
  isFrozen: {                           // 冻结状态：false不冻结，true冻结
    type: Boolean,
    value: false
  },
  },

  data: {
    url: "",
  },

  lifetimes: {
    attached: function () {
      let url = app.globalData.url + '/users/frozen'
      api.post(url, {
        studentNumber: this.data.studentNumber,
      }).then((res) => {
        if(!res.data.empty){
          this.setData({
            isFrozen: res.data.isFrozen,
          })
        }
      })
    }
  },

  methods: {
    // 切换冻结状态
    switchChange(e) {
      this.setData({
        isFrozen: e.detail.value,
      })
      console.log('switchChange:', this.data.isFrozen)
    },

    // 发送结果
    sendClick(){
      var allpages = getCurrentPages();//获取全部页面数据
      var nowpage = allpages[allpages.length - 1];//获取页面，包括数据和方法
      if(true){  // 如果有改变账号状态
        console.log('component isFrozen', this.data.isFrozen)
        if(this.data.isFrozen){ // 如果需要冻结账户
          var url = app.globalData.url + '/action/freeze'
          api.post(url, {
            "studentNumber": this.data.studentNumber,
          }).then((res) => {
            if(res.data.success){
              wx.showToast({
                title: '发送成功！',
                duration: 3000,
              })
              // nowpage.onShow()
            }else{
              wx.showToast({
                title: '发送失败！',
                icon: 'error',
                duration: 3000,
              })
            }
          })
        }else{  // 如果需要解冻账户
          var url = app.globalData.url + '/action/unfreeze'
          api.post(url, {
            "studentNumber": this.data.studentNumber,
          }).then((res) => {
            if(res.data.success){
              wx.showToast({
                title: '发送成功！',
                duration: 3000,
              })
              // nowpage.onShow()
            }else{
              wx.showToast({
                title: '发送失败！',
                icon: 'error',
                duration: 3000,
              })
            }
          })
        }
      }else{   // 没有有改变账号状态
        wx.showToast({
          title: '无状态改变！',
          icon: 'error',
        })
      }
    },
    
  }
})