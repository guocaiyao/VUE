// 路由的页面配置放在router.js中单独维护
const routers = [
    {
        path: '/list',
        meta: {
            title: '商品列表'
        },
        component: (resolve) => require(['./views/list.vue'], resolve)
    },
    {
        path: '/product/:id',
        meta: {
            title: '商品详情'
        },
        component: (resolve) => require(['./views/product.vue'], resolve)
    },
    {
        path: '/cart',
        meta: {
            title: '购物车'
        },
        component: (resolve) => require(['./views/cart.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/list'
    }
];
export default routers;
