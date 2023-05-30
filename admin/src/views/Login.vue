<template>
    <!-- 背景图 -->
    <Particles id="tsparticles" :particlesInit="particlesInit" :options="options" />

    <!-- 登录窗口 -->
    <div class="formContainer">
        <h3>学生物品交易网站·管理员端</h3>
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px" class="loginForm">
            <el-form-item label="账号" prop="id">
                <el-input v-model="loginForm.id" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginForm.password" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">登 录</el-button>
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
//管理员帐号验证
const checkId = (rule, value, callback) => {
    const reg_id = /^admin\d{2}$/
    if (!reg_id.test(value)) {
        callback(new Error("请输入正确的账号"))
    } else {
        callback()
    }
}
// 登录表单规则
const loginRules = reactive({
    id: [
        {
            required: true, message: "请输入您的账号", trigger: "blur"
        },
        { validator: checkId, trigger: 'blur' }
    ],
    password: [
        {
            required: true, message: "请输入您的密码", trigger: "blur"
        }
    ]
})
// 登录表单提交函数
const submitForm = () => {
    // 校验表单
    loginFormRef.value.validate((valid) => {
        if (valid) {
            // 拿到表单内容，提交后台
            api.getLogin(loginForm).then(res => {
                if (res.data.ActionType === "ok") {
                    // 输入正确，更新当前管理员信息
                    store.commit("changeAdminInfo", res.data.data)
                    // 获取所有商品信息
                    api.getgoods().then(res => {
                        store.commit("changeGoodsInfo", res.data.data)
                    })
                    // 获取新商品分类数组
                    api.getGsInfo().then(res => {
                        store.commit("changeGsInfo", res.data.data)
                    })
                    // 获取原分类数组
                    api.getGs().then(res => {
                        store.commit("changeGs", res.data.data)
                    })
                    // 获取轮播图信息
                    api.carousel().then(res => {
                        store.commit("changeCarousel", res.data.data)
                    })
                    // 跳转到个人中心
                    router.push("/home")
                } else {
                    // 数据库未找到
                    ElMessage.error('账号和密码不匹配')
                }
            })
        }
        else {
            ElMessage.error('请先将所有信息输入正确')
        }
    })
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
    margin-left: 10px !important;
}

::v-deep .el-form-item__label {
    color: white;
}
</style>