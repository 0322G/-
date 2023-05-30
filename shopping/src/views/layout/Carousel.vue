<template>
    <div class="carousel">
        <el-carousel height="320px">
            <el-carousel-item v-for="item in store.state.carousel" :key="item.id" @click="toGood(item)">
                <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.avatar})` }"></div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import api from '@/api/index'
const store = useStore()


// 获取轮播图信息
api.carousel().then(res => {
    store.commit("changeCarousel", res.data.data)
})


// 跳转到具体商品
const toGood = (item) => {
    window.open('http://127.0.0.1:8080/Good/' + item.id)
}

</script>

<style lang="scss" scoped>
.carousel {
    box-sizing: border-box;
    width: 45%;
    height: 320px;
}

.el-carousel--horizontal {
    border-radius: 15px;
}

.el-carousel__item .image {
    width: 100%;
    height: 320px;
    background-size: cover;
    cursor: pointer;
}
</style>