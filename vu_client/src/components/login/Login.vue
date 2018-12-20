<template>
  <div class="app-login">
    <div class="mui-card">
			<div class="mui-card-header"><h3>用户登录</h3></div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<!-- <form action=""> -->
              用户名：<input type="text" name='' value='' placeholder="请输入用户名" v-model='uname'>
              密码：<input type="password" value=''  placeholder="请输入密码" v-model='upwd'>
              <mt-button size='large' @click='handleLogin'>登录</mt-button>
            <!-- </form> -->
					</div>
				</div>
			<div class="mui-card-footer">页脚</div>
		</div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default{
    data(){
      return {
        uname:'',
        upwd:''
      }
    },
    methods:{
      handleLogin(){
        var uname=this.uname;
        var upwd=this.upwd;
        // var url='Login'
        // this.$http.get(url,{params:{
        //   uname:uname,upwd:upwd
        // }}).then(res=>{
        //   if(res.body.code==0)
        //     Toast('用户名或密码错误')
        //   else
        //     this.$router.push('/Home')
        // })
        //换一种方法发送请求，兼容性好一些的axios
        var url='http://127.0.0.1:3000/Login'
        this.axios.get(url,{params:{uname:uname,upwd:upwd}}).then(result=>{
          if(result.data.code==1){
            this.$router.push('/Home')
          }else{
            Toast('用户名或密码有误')
          }
        })
      }
    }
  }
</script>

<style>

</style>
