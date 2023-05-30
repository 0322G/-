<template>
    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 购物车 </span>
        </template>
        <div style="text-align: center; margin-top: 30px;">
            <span>(注:商品库存不足时将为您删减或清除,请及时够买想要的商品!)</span>
        </div>
    </el-page-header>

    <!-- 购物车列表 -->
    <el-card class="el-card">
        <el-table :data="tableData" class="el-table" ref="multipleTableRef" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="30" />
            <el-table-column label="商品图片">
                <template #default="scope">
                    <div v-if="scope.row.avatar">
                        <img :src="'http://localhost:3000' + scope.row.avatar">
                    </div>
                    <div v-else>
                        <img
                            :src="'https://img0.baidu.com/it/u=1659832863,2487465046&fm=253&fmt=auto&app=138&f=JPEG?w=202&h=163'">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="price" label="商品价格" width="90" />
            <el-table-column prop="num" label="添加数量" width="120" />
            <el-table-column label="添加时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.date) }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button circle :icon="Star" type="success" @click="handleStar(scope.row)"></el-button>
                    <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)"> <template #reference>
                            <el-button circle :icon="Delete" type="danger"></el-button>
                        </template></el-popconfirm>
                </template>
            </el-table-column>
            <template #empty>
                <div class="flex items-center justify-center h-100%" style="margin:20px">
                    您的购物车中没有商品,快去添加吧！
                </div>
            </template>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="buyselection()" type="success" size="large" style="margin-left:300px;">支付所选</el-button>
            <el-button @click="deleteselection()" type="danger" size="large" style="margin-left:300px;">删除所选</el-button>
        </div>
    </el-card>

    <!-- 查看商品详细信息 -->
    <el-dialog v-model="dialogVisible" title="商品详细信息">
        <el-divider style="margin-top: -20px;"><el-icon><star-filled /></el-icon></el-divider>
        <div v-html="preview.content" class="htmlcontent"></div>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/index'
import { useStore } from "vuex"
import formatTime from "@/utils/formatTime"
import { ElMessage } from "element-plus"
import { Star, Delete, StarFilled } from '@element-plus/icons-vue'


const store = useStore()
// 列表数据
const tableData = ref([])
const multipleTableRef = ref()
const multipleSelection = ref([{
    avatar: "",
    name: "",
    price: 0,
    num: 0,
    date: "",
    sid: "",
    bid: "",
    gid: "",
}])

// 详细信息展示
const preview = ref([])
const dialogVisible = ref(false)

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

// 返回用户购物车列表
const getTableData = async () => {
    await api.cartlist().then(res => {
        if (res.data.ActionType === 'ok') {
            tableData.value = res.data.data
        }
    })
}
getTableData()


// 查看商品详细信息
const handleStar = (data) => {
    preview.value = data
    dialogVisible.value = true
}

// 删除购物车商品
const handleDelete = async (item) => {
    await api.deletecart(item).then(res => {
        if (res.data.ActionType === 'ok') {
            ElMessage.success("商品已删除")
        } else {
            ElMessage.error('商品删除失败!')
        }
    })
    getTableData()
}

// 支付所选
const buyselection = () => {
    if (multipleSelection.value.length === 1 && multipleSelection.value[0].avatar === "") {
        ElMessage.error('请先勾选要购买的商品!')
    } else {
        var bool = true
        multipleSelection.value.forEach((item) => {
            api.buygood({ gid: item.gid, onum: item.num, oadd: store.state.userInfo.add }).then(res => {
                if (res.data.ActionType === "ok") {
                } else {
                    bool = false
                }
            })
            api.deletecart(item).then(res => {
                if (res.data.ActionType === 'ok') {
                } else {
                    bool = false
                }
            })
        })
        getTableData()
        if (bool) {
            ElMessage.success('购买成功!请等待收货')
        } else {
            ElMessage.error('购买失败!')
        }
    }
}
// 删除所选
const deleteselection = () => {
    if (multipleSelection.value.length === 1 && multipleSelection.value[0].avatar === "") {
        ElMessage.error('请先勾选要删除的商品!')
    } else {
        var bool = true
        multipleSelection.value.forEach((item) => {
            api.deletecart(item).then(res => {
                if (res.data.ActionType === 'ok') {
                } else {
                    bool = false
                }
            })
        })
        getTableData()
        if (bool) {
            ElMessage.success('商品已全部删除')
        } else {
            ElMessage.error('商品删除失败!')
        }
    }
}
</script>

<style lang="scss" scoped>
.el-card {
    margin: 10px auto 0px;
    width: 90%;
}

::v-deep .cell {
    text-align: center;

    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
    }
}

::v-deep img {
    max-width: 90%;
}
</style>