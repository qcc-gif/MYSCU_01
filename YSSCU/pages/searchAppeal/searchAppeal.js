// pages/searchAppeal/searchAppeal.js
Page({
    data: {
        studentNumber:'',                       // 搜索内容
        complaintList:[{
            studentNumber: '2019141460341',
            simgurl: '',
            name:  '大白',
            time:'2021-12-2 12:00',
            atype: "",
            areason:  "",
            aphone: "",
        }],
        noneview: null,                         // 有无搜索结果: true无搜索结果 false有搜索结果
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
                    complaintList: res.data.complaintList,
                })
            }else{
                this.setData({  // 未查找到
                    noneview: true
                })
            }
        })
    },

})