<template>
    <el-aside :width="$store.state.isCollapsed ? '64px' : '170px'">
        <el-menu :collapse="$store.state.isCollapsed" :collapse-transition="false" :router="true"
            :default-active="route.fullPath">
            <el-menu-item index="/home">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-menu-item>

            <el-menu-item index="/center">
                <el-icon>
                    <Avatar />
                </el-icon>
                <span>个人中心</span>
            </el-menu-item>

            <el-menu-item index="/user">
                <el-icon>
                    <UserFilled />
                </el-icon>
                <span>用户列表</span>
            </el-menu-item>

            <el-menu-item index="/order">
                <el-icon>
                    <Grid />
                </el-icon>
                <span>订单列表</span>
            </el-menu-item>

            <el-menu-item index="/goods">
                <el-icon>
                    <Goods />
                </el-icon>
                <span>商品列表</span>
            </el-menu-item>

            <el-menu-item index="/sort">
                <el-icon>
                    <ShoppingCart />
                </el-icon>
                <span>商城管理</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { HomeFilled, Avatar, UserFilled, Grid, Goods, ShoppingCart } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';

// 默认高亮
const route = useRoute();
</script>

<style lang="scss" scoped>
.el-aside {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}
</style>