<template>
 <div class="app-container">
    <!--1:头部-->
    <mt-header fixed title="狗哥新闻"></mt-header>
    <!--2:router-view-->
    <router-view></router-view>
    <!--3:tabbar-->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item mui-active" to='/Home'>
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to='/Search'>
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav> 
 </div>
</template>


<style>


.app-container{
     padding-top:40px;
     padding-bottom:50px;
     overflow-x:hidden;
}
</style>
