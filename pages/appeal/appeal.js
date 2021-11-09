// pages/appeal/appeal.js
Page({
  data: {
    reason: "reason1",
    columns: ['reason1', 'reason2', 'reason3', 'reason4'],
    phone: "",
    detail: "",
    showpopup: false,
  },
  onChange(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      reason: value
    })
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({
      reason: value,
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
  showPicker: function () {
    console.log(12)
    this.setData({
      showpopup: true
    });
  },
})