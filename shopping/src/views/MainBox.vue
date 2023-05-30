<template>
    <el-container>
        <SideMenu></SideMenu>
        <el-container direction="vertical">
            <TopHeader></TopHeader>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import TopHeader from '@/components/mainbox/TopHeader.vue';
import SideMenu from '@/components/mainbox/SideMenu.vue';
</script>

<style lang="scss" scoped>
body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}
</style>