// pages/frozenAccount/frozenAccount.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        accountList:[{                                               // 用户账户信息表
            userId: '1',                                             // 用户ID
            studentNumber: '20191414',                               // 用户学号
            profilePhoto: '',                                        // 用户头像
            name:  '大白',                                           // 用户昵称
        }]
    },

    onShow: function () {
        let url = app.globalData.url + 'url'
        // 请求所有用户账号列表
        api.post(url, {  
          
        }).then((res) => {
           // 请求成功，展示用户账号列表
           if(res.data){
            this.setData({
                accountList: res.data,
            })
           }else{  // 请求失败
               wx.showLoading({
                 title: '加载中...',
               })
           }
        })
    
    },

    // 用户点击搜索，页面跳转至搜索界面
    onClickSearch: function(){
        wx.navigateTo({
          url: '/pages/searchUser/searchUser',
        })
    },

})
   

    