<!--src/components/tabbar/Home.Vue;-->
<template>
   <div class="app-home">
     <!--1:顶部导航栏-->

     <!--2:轮播图-->
     <mt-swipe :auto="3000">
       <mt-swipe-item v-for="item in list" :key="item.id">
          <img  :src="item.img_url"/>
       </mt-swipe-item>
     </mt-swipe>
     <!--3:九宫格-->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to="/NewsList">
		                    <img src="../../img/menu1.png" />
		                    <div class="mui-media-body">
                        推荐</div>
                  </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                  <router-link to='/GoodsList'>
		                    <img src="../../img/menu1.png" />
		                    <div class="mui-media-body">
                        体育</div>
                        </router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu1.png" />
		                    <div class="mui-media-body">
                        社会</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu1.png" />
		                    <div class="mui-media-body">政治</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu1.png" />
		                    <div class="mui-media-body">国际</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/menu6.png" />
		                    <div class="mui-media-body">更多</div></a></li>
		        </ul> 
     <!--4:tabbar-->
   </div>
</template>
<script>
   export default {
      created(){
        this.getImages();
      },
      methods:{
        getImages(){
          //11:03
          this.$http.get("imagelist").then(result=>{
            //console.log(result.body);
            this.list = result.body;
          })
        }
      },
      data(){
        return {
          list:[]
        }
      }
   }
</script>
<style>
 .app-home .mint-swipe{
   height:200px;
 }
 .app-home .mint-swipe img{
   width:100%;
 }
 /*九宫图片中大小*/
 .app-home .mui-grid-view.mui-grid-9 img{
     width:60px;
     height:60px;
 }
 /*九宫格区域背景变为白色*/
 .app-home .mui-grid-view.mui-grid-9{
   background-color:#fff;
 }
 .app-home .mui-grid-view.mui-grid-9 li{
   border:0;
 }
</style>
