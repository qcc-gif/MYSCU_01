// pages/searchUser/searchUser.js
Page({
    data: {
        studentNumber:'',                       // 搜索内容
        searchResultList:[{
            simgurl: '',                        // 头像
            name: '',                           // 昵称
        }],
        noneview: null,                         // 有无搜索结果: true无搜索结果 false有搜索结果
    },

    onShow: function () {
       
    },

    // 点击搜索
    onSearch: function(){
        console.log('onSearch')
        let url = app.globalData.url + '/search/searchUser'
        api.post(url, {
            stuNum: this.data.studentNumber,
        }).then((res) => {
            if(!res.data.empty){  // 查找到
                this.setData({
                    noneview: false,
                    searchResultList: res.data.complaintList,
                })
            }else{
                this.setData({  // 未查找到
                    noneview: true
                })
            }
        })
    },

    // 某个账号被选中
    onChosen: function(){
       wx.showLoading({
         title: 'Loading...',
       }).then((res) => {
           wx.navigateTo({
             url: `/pages/messageNotice/messageNotice?studentNumber=${this.data.studentNumber}`,
           })
       })
    },

})