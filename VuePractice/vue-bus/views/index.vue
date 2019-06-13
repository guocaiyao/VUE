<!--使用内置的<router-link>组件完成页面跳转-->
<template>
    <div>
        <h1>首页</h1>
        {{count}}
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>
        <button @click="handleIncrementMore">+5</button>
        <div>{{list}}</div>
        <div>{{listCount}}</div>
        <button @click="handleActionIncrement">action+1</button>
        <button @click="handleAsyncIncrement">async +1</button>
        <br>
        <br>
        随机增加
        <Counter :number="number"></Counter>
        <br>
        <br>
        点击发送请求：
        <button @click="sendAjax"></button>
    </div>
</template>

<script>
    import Counter from "./counter.vue";

    export default {
        components: {Counter},
        computed:{
            count(){
                return this.$store.state.count;
            },
            list(){
                return this.$store.getters.filteredList;
            },
            listCount(){
                return this.$store.getters.listCount;
            }
        },
        //组件负责提交一个事件名，Vuex对应的mutations来完成业务逻辑
        methods:{
            handleIncrement (){
                this.$store.commit('increment');
            },
            handleDecrease (){
                this.$store.commit('decrease');
            },
            handleIncrementMore () {
                this.$store.commit('increment', 5);
            },
            handleActionIncrement (){
                this.$store.dispatch('increment')
            },
            handleAsyncIncrement (){
                this.$store.dispatch('asyncIncrement').then(() => {
                    console.log(this.$store.state.count);
                });
            },
            handleAddRandom (num){
                this.number+=num;
            },
            sendAjax(){
                var options={};
                options.url="note.txt";
                var data=options.data={};//data中可以写入参数
                options.type='get';
                options.success=(message) => {
                    console.log(message);
                };
                this.$ajax.ajax(options);
            }
        },
        data (){
            return{
                number:0
            }
        },
        created() {
            this.$bus.on('add',this.handleAddRandom);
        },
        beforeDestroy() {
            this.$bus.off('add',this.handleAddRandom);
        }
    }
</script>

