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
    isFrozen: {         // 冻结状态：false不冻结，true冻结
      type: Boolean,
      value: false
    },
    checkChange: {    // 确认管理员有没有在提交前改变用户账号状态
      type: Boolean,
      value: false
    }
  },

  data: {
    url: "",
  },

  methods: {
    // 切换冻结状态
    switchChange(e) {
      this.setData({
        isFrozen: e.detail.value,
        checkChange: true
      })
      console.log('isFrozen', this.properties.isFrozen)
      console.log('checkChange', this.properties.checkChange)
    },

    // 发送结果
    sendClick(){
      if(checkChange){  // 如果有改变账号状态
        if(this.properties.isFrozen){ // 如果需要冻结账户
          var url = app.globalData.url + ''
        }else{  // 如果需要解冻账户
          var url = app.globalData.url + ''
        }
         // 发送请求
        api.post(url, {
          "studentnumber": this.properties.studentNumber,
          'isFrozen': this.data.isFrozen,
        }).then((res) => {
          if(res.data.success){
            wx.showToast({
              title: '发送成功！',
            })
            console.log(res.data);
          }else{
            wx.showToast({
              title: '发送失败！',
              icon: 'none',
            })
          }
        })
      }else{   // 没有有改变账号状态
        wx.showToast({
          title: '无状态改变！',
          icon: 'none',
        })
      }
    },

  }
})