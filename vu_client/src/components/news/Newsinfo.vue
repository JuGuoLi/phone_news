<template>
  <div class="app-newsinfo">
    <h3></h3>
    <h3>{{info.title}}</h3>
    <textarea name="" id="" cols="30" rows="10">
      {{info.content}}
    </textarea>
    <h3>{{info.ctime|datetimedFilter}}</h3>
    <h3>点击{{info.point}}次数</h3>
    <!-- 新闻评论子组件 -->
    <comment-box :id='id'></comment-box>
  </div>
</template>

<script>
  import comment from '../sub/comment.vue'
  export default {
    created(){
    this.getNewsInfo();
    }
    ,
    data(){
      return {
        id:this.$route.query.id,
        info:{}
      }
    },
    methods:{
      getNewsInfo(){
        var id=this.$route.query.id;
        this.$http.get('NewsInfo?id='+id).then(
          result=>{
            this.info=result.body.data[0];
          }
        )
      }
    },
    components:{//注册子组件
      'comment-box':comment
    }
  }
</script>

<style>

</style>
