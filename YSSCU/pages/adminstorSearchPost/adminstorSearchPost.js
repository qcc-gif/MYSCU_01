// pages/adminstorSearchPost/adminstorSearchPost.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        searchValue:'',                                         // 搜索内容
        searchResultList:[{                                     // 搜索结果列表
            pid: '1',                                           // 帖子id
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',       // 头像
            nickNmae: '大白',                                   // 发帖者微信名
            title:'标题',                                       // 帖子标题
            position1: '',                                      // 失物招领或表白
            position2:'',                                       // 地点
            time:  '2021-11-30 14:00',                          // 发布时间
            detail: "这里是我发的帖子",                          // 帖子内容
            thumbnum: 0,                                        // 点赞数
            chatnum: 0,                                         // 评论数
            sharenum: 0,                                        // 分享数
            starnum: 0,                                         // 收藏数
        }],
        noneview: null,            // 有无搜索结果: true无搜索结果 false有搜索结果
        empty: true,
    },

    onLoad: function () {
        this.setData({
            empty: true
        })
    },

    onShow: function () {
        this.setData({
            noneview: null,
            empty:true
        })
        this.onSearch()
    },

    // 搜索
    onSearch: function(){
        console.log('onSearch')
        let url = app.globalData.url + '/search/searchKey'
        api.post(url, {
            key: this.data.searchValue
        }).then((res) => {
            this.setData({
                empty: false
            })
            if(!res.data.empty){  // 查找到
                this.setData({
                    noneview: false,
                    searchResultList: res.data.postList,
                })
            }else{
                this.setData({  // 未查找到
                    noneview: true
                })
            }
        })
    },

})