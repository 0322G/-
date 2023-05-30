<template>
    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 首页 </span>
        </template>
    </el-page-header>

    <!-- 登录信息框 -->
    <el-card class="box-card">
        <el-row>
            <el-col :span="4">
                <el-avatar :size="100" :src="avatarUrl" />
            </el-col>
            <el-col :span="20" class="el-col">
                <h3>欢迎 {{ store.state.userInfo.name }} 回来, {{ welcomeText }}</h3>
            </el-col>
        </el-row>
    </el-card>

    <!-- 其他内容框 -->
    <el-card class="box-card">
        <template #header>
            <span>其他内容</span>
        </template>
        <span>空</span>
    </el-card>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

// 引入头像路径
const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
//登录提示语
const welcomeText = computed(() => {
    const hours = new Date().getHours()
    if (hours < 8) {
        return "早上好!"
    } else if (hours < 11) {
        return "上午好!"
    } else if (hours < 13) {
        return "中午好!"
    } else if (hours < 18) {
        return "下午好!"
    } else if (hours < 22) {
        return "晚上好!"
    } else {
        return "早点睡觉吧!"
    }
})
</script>

<style lang="scss" scoped>
.box-card {
    width: 90%;
    margin: 50px auto 0px;
    background-color: rgb(240, 240, 240);
}

::v-deep .el-avatar {
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
}

.el-col {
    display: flex;
    align-items: center;
}
</style>