<template>
    <el-header>
        <div class="left" @click="handle">
            <el-icon :size="20">
                <Menu />
            </el-icon>
            <span>学生物品交易系统·管理员端</span>
        </div>

        <div class="right">
            <span class="el-dropdown-link" @click="handleLogin">退出</span>
        </div>
    </el-header>
</template>

<script setup>
import { useStore } from 'vuex';
import { Menu } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

// 侧边栏伸缩函数
const handle = () => {
    store.commit("changeCollapsed")
}

// 退出登录
const handleLogin = () => {
    localStorage.removeItem("token")
    store.commit("clearAdminInfo")
    router.push("/login")
}
</script>

<style lang="scss" scoped>
.el-header {
    background-color: #2d3a4b;
    color: white;
    width: 100%;
    height: 60px;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.left,
.right {
    display: flex;
    user-select: none;

    span {
        margin-right: 10px;
    }
}

.left {
    cursor: pointer;

    i {
        margin: auto;
    }

    span {
        margin-left: 15px;
    }
}

.right {
    .el-dropdown-link {
        cursor: pointer;
    }
}
</style>