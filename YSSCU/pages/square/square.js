// pages/square/square.js
Page({
  data: {
    active: 0,
    searchvalue: "", // 搜索栏的值
    showpopup: false,
    position: "全部",
    columns: ['全部', 'reason2', 'reason3', 'reason4'],
  },
  onChangeTab: function () {

  },
  onSearch: function () {
    console.log(this.data.searchvalue)
  },
  onChangeSea: function (e) {
    this.setData({
      searchvalue: e.detail
    })
  },
  showPicker: function () {
    console.log(12)
    this.setData({
      showpopup: true
    });
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      position: value
    })
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      position: value,
      showpopup: false
    })
  },

  onCancel() {
    console.log('取消')
    this.setData({
      showpopup: false
    });
  },
  onClosePopup() {
    this.setData({
      showpopup: false
    });
  },
})