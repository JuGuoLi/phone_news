<template>
  <div class="app-search">
    <div class="mui-card">
				<div class="mui-card-header">
          <input type="text" name='keyword' value='' v-model='keyword' placeholder="关键字">
        </div>
        <div class="mui-card-header">
          <mt-button size='large' type='primary' @click='handleSearch'>搜索</mt-button>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
					  <ul class="mui-table-view">
              <li class="mui-table-view-cell mui-media" v-for='item in list' :key='item.lid'>
                <a href="javascript:;">
                  <div class="mui-media-body">
                    商品名称：{{item.lname}}
                    <p class='mui-ellipsis'>商品价格：¥{{item.price}}</p>
                  </div>
                </a>
              </li>
            </ul>
					</div>
				</div>
				<div class="mui-card-footer">页脚</div>
			</div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data(){
    return{
      keyword:'',
      list:[]
    }
  },
  methods:{
    handleSearch(){
      var keyword=this.keyword;
      var url='http://127.0.0.1:3000/search'
      if(keyword=='')
      {
        Toast('请输入关键字')
        return;
      }
      this.axios.get(url,{params:{keyword:keyword}}).then(res=>{
         if(res.data.code==1)
        this.list=res.data.msg;
        if(res.data.code==-1)
        Toast(res.data.msg)
      })
    }
  }
}
</script>

<style>

</style>
