// pages/frozenAccount/frozenAccount.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        accountList:[{                                               // 用户账户信息表
            studentNumber: '20191414',                               // 用户学号
            simgurl: '',                                             // 用户头像
            name:  '大白',                                           // 用户昵称
        }],
        navigateId: '1',
        studentNumber: null,
        simgurl: "",                                             
        name: "",  
        back: false,
    },

    onLoad: function(e){
      console.log('frozenAccount', e)
      this.setData({
        studentNumber: e.studentNumber,                               
        simgurl: e.profilePhoto,                                             
        name: e.name, 
      })
      console.log(this.data.studentNumber==null)
    },

    onShow: function () {
      if(this.data.studentNumber!=null){
        this.setData({
          back: true,
        })
      }
      if(this.data.back){  // 由搜索页面返回
        console.log('back')
      }else{
        wx.showLoading({
          title: 'Loading...',
        })
        let url = app.globalData.url + '/search/allUser'
        // 请求所有用户账号列表
        api.post(url, {  
           
        }).then((res) => {
          wx.hideLoading()
          // 请求成功
          this.setData({
            accountList: res.data.accountList,
          })
          for (var chr of this.data.accountList) {
            if(chr.isFrozen==null){
              chr.isFrozen = false
            }else{
              chr.isFrozen = true
            }
          }
          console.log('userList:', this.data.accountList);
        })
      }
    },

    // 用户点击搜索，页面跳转至搜索界面
    onClickSearch: function(){
        wx.navigateTo({
          url: `/pages/searchFrozen/searchFrozen?navigateId=${this.data.navigateId}`,
        })
    },

})
   

    