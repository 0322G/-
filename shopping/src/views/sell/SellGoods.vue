<template>
    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 发布商品 </span>
        </template>
    </el-page-header>

    <!-- 发布商品窗口 -->
    <el-card class="card" style="width:80%">
        <el-form ref="goodsFormRef" :model="goodsForm" :rules="goodsFormRules" label-width="80px">
            <el-form-item label="商品名称" prop="name" style="width:50%">
                <el-input v-model="goodsForm.name" autocomplete="off" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品分类" prop="gs" style="width:25%;">
                <el-cascader v-model="goodsForm.gs" :options="store.state.gsInfo" :popper-class="ul" placeholder="请选择分类" />
            </el-form-item>
            <el-form-item label="商品价格" prop="price" style="width:25%">
                <el-input v-model="goodsForm.price" placeholder="小数最多两位" />
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input-number v-model="goodsForm.num" :min="1" />
            </el-form-item>
            <el-form-item label="商品封面" prop="avatar">
                <Upload :avatar="goodsForm.avatar" @change="avatarChange"></Upload>
            </el-form-item>
            <el-form-item label="商品详情" prop="content" style="width:85%">
                <editor @event="contentChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()" style="margin-left: 30px;">发布商品</el-button>
                <el-button type="primary" @click="resetForm()" style="margin-left: 100px;">清空</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { useStore } from "vuex"
import { ref, reactive } from "vue"
import Upload from '@/components/upload/Upload'
import addgoods from '@/utils/addgoods'
import editor from '@/components/editor/Editor.vue'
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
const router = useRouter()
const store = useStore()


const goodsFormRef = ref()
const goodsForm = reactive({
    name: "",
    gs: "",
    price: "",
    num: 1,
    content: "",
    avatar: "",
    file: null,
})
// 商品价格判断
const checkPrice = (rule, value, callback) => {
    const reg_tel = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if (!reg_tel.test(value)) {
        callback(new Error("请输入正确价格"))
    } else {
        callback()
    }
}
const goodsFormRules = reactive({
    name: [
        { required: true, message: "请输入商品名称", trigger: "blur" },
    ],
    gs: [
        { required: true, message: "请选择商品分类", trigger: "blur" },
    ],
    price: [
        { required: true, message: "请输入商品价格", trigger: "blur" },
        { validator: checkPrice, trigger: 'blur' },
    ],
    num: [
        { required: true, message: "请输入发布商品数量", trigger: "blur" },
    ],
    content: [
        { required: true, message: "请填写商品详细信息或“无”", trigger: "blur" },
    ],
    avatar: [
        { required: true, message: "请上传商品封面图片", trigger: "blur" },
    ],
})

// 每次editor内容改变的回调函数
const contentChange = (data) => {
    goodsForm.content = data
}
//封面图片存储与传递
const avatarChange = (file) => {
    goodsForm.avatar = URL.createObjectURL(file)
    goodsForm.file = file
}
// 发布商品
const submitForm = () => {
    goodsFormRef.value.validate(async (valid) => {
        if (valid) {
            await addgoods(goodsForm).then(res => {
                if (res.data.ActionType === 'ok') {
                    ElMessage.success("商品发布成功")
                    router.push(`/sell/selllist`)
                } else {
                    ElMessage.error('商品发布失败!')
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
    goodsFormRef.value.resetFields()
}
</script>

<style lang="scss" scoped>
.card {
    width: 90%;
    margin: 30px auto 0px;
    padding-top: 15px;
    background-color: rgb(240, 240, 240);

    ::v-deep .el-card__body {
        padding-left: 50px;
    }
}

::v-deep .el-cascader-panel {
    height: 150px !important;
}
</style>