import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueBus from './vue-bus';
//导入vue-ajax插件
import VueAjax from './vue-ajax';
import App from './app.vue';

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueBus);
//使用Ajax插件
Vue.use(VueAjax);


//路由配置，创建数组制定路由匹配列表
const Routers=[
    {
        path:'/index',
        meta:{
            title:'首页'
        },
        component:(resolve) => require(['./views/index.vue'],resolve)
    },
    {
        path:'/about',
        meta:{
            title:'关于'
        },
        component:(resolve => require(['./views/about.vue'],resolve))
    },
    {
      path:'/user/:id',
      meta:{
          title:'个人主页'
      },
      component: (resolve) => require(['./views/user.vue'], resolve)
    },
    {
        path:'*',
        redirect:'/index'
    }
];
const RouterConfig={
    //使用HTML5的History路由模式
    mode:'history',
    routes:Routers
};

//修改网页的标题，在页面发生路由改变时统一设置
const  router=new VueRouter(RouterConfig);
router.beforeEach((to,from,next) => {
    window.document.title=to.meta.title;
    next();
});

//页面跳转后，滚动条返回页面顶端
router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});

const store=new Vuex.Store({
    //vuex的配置
    state:{
        count:0,
        list:[1,5,8,10,30,50]
    },
    getters:{
        filteredList:state => {
            return state.list.filter(item => item<10);
        },
        listCount:(state,getters)=>{
            return getters.filteredList.length;
        }
    },
    //通过mutations显式地提交修改store中的数据
    mutations:{
        increment (state,n=1){
            state.count+=n;
        },
        decrease (state){
            state.count--;
        }
    },
    //actions选项，实现异步操作业务逻辑
    actions:{
        increment (context){
            context.commit('increment');
        },
        asyncIncrement (context){
            return new Promise(resolve => {
                setTimeout(() => {
                    context.commit('increment');
                    resolve();
                },1000)
            });
        }
    }
});

new Vue({
    el:'#app',
    router:router,
    //使用vuex
    store:store,

    render: h => {
        return h(App)
    }
});
