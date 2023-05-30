<template>
    <el-card class="box-card">
        <div v-if="islogin" class="login">
            <el-avatar :size="100" :src="avatarUrl" @click="goHome" style="cursor: pointer;" />
            <h3> Hi～<span @click="goHome" style="cursor: pointer;">{{ store.state.userInfo.name }}</span></h3>
        </div>
        <div v-else class="login">
            <el-avatar :size="100" :src="avatarUrl" />
            <h3> Hi～欢迎您的到来!</h3>
            <el-button type="primary" @click="goLogin" size="large">登录/注册</el-button>
        </div>
    </el-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
const store = useStore()
const router = useRouter()

// 检测是否登录
const islogin = ref("")
// 头像显示
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

islogin.value = localStorage.getItem("token")


// 去登录/注册
const goLogin = () => {
    router.push("/login")
}
// 去个人中心
const goHome = () => {
    router.push("/home")
}

</script>

<style lang="scss" scoped>
.box-card {
    box-sizing: border-box;
    width: 26%;
    height: 320px;
    // padding: 10px;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);

    ::v-deep .el-card__body {
        width: 100%;
        height: 100%;
        box-sizing: border-box;

        .login {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
}

::v-deep .el-avatar {
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
}
</style>