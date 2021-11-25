// pages/adminstorPost/adminstorPost.js
Page({
    data: {
      active: 0,
      searchvalue: "", // 搜索栏的值
      showpopup: false,
      position: "全部",
      columns: ['全部', '教学区', '餐厅区', '运动区','宿舍区','失物招领','表白'],
      postList:[{
        postId: '1',//帖子id
        profilePhoto: 'https://img.yzcdn.cn/vant/cat.jpeg',//头像
        name: '大白',
        studentNumber:'2019',
        title:'标题',
          position1: '教学楼',
          position2:'一教',
          time:  '2000年11月14日 14:00',
          detail: "这里是我发的帖子",
          thumbnum:'2',
          chatnum: '2',
          sharenum: '2',
          starnum: '2'
      }]
    },
    onLoad: function () {
       
    
        },
        searchResult:function(keyWord) {
            // let url="url?keyWord="+keyWord;
             // api.post(url, {  
                
         // }).then((res) => {
         //    //展示搜索结果
         //   this.setData({
         //    searchResultList：res.data
         //   })
         // })
     
     
         },
         selectClick:function (e) {
             console.log(e.detail.title);
             var keyWord=e.detail.title;
             this.searchResult(keyword);

         },
    onChangeTab: function () {
  
    },
    onSearch: function () {
        var keyWord=this.data.searchvalue;
        this.searchResult(keyWord)
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
      console.log(event.detail.value)
      this.setData({
        position: value,
        showpopup: false
      })
      var keyword=event.detail.value;
      this.searchResult(keyword);

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