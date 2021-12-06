// pages/accountManage/accountManage.js
const api = require("../../api/api")
const app = getApp();

Page({
    data: {
        complaintList:[{
            studentNumber: '2019141460341',
            simgurl: '',
            name:  '大白',
            time:'2021-12-2 12:00',
            atype: "",
            areason:  "",
            aphone: "",
        }]
    },
   
    search:function(){
        wx.navigateTo({
            url: '/pages/searchAppeal/searchAppeal'
      });
},
   
    onShow: function () {
        let url = app.globalData.url+'/?'  // 请求申诉列表
        api.post(url, {  
            
        }).then((res) => {
            if(!res.data.empty){  // 展示申诉列表
                this.setData({
                    complaintList:res.data.complaintList
                })
            }
        })

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        
        setTimeout(function () {
        this.onShow();
        wx.hideNavigationBarLoading() //完成停止加载
        
        wx.stopPullDownRefresh() //停止下拉刷新
        
        }, 1000);
    },

   
})