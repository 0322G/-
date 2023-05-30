<template>
    <el-card class="el-card">
        <!-- 用户列表 -->
        <el-table :data="tableData">
            <el-table-column prop="uid" label="学号" />
            <el-table-column prop="uname" label="用户名" />
            <el-table-column label="头像">
                <template #default="scope">
                    <div v-if="scope.row.uavatar">
                        <el-avatar :src="'http://localhost:3000' + scope.row.uavatar"></el-avatar>
                    </div>
                    <div v-else>
                        <el-avatar :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="uphone" label="手机号" />
            <el-table-column prop="uadd" label="默认地址" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="success" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)"> <template #reference>
                            <el-button type="danger">删除</el-button>
                        </template></el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

    <!-- 编辑信息框 -->
    <el-dialog v-model="dialogVisible" title="编辑用户信息" width="30%">
        <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="uname" style="width: 70%;">
                <el-input v-model="userForm.uname" />
            </el-form-item>
            <el-form-item label="密码" prop="upw" style="width: 70%;">
                <el-input v-model="userForm.upw" />
            </el-form-item>
            <el-form-item label="手机号" prop="uphone" style="width: 70%;">
                <el-input v-model="userForm.uphone" />
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="Edit()" style="margin: 10px 100px 0px;">确认</el-button>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import api from '@/api/index'
import { ElMessage } from "element-plus"

// 用户列表的引用对象
const tableData = ref([])
//初始化调用用户数据
const getTableData = async () => {
    api.getUserList().then(res => {
        tableData.value = res.data.data
    })
}
onMounted(() => {
    getTableData()
})

//编辑框是否显现
const dialogVisible = ref(false)
// 修改用户信息表单的引用对象
const userFormRef = ref()
//用户信息对象
var userForm = ref({
    uname: "",
    upw: "",
    uphone: "",
})
//自定义手机号判别函数
const checkPhone = (rule, value, callback) => {
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!reg_tel.test(value)) {
        callback(new Error("请输入正确的手机号"))
    } else {
        callback()
    }
}
//定义用户信息修改规则
const userFormRules = reactive({//必填，提示，失去焦点时提示
    uname: [
        { required: true, message: '请输入新的用户名', trigger: 'blur' },
    ],
    upassword: [
        { required: true, message: '请输入新的密码', trigger: 'blur' },
    ],
    uphone: [
        { required: true, message: '请输入新的手机号', trigger: 'blur' },
        { validator: checkPhone, trigger: 'blur' }
    ],
})
// 编辑用户信息
const handleEdit = (data) => {
    dialogVisible.value = true
    userForm.value = data
}
// 确认编辑用户信息
const Edit = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {//表单信息均无误
            // 将更改后信息传递
            await api.upUser(userForm.value).then(res => {
                if (res.data.ActionType === 'ok') {
                    // 后端更改成功返回新数据，更新并重新渲染
                    dialogVisible.value = false
                    getTableData()
                    ElMessage.success("用户信息修改成功")
                }
            })
        }
    })
}

// 删除用户信息
const handleDelete = (data) => {
    api.deleteUser(data).then(res => {
        if (res.data.ActionType === 'ok') {
            // 用户删除成功，重新渲染
            ElMessage.success("已删除该用户")
            getTableData()
        } else {
            ElMessage.error("该用户仍有订单未完成,暂无法删除!")
        }
    })
}
</script>

<style lang="scss" scoped>
.el-card {
    width: 80%;
    margin: 20px auto 0px;
}

.el-table {
    margin-top: 10px;
}

::v-deep .cell {
    text-align: center;
}

::v-deep .el-avatar {
    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
}
</style>