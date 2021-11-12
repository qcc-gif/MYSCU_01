const app = getApp();

// import Toast from "./../../miniprogram_npm/@vant/weapp/toast/toast"
// import Dialog from "./../../miniprogram_npm/@vant/weapp/dialog/dialog"
import api from "./../../api/api"

Page({
  data: {
    openid: "",
    account: "", // 学号
    password: "",
    agree: false,
    url: "http://127.0.0.1:3000",
    isFollow: false
  },

  onLoad(options) {
    // let that = this
    // app.getopenid().then(function(res){
    //   console.log("res",res)
    //   that.setData({
    //     openid: res.data.openid
    //   })
    //   console.log(that.data)
    //   app.globalData.openid = res.data.openid
    //   app.globalData.session_key = res.data.session_key
    // if(1){
    //   wx.redirectTo({
    //     url: './../mine/mine',
    //   });  
    // }
    // })
  },

  onShow: function () {
    wx.hideHomeButton({
    })
  },

  showDetailText: function () {
    Dialog.alert({
      title: '用户协议',
      message: '一、《用户协议》条款的接受\n请您认真阅读本协议，尤其是免除或者限制本平台责任的条款及其它限制您权利的条款，一旦您注册即表示您已经阅读并且同意与本平台达成协议，完全理解并接受所有的《用户协议》条款。阅读本协议过程中，如果您不同意本协议或其中任何条款约定，您应立即停止注册程序。\n二、用户注册条件\n在校大学生且同意使用手机号和获取一些内容',
    }).then(() => {
      // on close
    });
  },

  // 点击登录
  register: function () {
    api.post(this.data.url + '/users/login', {
      account: this.data.account,
      pwd: this.data.password
    }).then((res) => {
      if (res.success) {
        console.log("验证成功")
        console.log(res)
        let path = `name=${res.adminname}&image=${res.image}`
        wx.redirectTo({
          url: './../adminstor/adminstor?'+path,
        });
      } else {
        console.log("验证失败")
      }
    }).catch((err) => {
      console.log("err", err)
    })
  },

  /* 校验是否全由13位数字组成 */
  /* 进行学号校验 */
  isStudentNo: function (str) {
    var reg = /^[0-9]{13}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
  }
})