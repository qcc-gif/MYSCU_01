Page({
  data: {
    active: 0,
    pos: [['一教', '二基楼', '文科楼', '综合楼', '一基楼'],
    ['12', '23', '34', '435', '56'],
    ['45', '34', '234', '23', '121'],
    ['231', '12312', '文科12312楼', '21', '12','1212','1212','1212']],
    label: ['失物招领','表白']
  },
  onChangeTab: function () {

  },
  choosePos: function(e){
    console.log(e.currentTarget.dataset)
  },
  chooseLabel:function(e){
    console.log(e.currentTarget.dataset)
  }
})