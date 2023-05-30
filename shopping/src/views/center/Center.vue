<template>
    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 个人中心 </span>
        </template>
    </el-page-header>

    <!-- 个人信息框 -->
    <el-row :gutter="20" class="el-row">
        <!-- 左侧-个人信息展示 -->
        <el-col :span="5" :offset="3">
            <el-card class="box-card">
                <el-avatar :size="100" :src="avatarUrl" />
                <h3> {{ store.state.userInfo.name }}</h3>
                <h3> {{ store.state.userInfo.id }}</h3>
            </el-card>
        </el-col>

        <!-- 右侧-可修改信息 -->
        <el-col :span="9" :offset="1">
            <!-- 修改个人信息窗口 -->
            <el-card class="box-card" v-if="!store.state.isPassword">
                <template #header>
                    <span>个人信息</span>
                </template>

                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px"
                    class="demo-ruleForm">
                    <el-form-item label="用户名" prop="name" style="width:70%">
                        <el-input v-model="userForm.name" />
                    </el-form-item>
                    <el-form-item label="手机号" prop="phone" style="width:70%">
                        <el-input v-model="userForm.phone" />
                    </el-form-item>
                    <el-form-item label="默认地址" prop="add" style="width:70%">
                        <el-input v-model="userForm.add" />
                    </el-form-item>
                    <el-form-item label="头像" prop="avatar">
                        <Upload :avatar="userForm.avatar" @change="handleChange"></Upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">更新</el-button>
                        <el-button type="primary" @click="resetForm()">重置</el-button>
                        <el-button type="primary" @click="goPassword()">修改密码&nbsp;<el-icon :size=18>
                                <Right />
                            </el-icon></el-button>
                    </el-form-item>
                </el-form>
            </el-card>

            <!-- 修改密码窗口 -->
            <el-card v-else>
                <template #header>
                    <span>修改密码</span>
                </template>

                <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordFormRules" label-width="120px"
                    class="demo-ruleForm">
                    <el-form-item label="原密码" prop="opw" style="width:75%">
                        <el-input v-model="passwordForm.opw" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="新密码" prop="npw" style="width:75%">
                        <el-input v-model="passwordForm.npw" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="npw2" style="width:75%">
                        <el-input v-model="passwordForm.npw2" type="password" autocomplete="off" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitPwForm()">修改</el-button>
                        <el-button type="primary" @click="resetPwForm()">清空</el-button>
                        <el-button type="primary" @click="exitPwForm()">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, reactive } from "vue";
import upload from '@/utils/upload'
import { ElMessage } from "element-plus";
import Upload from '@/components/upload/Upload'
import api from '@/api/index'
import { useRouter } from "vue-router";
import { reg_tel } from '@/utils/Reg'

const router = useRouter();
const store = useStore()

//导入个人信息
const { password, name, phone, add, avatar } = store.state.userInfo
// 引入头像路径
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

// 修改个人信息表单的引用对象
const userFormRef = ref()

//个人信息对象
const userForm = reactive({
    name,
    phone,
    add,
    avatar,
    file: null
})
//定义个人信息修改规则
const userFormRules = reactive({//必填，提示，失去焦点时提示
    name: [
        { required: true, message: '请输入新的用户名', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入新的手机号', trigger: 'blur' },
        { pattern: reg_tel, message: "请输入正确的手机号", trigger: "blur" }
    ],
    add: [
        { required: true, message: '请输入新的地址', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传新的头像', trigger: 'blur' },
    ],
})
// 更改图片后的存储与重新渲染
const handleChange = file => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}
//确认更新个人信息
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {//表单信息均无误
            // 将更改后信息传递
            await upload(userForm).then(res => {
                if (res.data.ActionType === 'ok') {
                    // 后端更改成功返回新数据，更新并重新渲染
                    store.commit("changeUserInfo", res.data.data)
                    ElMessage.success("更新成功")
                }
            })
        }
    })
}
// 恢复原值
const resetForm = () => {
    userFormRef.value.resetFields()
}

//跳转到修改密码窗口
const goPassword = () => {
    store.commit("changeisPassword", true)
}

// 修改密码表单的引用对象
const passwordFormRef = ref()
// 修改密码表单绑定的响应式对象
const passwordForm = reactive({
    opw: "",
    npw: "",
    npw2: "",
});
//原密码验证
const checkOpw = (rule, value, callback) => {
    if (value != password) {
        callback(new Error('原密码错误，请重新输入！'))
    }
    else {
        callback()
    }
}
//确认密码验证
const checkNpw = (rule, value, callback) => {
    if (value != passwordForm.npw) {
        callback(new Error('两次输入密码不一致，请重新输入！'))
    }
    else {
        callback()
    }
}
//定义密码修改规则
const passwordFormRules = reactive({//必填，提示，失去焦点时提示
    opw: [
        { required: true, message: '请输入原密码', trigger: 'blur' },
        { validator: checkOpw, trigger: 'blur' }
    ],
    npw: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
    ],
    npw2: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        { validator: checkNpw, trigger: 'blur' }
    ],
})
// 确认密码表单提交函数
const submitPwForm = () => {
    // 校验表单
    passwordFormRef.value.validate((valid) => {
        if (valid) {
            // 拿到表单内容，提交后台
            api.getUppassword(passwordForm).then(res => {
                if (res.data.ActionType === "ok") {
                    // 修改密码成功，更新当前用户对象
                    store.commit("changeUserInfo", res.data.data)
                    store.commit("changeisPassword", false)
                    ElMessage.success('修改成功，请重新登录')
                    // 跳转到个人中心
                    router.push("/login")
                }
            })
        }
        else {
            ElMessage.error('请先将所有信息输入正确')
        }
    })
}
// 清空
const resetPwForm = () => {
    passwordFormRef.value.resetFields()
}
//退出修改密码
const exitPwForm = () => {
    store.commit("changeisPassword", false)
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 30px;


    .box-card {
        text-align: center;
        background-color: rgb(240, 240, 240);
    }

    ::v-deep .el-card__header {
        text-align: center;
    }

    ::v-deep .el-card__body {
        padding-left: 40px;
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