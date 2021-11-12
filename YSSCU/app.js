// app.js
App({
  globalData: {
    userInfo: {
      username: "",
      imgUrl: "",
    },
    host: "",
    openid: "",
  },
  getopenid: async () => {
    return new Promise(async (resolve, reject) => {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code;
          var appid = 'wx608c38127256116c'; // 微信小程序的appid
          var secret = '853f8491160ddc7e41b947831d51395b'; // 小程序secret
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
            header: {
              'content-type': 'application/json'
            },
            success: (res) => {
              resolve(res)
            },
            fail: (err) => {
              reject(err)
            }
          })
        }
      })
    })
  }
})
