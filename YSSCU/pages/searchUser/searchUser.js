// pages/searchUser/searchUser.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        searchValue:'',             // 搜索内容
        searchResultList:[{         // 搜索结果列表
          studentNumber:'20191414', // 学号
          userId:'1',               // 用户ID
          profilePhoto: '',         // 用户头像
          name: '大白'              // 用户昵称
        }],
        noneview: null,            // 有无搜索结果: true无搜索结果 false有搜索结果
    },

    onLoad: function (options) {

    },

    onShow: function () {
        this.setData({
            noneview: null,
        })
    },

    // 搜索
    onSearch: function(){
        console.log('onSearch')
        let url = app.globalData.url + '/'
        api.post(url, {
            key: this.data.searchValue
        }).then((res) => {
            if(res.data){  // 查找到
                this.setData({
                    noneview: false,
                    searchResultList: res.data,
                })
            }else{
                this.setData({  // 未查找到
                    noneview: true
                })
            }
        })
    },

})