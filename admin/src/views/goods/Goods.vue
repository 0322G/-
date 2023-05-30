<template>
    <el-card class="el-card">
        <el-table :data="tableData" class="el-table">
            <el-table-column prop="id" label="商品编号" width="90" />
            <el-table-column label="商品封面">
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
            <el-table-column label="商品分类" width="150" style="z-index: 2;">
                <template #default="scope">
                    {{ gsFormat(scope.row.gs1, scope.row.gs2) }}
                </template>
            </el-table-column>
            <el-table-column prop="price" label="商品价格" width="90" />
            <el-table-column prop="num" label="库存数量" width="120" />
            <el-table-column label="最后更新时间">
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
                    系统中暂时没有在售商品!
                </div>
            </template>
        </el-table>
    </el-card>

    <!-- 查看商品详细信息 -->
    <el-dialog v-model="dialogVisible" title="商品详细信息">
        <el-divider style="margin-top: -20px;"><el-icon><star-filled /></el-icon></el-divider>
        <div v-html="preview.content" class="htmlcontent"></div>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/index'
import { useStore } from "vuex"
import formatTime from "@/utils/formatTime"
import { ElMessage } from "element-plus"
import { Star, Delete, StarFilled } from '@element-plus/icons-vue'

const store = useStore()
const tableData = ref([])
const preview = ref([])
const dialogVisible = ref(false)

// 显示所有商品列表
const getTableData = async () => {
    tableData.value = store.state.goodsInfo
}
onMounted(() => {
    getTableData()
})

// 获取所有商品分类
const gsFormat = (gs1, gs2) => {
    return store.state.gs[gs1 - 1].sname + "/" + store.state.gs[gs2 - 1].sname
}

// 查看详细信息
const handleStar = (data) => {
    preview.value = data
    dialogVisible.value = true
}

// 删除商品
const handleDelete = async (item) => {
    await api.deleteGoods({ gid: item.id }).then(res => {
        if (res.data.ActionType === 'ok') {
            ElMessage.success("商品已删除")
        } else {
            ElMessage.error('尚有处于订单中的该商品,暂时还无法删除!')
        }
    })
    await getTableData()
}

</script>

<style lang="scss" scoped>
.el-card {
    margin: 10px auto 0px;
    width: 90%;
}

::v-deep img {
    max-width: 90%;
}

::v-deep .cell {
    text-align: center;

    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
    }
}

::v-deep .cell {
    text-align: center;
}
</style>