const { get } = require("../../api/api")
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
    msg: "",
    openid: "",
    pos_i: -1,
    pos_j: -1,
    otherJ: -1
  },

  onLoad: function(){
    this.setData({

    })
    let url = app.globalData.openid
    api.post(url, {
      "openid": this.data.openid
    })
  },

  onChangeTab: function () {
    
  },
  choosePos: function(e){
    console.log(e.currentTarget.dataset)
    this.setData({
      pos_i: Number(e.currentTarget.dataset.i),
      pos_j: e.currentTarget.dataset.j,
    })
  },
  chooseLabel:function(e){
    console.log(e.currentTarget.dataset)
    this.setData({
      otherJ: e.currentTarget.dataset.j
    })
  }
})