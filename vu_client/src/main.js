import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'

Vue.config.productionTip = false
//5: 设置请求的根路径 

// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'

//引入Vuex
import Vuex from 'vuex'
//注册Vuex组件
Vue.use(Vuex)
//创建Vuex实例对象
var store=new Vuex.Store({
  state:{
    cartCount:0   //购物车中商品数量
  },
  mutations:{     //修改共享数据方法
    increment(state,count){
      state.cartCount+=parseInt(count);
    },
    substract(state){
      state.cartCount--;
    },
    clear(state){
      state.cartCount=0;
    }
  },
  getters:{
    optCartCount:function(state){
      return state.cartCount;
    }
  }
})
//将Vuex对象注册Vue对象



//1:引入mint-ui Header组件
import {Header,Swipe,SwipeItem,Button} from "mint-ui"
//2:注册Header组件
Vue.component(Header.name,Header);
//3:注册Swipe/SwipeItem组件
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name,Button);

//4:引入vue-resource 库
import VueResource from "vue-resource";
//5:注册vue-resource 库
Vue.use(VueResource)
//6:配置vue-resource常见属性
//6.1:设置请求服务器根目录
Vue.http.options.root = "http://127.0.0.1:3000/";
//6.2:全局设置post 时候表单 //application/www-x-form-urlencoded
//将提交数据进行转码操作 
Vue.http.options.emulateJSON = true;
//上面这行代码的意思是在请求头上加'Text-Content':'application/www-x-urlencoded'
//6.3配置跨域访问保存session值的选项
Vue.http.options.withCredentials=true;

//引入axios库
import axios from 'axios'
//要求axios每次必须携带cookie去服务端
//跨域保存session值
axios.defaults.withCredentials=true;
//注册组件
Vue.prototype.axios=axios;


//7、创建一个日期类型的过滤器
Vue.filter('datetimedFilter',function(val){
  //7.1创建日期对象
  var date=new Date(val);
  //7.2获取年月日时分秒
  var y=date.getFullYear();
  var m=date.getMonth()+1;
  var d=date.getDate();
  var h=date.getHours();
  var min=date.getMinutes();
  var s=date.getSeconds();
  //7.3 月 日 格式的判断，07 08 09 10
    h<10&&(h='0'+h);
    m<10&&(m='0'+m);
    // if(m<10)
    // m=parseInt('0'+m);
    d<10&&(d='0'+d);
  //7.4 拼接字符串返回
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
  
})

new Vue({
  router,
  render: h => h(App),
  store,   //将Vuex对象注册 Vue实例
}).$mount('#app')
