// components/searchUserId/searchUserId.js
const api = require("../../api/api");
const app = getApp();

Component({
  properties: {
    studentNumber: {
      type: String,
      value: '20191414'
    },
    profilePhoto: {
      type: String,
      value: 'https://img.yzcdn.cn/vant/cat.jpeg'
    },
    name: {
      type: String,
      value: '大白'
    },
    navigateId: {
      type: Number,
      value: 1
    }
  },

  data: {

  },

  methods: {
    // 点击选择用户
    chooseUser() {
      var allpages = getCurrentPages(); // 获取全部页面数据
      var nowpage = allpages[allpages.length - 1]; // 获取页面，包括数据和方法
      if (nowpage.data.navigateId == '1') {
        wx.navigateBack({
          url: '/pages/frozenAccount/frozenAccount?studentNumber=' + this.data.studentNumber + '&name=' + this.data.name + '&profilePhoto=' + this.data.profilePhoto,
        })
      } else {
        wx.navigateTo({
          url: '/pages/messageNotice/messageNotice?studentNumber=' + this.data.studentNumber + '&name=' + this.data.name + '&profilePhoto=' + this.data.profilePhoto,
        })
      }
    }
  }
})