// const { get } = require("../../api/api")
const api = require("../../api/api")
const app = getApp();

Page({
  data: {
    active: 0,
    pos: [['一教', '二基楼', '文科楼', '综合楼', '一基楼'],
    ['西园 靠近食堂', '西园 远离食堂',  '东园 研究生宿舍'],
    ['一餐', '二餐', '牛肉馆', '小吃城', '美食广场','三餐'],
    ['一号场', '二号场', '体育馆', '游泳池']],
    label: ['失物招领','表白'],
    newlabel: "",
    msg: "",            // 输入的信息
    openid: "",         // 用户openid
    pos_i: -1,          // 位置选择
    pos_j: -1,          // 位置选择
    otherJ: -1,         // 标签选择
    countIndex: 1,      // 上传图片的最大数量
    imgFilePath: null,  // 上传图片的路径
  },

  onLoad: function(){
   
  },

  onChangeTab: function () {

  },

  // 选择位置
  choosePos: function(e){
    console.log('pos:', e.currentTarget.dataset)
    this.setData({
      pos_i: Number(e.currentTarget.dataset.i),
      pos_j: e.currentTarget.dataset.j,
    })
    console.log(this.data.pos[this.data.pos_i][this.data.pos_j])
  },

  // 选择标签
  chooseLabel:function(e){
    console.log('label:',e.currentTarget.dataset)
    this.setData({
      otherJ: e.currentTarget.dataset.j
    })
    console.log(this.data.label[this.data.otherJ])
  },

  // 获取输入文本
  GetMsg: function(e){
    console.log('input', e.detail.value)
    this.setData({
      msg: e.detail.value
    })
    console.log('message', this.data.msg.length)
  },

  // 图片浏览及上传
  browse: function(e){
    let that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      // itemColor: "#CED63A",
      success: function(res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album');
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera');
          }
        }
      }
    })
  },

  // 打开相册，相机
  chooseWxImage: function(type) {
    let that = this;
    wx.chooseImage({
      count: that.data.countIndex,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      // 选择图片成功，保存imgFilePath
      success: function (res) {
        that.setData({
          imgFilePath: res.tempFilePaths[0]
        })
        console.log('imgFilePath:', res.tempFilePaths[0])
      }
    })
  },

  // 点击发送
  onClickSend: function(){
    // 用户选择了地点标签
    if(this.pos_i!=-1 && this.pos_j!=-1){
      // 用户选择了其他标签？
      if(this.data.otherJ==-1){
        this.setData({
          newlabel: null
        })
      }else{
        this.setData({
          newlabel: this.data.label[this.data.otherJ]
        })
      }
      let tmp_i = this.data.pos_i
      let tmp_j = this.data.pos_j
      let openid = wx.getStorageSync('openid')
      let ppos = this.data.pos[tmp_i][tmp_j]
      let plabel = this.data.newlabel
      let ptext = this.data.msg
      // 没有图片
      if(!this.data.imgFilePath){
         // 发送标签和文本
        let url = app.globalData.url + '/post'
        console.log(this.data.pos[tmp_i][tmp_j])
        api.post(url, {
          openid: openid,
          ppos: ppos,
          plabel: plabel,
          ptext: ptext,
      }).then((res)=>{
        if(res.data.success){
          wx.showToast({
            title: '发送成功',
            icon: 'none'
          })
          wx.reLaunch({
            url: '/pages/square/square',
          })
        }else{
          wx.showToast({
            title: '发送失败',
            icon: 'none',
          })
        }
      })
      }else{
        // 发送图片 + 标签和文本
        let url = app.globalData.url + '/post/img'
        let filePath = this.data.imgFilePath
        api.upload(url, filePath, "", openid, ppos, plabel, ptext).then((res)=>{
          console.log(res)
          if(res.data.success){
            wx.showToast({
              title: '发送成功',
              icon: 'none'
            })
            wx.reLaunch({
              url: '/pages/square/square',
            })
          }else{
            wx.showToast({
              title: '发送失败',
              icon: 'none',
            })
          }
        })
      } 
    }else{   // 用户未选择地点标签
      wx.showToast({
        title: '请选择地点标签',
        icon: 'none'
      })
    }
  },

  // 点击删除
  deleteImage: function(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          that.setData({
            imgFilePath: null,
          })
        } else if (res.cancel) {
          console.log('点击取消了');
        }
      }
    })
  },

})