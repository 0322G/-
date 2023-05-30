<template>
    <!-- 导航条 -->
    <el-page-header @back="handleBack()" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 编辑商品 </span>
        </template>
    </el-page-header>

    <!-- 发布商品窗口 -->
    <el-card class="card" style="width:80%">
        <el-form ref="goodsFormRef" :model="goodsForm" :rules="goodsFormRules" label-width="80px">
            <el-form-item label="商品名称" prop="name" style="width:50%">
                <el-input v-model="goodsForm.name" autocomplete="off" placeholder="请输入商品名称" />
            </el-form-item>
            <el-form-item label="商品分类" prop="gs" style="width:25%;">
                <el-cascader v-model="goodsForm.gs" :options="store.state.gsInfo" placeholder="请选择分类" />
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
                <editor @event="contentChange" :content="goodsForm.content" v-if="flag"></editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()" style="margin-left: 30px;">更新信息</el-button>
                <el-button type="primary" @click="resetForm()" style="margin-left: 100px;">清空</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, reactive } from "vue";
import api from '@/api/index'
import Upload from '@/components/upload/Upload'
import upgoods from '@/utils/upgoods'
import editor from '@/components/editor/Editor.vue'
import { ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { reg_price } from '@/utils/Reg'
const router = useRouter()
const route = useRoute()
const store = useStore()

const flag = ref(false)

// 获取具体商品信息
api.getGood({ id: route.params.id }).then(res => {
    if (res.data.data.content) {
        Object.assign(goodsForm, res.data.data)
        flag.value = true
    }
})


const goodsFormRef = ref()
const goodsForm = reactive({
    name: "",
    gs: [],
    price: "",
    num: 1,
    content: "",
    avatar: "",
    file: null,
})

const goodsFormRules = reactive({
    name: [
        { required: true, message: "请输入商品名称", trigger: "blur" },
    ],
    gs: [
        { required: true, message: "请选择商品分类", trigger: "blur" },
    ],
    price: [
        { required: true, message: "请输入商品价格", trigger: "blur" },
        { pattern: reg_price, message: "请输入正确的价格", trigger: "blur" }
    ],
    num: [
        { required: true, message: "请输入发布商品数量", trigger: "blur" },
    ],
    avatar: [
        { required: true, message: "请上传商品封面图片", trigger: "blur" },
    ],
})

// 每次editor内容改变的回调函数
const contentChange = (data) => {
    goodsForm.content = data
}
//封面图片传递
const avatarChange = (file) => {
    goodsForm.avatar = URL.createObjectURL(file)
    goodsForm.file = file
}
// 更新该商品信息
const submitForm = () => {
    goodsFormRef.value.validate(async (valid) => {
        if (valid) {
            goodsForm["id"] = route.params.id
            await upgoods(goodsForm).then(res => {
                if (res.data.ActionType === 'ok') {
                    ElMessage.success("商品信息更新成功")
                    router.back()
                }
            })
        }
        else {
            ElMessage.error('请先将所有信息输入正确!')
        }
    })
}
// 清空
const resetForm = () => {
    goodsFormRef.value.resetFields()
}

// 返回
const handleBack = () => {
    router.back()
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

        ::v-deep .el-cascader-menu__list {
            z-index: 9;
        }
    }


}
</style>