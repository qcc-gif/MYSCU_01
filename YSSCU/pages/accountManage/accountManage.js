// pages/accountManage/accountManage.js
const api = require("../../api/api")
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        complaintList:[{id:'1',
        userId: '1',
        studentNumber: '2019',
        profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',
        name:  '大白',
          time:'2000年11月14日 14:00',
          reason:  "言论过激，以后注意。"
          }]
    },
   
    search:function(){
        var navigateId=1;
        wx.navigateTo({
        url:'/pages/searchUser/searchUser?navigateId='+navigateId
      });
},
   

    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        let url = app.globalData.url+'url'//请求申诉列表
    
    api.post(url, {  
        openid: wx.getStorageInfoSync('openid')
    }).then((res) => {
       //展示申诉列表
      this.setData({
       complaintList:res.data
      })
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