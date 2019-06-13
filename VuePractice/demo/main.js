/**
 * 作为入口的文件
 * **/
//导入Vue框架
import Vue from 'vue';
//导入app.vue组件
import App from './app.vue';

//创建Vue根实例
new Vue({
    el:'#app',
    render:h=>{
        return h(App);
    }
});

