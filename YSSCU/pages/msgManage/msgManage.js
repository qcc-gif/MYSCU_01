// pages/systempost/systempost.js
const api = require("../../api/api");
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msgList:[
            {
            name:'管理员',
            time: '2000.11.14 12:00',
            msg: '这是一条系统消息'}
        ],
        isEmpty:true

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        let url = app.globalData.url+'/message/msgManage'
    // 请求系统消息列表
    api.post(url, {  
        studentNumber:app.globalData.studentNumber
    }).then((res) => {
       //展示系统消息列表
       console.log(res)
       if(!res.data.empty){
        for (var chr of res.data.msgList) {
          chr.profilePhoto = app.globalData.url + '/' + chr.profilePhoto
        }
        this.setData({
            msgList:res.data.msgList,
            isEmpty:false
       })
      }else{  
        this.setData({
            isEmpty:true
       })      
      }
    })
    },

})