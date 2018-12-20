import Vue from 'vue'
import Router from 'vue-router'
//1:引入自定义组件
import Home from "./components/tabbar/Home.vue"
import NewsList from "./components/news/NewsList.vue"
import Newsinfo from './components/news/Newsinfo.vue'
import Login from './components/login/Login.vue'
import Search from './components/tabbar/Search.vue'
Vue.use(Router)
export default new Router({
  //2:为组件配置访问路径
  routes: [
    {path:'/Search',component:Search},
    {path:'/Login',component:Login},
    {path:'/Newsinfo',component:Newsinfo},
    {
      path:'/',redirect:'/Home'
    },
    {path:"/NewsList",component:NewsList},
    {path:"/Home",component:Home},
  ]
})
