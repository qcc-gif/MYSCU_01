// pages/searchUser/searchUser.js
Page({
    data: {
        searchValue:'',//搜索内容
        navigateId:'',//页面跳转传递的参数，1为frozenAccount页面跳转过来传递的参数
                      //2为messageNotice页面跳转过来传递的参数
        searchResultList:[{
            studentNumber:'20191414',
            userId:'1',
            profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',
            name: '大白'
        }],
        noneview: null,                        // 有无搜索结果: true无搜索结果 false有搜索结果
    },

    onShow: function (options) {
        this.setData({
            navigateId: options.navigateId,
        })
    },

    // 点击搜索
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