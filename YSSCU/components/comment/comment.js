// components/comment/comment.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
          commentId:{
            type: Number,
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
          time: {
            type: String,
            value: '2000年11月14日 14:00'
          },
          detail: {
            type: String,
            value: "这里是我发的评论"
          },
          thumbnum:{
            type: Number,
            value: 1111
          },

    },

    /**
     * 组件的初始数据
     */
    data: {
        thumbStatus:"true"
    },
    //组件生命周期
    lifetimes:{
      attached: function() {                             // 在组件实例进入页面节点树时执行
        let url=app.globalData.url+''                    // 请求点赞状态
        api.post(url,{
          cid:this.data.commentId,
          studentNumber:app.globalData.studentNumber
        }).then((res)=>{
          if(res.data.success){
            this.setData({
              thumbStatus:''                              // false未点赞true已点赞
            })
          }
          else{
            console.log(res.data)
          }
        })
      },

    },
 
    methods: {
      thumb(){//点赞
        if(this.data.thumbStatus){
          let url = app.globalData.url + 'url'              // 取消点赞
        }else{
          let url = app.globalData.url + 'url'               // 点赞
        }
            api.post(url, {
              cid:this.postId,
              studentnumber:app.globalData.studentnumber
            }).then((res) => {
              if(res.data.success){
                  this.setData({
                    thumbStatus: res.data,
                    thumbnum:res.data
                  })
              }
            })
        // return this.updatePostData('thumb'),
        // this.setData({
        //   thumbnum:thumbnum,
        //   thumbStatus:thumbStatus
        // })
      },
      // updatePostData(category){
      //   switch(category){
      //       case 'thumb':
      //         //处理点赞
      //         if(!thumbStatus){
      //           //如果当前状态是未点赞
      //           thumbnum++;
      //           thumbStatus = true;
      //         }else{
      //           //如果当前状态是已点赞
      //           thumbnum--;
      //           thumbStatus = false;
      //         }
      //         break;
      //       default:break;
      
        // }
      // },
        report(){//举报
          wx.navigateTo({
            url: '/pages/appeal/appeal?postId'+this.data.postId+"commentId="+this.data.commentId
          })
      },
    }
})