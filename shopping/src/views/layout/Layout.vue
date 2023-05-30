<template>
    <div class="layout">
        <Gs></Gs>
        <Carousel></Carousel>
        <Login></Login>
    </div>
</template>

<script setup>
import Gs from '@/views/layout/Gs.vue'
import Carousel from '@/views/layout/Carousel.vue'
import Login from '@/views/layout/Login.vue'

</script>

<style lang="scss" scoped>
.layout {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;

    display: flex;
    justify-content: space-between;
}
</style>