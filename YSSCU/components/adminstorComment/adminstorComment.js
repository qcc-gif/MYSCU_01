// components/adminstorComment/adminstorComment.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        postId:{
            type: String,
            value: '1'
          },//帖子id
          commentId:{
            type: String,
            value: '1'
          },
        profilePhoto:{
            type:String,
            value: 'https://img.yzcdn.cn/vant/cat.jpeg'
        },
        studentNumber:{
          type: String,
          value: '20191414'
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
            type: String,
            value: '1'
          },
          thumbStatus:{//点赞状态
            type:Boolean,
            value:'true'
          },

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
        delete(){
            this.setData({
                isDelete:true
              })
            console.log(this.data.isDelete,this.data.postId)
            // let url = app.globalData.url + ''
            //         api.post(url, {
            //           "openid": app.globalData.openid,
            //           'postId':this.data.postId,
            //           'commentId':this.data.commentId,
            //           'isDelete':this.data.isDelete
            //         }).then((res) => {
            //           if(res.data.success){
            //              console.log(this.data.isDelete)
            //           }
            //         })
        },
        thumb(){//点赞
          return this.updatePostData('thumb');
          this.setData({
            thumbnum:thumbnum,
            thumbStatus:thumbStatus
          })
        },
        updatePostData(category){
          switch(category){
              case 'thumb':
                //处理点赞
                if(!thumbStatus){
                  //如果当前状态是未点赞
                  thumbnum++;
                  thumbStatus = true;
                }else{
                  //如果当前状态是已点赞
                  thumbnum--;
                  thumbStatus = false;
                }
                break;
              default:break;
        
          }
        },
    }
})
