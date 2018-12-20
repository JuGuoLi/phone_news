<template>
  <div class="app-newlist">
   <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for='(hd,index) in list' :key='hd.id'>
					<router-link :to="'/Newsinfo?id='+hd.id" >
						<img class="mui-media-object mui-pull-left" :src="hd.img_url" >
						<div class="mui-media-body" @click='addPoint(index)'>
							{{hd.title}}
							<p class='mui-ellipsis'>
                <span>{{hd.ctime|datetimedFilter}}</span>
                <span>点击：{{hd.point}}次</span>
              </p>
						</div>
					</router-link>
				</li>
     </ul>
    <mt-button type='primary' size='large' @click='getMore'>加载更多</mt-button>
  </div>  
</template>
<script>
 export default {
   data(){
     return {
       pageSize:7,
       pno:0,
       pageCount:1,
       list:[]
     }
   },
   methods:{
     addPoint(index){
       var point=this.list[index].point;
       point++;
       var url='newslist_point'
       this.$http.get(url,{params:{point:point,id:index}})
     },
     getMore(){
       this.pno++;
       var hasMore=this.pno<=this.pageCount;
       //if(!hasMore) {return}    或者执行下面操作
       if(hasMore){
         var url='newslist?pno='+this.pno+'&pageSize='+this.pageSize;
       this.$http.get(url).then(function(result){
        //  this.list=result.body.data;
        var rows=this.list.concat(result.body.data);
        this.list=rows;
        console.log(this.list)
        this.pageCount=result.body.pageCount;
       })}
     },
   },
   created(){
     this.getMore();
   }
 }
</script>
<style>
.mui-ellipsis{
  display:flex;
  font-size:12px;
  justify-content: space-between;
  color:#226aff;
}

</style>