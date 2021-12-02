// pages/adminstorSearchPost/adminstorSearchPost.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        searchValue:'',             // 搜索内容
        searchResultList:[{         // 搜索结果列表
            postId: '1',                                        //帖子id
            profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg', //头像
            name: '大白',                                       // 发帖者微信名
            title:'标题',                                       // 标题
              position1: '教学楼',
              position2:'一教',
              time:  '2021-11-30 14:00',
              detail: "这里是我发的帖子",
              thumbnum: 0,
              chatnum: 0,
              sharenum: 0,
              starnum: 0,
        }],
        noneview: true,            // 有无搜索结果: true无搜索结果 false有搜索结果
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
        let url = app.globalData.url + 'url'//关键字搜索帖子
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