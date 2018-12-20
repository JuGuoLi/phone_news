<template>
  <div class="app-swipe">
     <mt-swipe :auto="3000">
       <mt-swipe-item v-for="item in list" :key="item.id">
          <img  :src="item.img_url"/>
       </mt-swipe-item>
     </mt-swipe>
  </div>
</template>

<script>
  import {swipe} from 'mint-ui'
  export default{
    data(){
      return {

      }
    },
    props:['list']
  }
</script>

<style>
  .app-swipe .mint-swipe{
   height:200px;
 }
  .app-swipe .mint-swipe img{
   width:100%;
 }
</style>
