<!--跳转页面在js中进行，使用router实例的方法，通过点击事件跳转-->
<template>
    <div>
        <h1>介绍页</h1>
        <button @click="handleRouter">跳转到 user</button>
    </div>
</template>

<script>
    export default {
        methods:{
            handleRouter(){
                this.$router.push('/user/123');
            }
        }
    }
</script>
