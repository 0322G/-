<template>
    <!-- 登录信息框 -->
    <el-card class="box-card1">
        <el-row>
            <el-col :span="4">
                <el-avatar :size="100" :src="avatarUrl" />
            </el-col>
            <el-col :span="20" class="el-col">
                <h3>欢迎 {{ store.state.adminInfo.name }} 回来, {{ welcomeText }}</h3>
            </el-col>
        </el-row>
    </el-card>

    <!-- 其他内容框 -->
    <el-card class="box-card2">
        <template #header>
            <span>其他内容</span>
        </template>
        <span>空</span>
    </el-card>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";
const store = useStore()

// 引入头像路径
const avatarUrl = computed(() => store.state.adminInfo.avatar ? 'http://localhost:3000' + store.state.adminInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
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
.box-card1 {
    width: 80%;
    margin: 20px auto 0px;
}

.box-card2 {
    width: 80%;
    margin: 50px auto 0px;
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