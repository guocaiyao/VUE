import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';

Vue.use(VueRouter);

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

new Vue({
    el:'#app',
    router:router,
    render: h => {
        return h(App)
    }
});
