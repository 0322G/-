<template>
    <!-- 背景图 -->
    <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />

    <!-- 登录窗口 -->
    <div v-if="!store.state.isRegister" class="formContainer">
        <h3>学生物品交易网站</h3>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px" class="loginForm">
            <el-form-item label="学号" prop="id">
                <el-input v-model="loginForm.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item class="button">
                <el-button type="primary" @click="submitForm()">登 录</el-button>
                <el-button type="primary" @click="resetForm()">清空</el-button>
                <el-button type="primary" @click="goRegister()">去注册&nbsp;<el-icon :size=18>
                        <Right />
                    </el-icon></el-button>
            </el-form-item>
        </el-form>
    </div>

    <!-- 注册窗口 -->
    <div v-else class="formContainer">
        <h3>学生物品交易网站</h3>
        <el-form ref="registerFormRef" :model="registerForm" status-icon :rules="registerRules" label-width="80px"
            class="registerForm">
            <el-form-item label="学号" prop="id">
                <el-input v-model="registerForm.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="registerForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="registerForm.phone" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register()">注 册</el-button>
                <el-button type="primary" @click="reset()">清空</el-button>
                <el-button type="primary" @click="goLogin()">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { loadFull } from "tsparticles"
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import api from '@/api/index'
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
import { Right } from '@element-plus/icons-vue'
import { reg_id, reg_tel } from '@/utils/Reg'

// 配置particls
const particlesInit = async (engine) => {
    await loadFull(engine)
}
const options = {
    background: {
        color: {
            value: '#2d3a4b'
        }
    },
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#ffffff'
        },
        links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
        },
        collisions: {
            enable: true
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 6,
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 80
        },
        opacity: {
            value: 0.5
        },
        shape: {
            type: 'circle'
        },
        size: {
            value: { min: 1, max: 5 },
        }
    },
    detectRetina: true
};

const router = useRouter();
const store = useStore();

// 登录表单绑定的响应式对象
const loginForm = reactive({
    id: "",
    password: "",
});
// 登录表单的引用对象
const loginFormRef = ref();
// 登录表单规则
const loginRules = reactive({
    id: [
        { required: true, message: "请输入您的学号", trigger: "blur" },
        { pattern: reg_id, message: "请输入正确的学号", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入您的密码", trigger: "blur" }
    ],
})
// 登录表单提交函数
const submitForm = () => {
    // 校验表单
    loginFormRef.value.validate((valid) => {
        if (valid) {
            // 拿到表单内容，提交后台
            api.getLogin(loginForm).then(res => {
                if (res.data.ActionType === "ok") {
                    // 输入正确，更新当前用户对象
                    store.commit("changeUserInfo", res.data.data)
                    // 跳转到个人中心
                    router.push("/")
                } else {
                    // 数据库未找到
                    ElMessage.error('用户名和密码不匹配')
                }
            })
        }
        else {
            ElMessage.error('请先将所有信息输入正确')
        }
    })
}
// 清空
const resetForm = () => {
    loginFormRef.value.resetFields()
}

// 跳转注册页面
const goRegister = () => {
    resetForm()
    store.commit("changeRegister", true)
}

// 注册表单绑定的响应式对象
const registerForm = reactive({
    id: "",
    password: "",
    phone: "",
});
// 注册表单的引用对象
const registerFormRef = ref();
// 注册登录表单规则
const registerRules = reactive({
    id: [
        { required: true, message: "请输入您的学号", trigger: "blur" },
        { pattern: reg_id, message: "请输入正确的学号", trigger: "blur" }
    ],
    password: [
        { required: true, message: "请输入您要注册的密码", trigger: "blur" }
    ],
    phone: [
        { required: true, message: '请输入您的手机号', trigger: 'blur' },
        { pattern: reg_tel, message: "请输入正确的手机号", trigger: "blur" }
    ],
})
// 注册表单提交函数
const register = () => {
    // 校验表单
    registerFormRef.value.validate((valid) => {
        if (valid) {
            // 拿到表单内容，提交后台
            api.getRegister(registerForm).then(res => {
                if (res.data.ActionType === "ok") {
                    // 注册成功
                    ElMessage.success('注册成功，欢迎登录')
                    store.commit("changeRegister", false)
                } else {
                    // 注册失败
                    ElMessage.error('该学号已存在，请重新输入')
                }
            })
        }
        else {
            ElMessage.error('请先将所有信息输入正确')
        }
    })
}
// 清空
const reset = () => {
    registerFormRef.value.resetFields()
}

// 返回登录页面
const goLogin = () => {
    reset()
    store.commit("changeRegister", false)
}
</script>

<style lang="scss" scoped>
.formContainer {
    width: 450px;
    height: 280px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #000000, $alpha: 0.5);
    color: white;
    text-align: center;
    padding: 20px;
    padding-right: 40px;
    border-radius: 20px;

    h3 {
        font-size: 30px;
    }
}

::v-deep .el-form-item__content {
    justify-content: space-around;
}

::v-deep .el-form-item__label {
    color: white;
}
</style>