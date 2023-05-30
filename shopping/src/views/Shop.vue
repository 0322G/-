<template>
    <div class="app" v-if="show">

        <!-- 头部 -->
        <Header></Header>

        <!-- 主要布局 -->
        <Layout></Layout>

        <!-- 最新商品 -->
        <HotGoods></HotGoods>
    </div>
</template>

<script setup>
import Header from '@/views/header/Header.vue'
import Layout from '@/views/layout/Layout.vue'
import HotGoods from '@/views/show/HotGoods.vue'
import { ref, onMounted } from 'vue';
import { useStore } from "vuex";
const store = useStore()

localStorage.setItem('isbuy', store.state.isBuy)
const show = ref(false)
show.value = true

onMounted(() => {
    window.addEventListener('storage', function (e) {
        show.value = false
        show.value = true
    });
})
</script>

<style lang="scss" scoped>
.app {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    background-color: rgb(206, 206, 206);
}
</style>