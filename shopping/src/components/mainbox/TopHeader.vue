<template>
    <el-header>
        <div class="left" @click="handle">
            <el-icon :size="20">
                <Menu />
            </el-icon>
            <span>学生物品交易系统</span>
        </div>

        <div class="right">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon :size=28 color="white">
                        <House />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="handleShop">返回商城</el-dropdown-item>
                        <el-dropdown-item @click="handleLogin">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>

    </el-header>
</template>

<script setup>
import { useStore } from 'vuex';
import { Menu, House } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();

// 侧边栏伸缩函数
const handle = () => {
    store.commit("changeCollapsed")
}

// 返回商城
const handleShop = () => {
    router.push("/")
}
// 退出登录
const handleLogin = () => {
    localStorage.removeItem("token")
    store.commit("clearUserInfo")
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
    .el-dropdown {
        margin: auto;
    }

    .el-dropdown-link {
        cursor: pointer;
    }
}
</style>