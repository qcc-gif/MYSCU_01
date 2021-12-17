// pages/searchFrozen/searchFrozen.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        studentNumber: '', // 搜索内容
        accountList: [{ // 用户账户信息表
            studentNumber: '', // 用户学号
            simgurl: '', // 用户头像
            name: '大白', // 用户昵称
        }],
        noneview: null, // 有无搜索结果: true无搜索结果 false有搜索结果
        empty: true,
    },

    onLoad: function (options) {

    },

    // 点击搜索
    onSearch: function () {
        wx.showLoading({
            title: 'Loading...',
        })
        console.log('onSearch')
        let url = app.globalData.url + '/search/searchUsers'
        api.post(url, {
            stuNum: this.data.searchValue,
        }).then((res) => {
            wx.hideLoading()
            console.log('res', res, res.data.empty)
            this.setData({
                empty: false
            })
            if (!res.data.empty) { // 查找到
                this.setData({
                    noneview: false,
                    accountList: res.data.userList,
                })
                console.log('serach res:', this.data.accountList)
            } else {
                this.setData({ // 未查找到
                    noneview: true
                })
            }
        })
        // let url = app.globalData.url + '/search/searchAuser'
        // api.post(url, {
        //     studentNumber: this.data.studentNumber,
        // }).then((res) => {
        //     wx.hideLoading()
        //     if(!res.data.empty){  // 查找到
        //         this.setData({
        //             noneview: false,
        //             searchResultList: res.data.accountList,
        //         })
        //     }else{
        //         this.setData({  // 未查找到
        //             noneview: true
        //         })
        //     }
        // })
    },
})