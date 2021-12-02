// components/searchUserId/searchUserId.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        studentNumber:{
            type: Number,
            value: 20191414
          },
            userId:{
                type:Number,
                value: 1
            },
            profilePhoto:{
                type:String,
                value: 'https://img.yzcdn.cn/vant/cat.jpeg'
            },
            name: {
                type: String,
                value: '大白'
              },
              navigateId:{
                type: Number,
                value: 1
              }
              
            
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseUser(){//点击选择用户
              if(this.data.navigateId==1){
                var result=this.studentNumber
                wx.navigateTo({
                    url: '/pages/frozenAccount/frozenAccount?result='+result,
                  })
              }
              else{
                wx.navigateTo({
                    url: '/pages/messageNotice/messageNotice?studentNumber='+this.studentNumber+'name='+this.name+'profilePhoto='+this.profilePhoto,
                  })
              }
        }

    }
})
