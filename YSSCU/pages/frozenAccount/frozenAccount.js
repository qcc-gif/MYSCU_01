// pages/frozenAccount/frozenAccount.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        accountList:[{                                               // 用户账户信息表
            studentNumber: '20191414',                               // 用户学号
            simgurl: '',                                             // 用户头像
            name:  '大白',                                           // 用户昵称
        }]
    },

    onShow: function () {
        let url = app.globalData.url + '/search/requestPost'
        // 请求所有用户账号列表
        api.post(url, {  
          
        }).then((res) => {
            console.log('onshowRequest:', res)
            // 请求成功
            if(!res.data.empty){
              console.log('postList:', res.data.postList);
              this.setData({
                postList: res.data.postList,
             })
             }else{  // 请求失败
              wx.showLoading({
                title: 'Loading...',
              })      
            }
          })
    
    },

    // 用户点击搜索，页面跳转至搜索界面
    onClickSearch: function(){
        wx.navigateTo({
          url: '/pages/searchFrozen/searchFrozen',
        })
    },

})
   

    