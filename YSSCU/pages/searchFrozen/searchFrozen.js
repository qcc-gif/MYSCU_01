// pages/searchFrozen/searchFrozen.js
Page({
    data: {
        studentNumber:'',                       // 搜索内容
        accountList:[{                                               // 用户账户信息表
            studentNumber: '20191414',                               // 用户学号
            simgurl: '',                                             // 用户头像
            name:  '大白',                                           // 用户昵称
        }],
        noneview: null,                  // 有无搜索结果: true无搜索结果 false有搜索结果
    },

    onLoad: function (options) {

    },
    
    // 点击搜索
    onSearch: function(){
        wx.showLoading({
            title: 'Loading...',
          })
        console.log('onSearch')
        let url = app.globalData.url + '/?'
        api.post(url, {
            studentNumber: this.data.studentNumber,
        }).then((res) => {
            wx.hideLoading()
            if(!res.data.empty){  // 查找到
                this.setData({
                    noneview: false,
                    searchResultList: res.data.accountList,
                })
            }else{
                this.setData({  // 未查找到
                    noneview: true
                })
            }
        })
    },
})