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
        }],
        isEmpty:true                        // 请求申诉结果是否为空
    },
   
    onShow: function () {
        wx.showLoading({
            title: 'Loading...',
          })
        // 请求申诉列表
        let url = app.globalData.url+'/admin/accountManage'  
        api.post(url, {  
            
        }).then((res) => {
            wx.hideLoading()
            if(!res.data.empty){
                this.setData({
                    complaintList:res.data.complaintList,
                    isEmpty:false
               })
              }else{                                 
                this.setData({
                    isEmpty:true
               })      
              }
        }).catch((err) => {
            console.log('err', err)
            wx.showToast({
              title: '出错啦！',
              icon: 'error',
            })
        })

    },

    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        
        setTimeout(function () {
        this.onShow();
        wx.hideNavigationBarLoading() //完成停止加载
    
        wx.stopPullDownRefresh() //停止下拉刷新
        
        }, 1000);
    },

   
})