// pages/searchUser/searchUser.js
const api = require("../../api/api");
const app = getApp();

Page({
    data: {
        searchValue: '',                        // 搜索的学号
        searchResultList:[{
            simgurl: '',                        // 头像
            name: '',                           // 昵称
        }],
        noneview: null,                 // 有无搜索结果: true无搜索结果 false有搜索结果
        empty: true,
        navigateId: "-1",
    },

    onLoad: function(e){
        this.setData({
            navigateId: e.navigateId
        })
        console.log('navigateId', this.data.navigateId)
    },

    onShow: function () {

    },

    // 点击搜索
    onSearch: function(){
        wx.showLoading({
            title: 'Loading...',
          })
        console.log('onSearch')
        console.log('searchValue', this.data.searchValue)
        let url = app.globalData.url + '/search/searchUsers'
        api.post(url, {
            stuNum: this.data.searchValue,
        }).then((res) => {
            wx.hideLoading()
            this.setData({
                empty: true
            })
            if(!res.data.empty){  // 查找到
                this.setData({
                    noneview: false,
                    searchResultList: res.data.userList,
                })
                console.log('serach res:', this.data.searchResultList)
            }else{
                this.setData({  // 未查找到
                    noneview: true
                })
            }
        })
    },

})