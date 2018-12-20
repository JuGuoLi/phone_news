<template>
  <div class="app-comment">
    <h3>评论子组件{{id}}</h3>
    <!-- 发表评论区域 -->
      <textarea placeholder="请输入内容，不超过120字" maxlength="120" v-model='msg'></textarea>
      <mt-button size='large' @click='postComment'>发表评论</mt-button>
    <!-- 显示评论区域 -->
      <div class='cmt-list'>
        <div class="cmt-info" v-for='(item,i) in list' :key='item.id'>
          <div class="cmt-item">
            第{{i+1}}楼：用户名：{{item.user_name}}
            发表时间：{{item.ctime|datetimedFilter}}
            <div class='cmt-body'>
              {{item.content}}
            </div>
          </div>
        </div>
      </div>
      <mt-button type='primary' size='large' @click='getMore'>加载更多</mt-button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    created(){
      this.getMore()
    },
    methods:{
      getMore(){
        this.pno++;
       var hasMore=this.pno<=this.pageCount;
       //if(!hasMore) {return}    或者执行下面操作
       if(hasMore){
         var url='getcomment?pno='+this.pno+'&pageSize='+this.pageSize+'&nid='+this.id;
       this.$http.get(url).then(function(result){
         this.uname=result.body.name;
        //  this.list=result.body.data;
        var rows=this.list.concat(result.body.data);
        this.list=rows;
        this.pageCount=result.body.pageCount;
       })}
      },
      postComment(){
        if(this.uname){
          var msg=this.msg;
          var nid=this.id;
          var size=msg.trim().length;
          if(size==0){
            Toast('评论内容不能为空');
            return;
          }
          var url='http://127.0.0.1:3000/addComment';
          var param=`nid=${nid}&content=${msg}`
          this.axios.post(url,param).then(result=>{
            if(result.data.code==1){
              Toast('评论成功');
              this.pno=0;
              this.list=[];
              this.getMore();
            }else
            Toast('评论失败')
          })
        }else{
          this.$router.push('/Login')
        }
      }   
    },
    data(){
      return {    
        list:[],
        pno:0,
        pageCount:1,
        pageSize:7,
        msg:'',
        uname:''
      }
    },
    props:['id'],

  }
</script>

<style>
  .app-comment h3{
    font-size:18px;/*标题*/
  }
  .app-comment textarea{/*评论组件多行文本框*/
    font-size:14px;
    height:68px;
    margin:0;   
  }
  .app-comment .cmt-list{/*显示评论列表*/
    margin:5px 0;
  }
  .app-comment .cmt-list .cmt-item{/*评论项*/
    border:1px solid #aaa;
    margin-top:15px;
  }
  .app-comment .cmt-list .cmt-info{
    line-height:30px;
    background:#ccc;
  }
</style>
