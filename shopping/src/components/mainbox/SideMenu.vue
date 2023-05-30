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

            <el-sub-menu index="/sell">
                <template #title>
                    <el-icon>
                        <Handbag />
                    </el-icon>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/sell/sellgoods">
                    <el-icon>
                        <Goods />
                    </el-icon>
                    发布商品
                </el-menu-item>
                <el-menu-item index="/sell/selllist">
                    <el-icon>
                        <Grid />
                    </el-icon>
                    发售列表
                </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="/order">
                <template #title>
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>我的订单</span>
                </template>
                <el-menu-item index="/order/mybuy">
                    <el-icon>
                        <SoldOut />
                    </el-icon>
                    我的购买
                </el-menu-item>
                <el-menu-item index="/order/mysell">
                    <el-icon>
                        <Sell />
                    </el-icon>
                    我的出售
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/mycollect">
                <el-icon>
                    <ShoppingCart />
                </el-icon>
                <span>购物车</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { HomeFilled, Avatar, Document, SoldOut, Sell, ShoppingCart, Goods, Grid, Handbag } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';

// 默认高亮
const route = useRoute();
</script>

<style lang="scss" scoped>
.el-aside {
    height: 100%;

    .el-menu {
        height: 100%;
        background-color: rgb(240, 240, 240);
    }
}
</style>