<template>
    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 发售列表 </span>
        </template>
        <div style="text-align: center; margin-top: 30px;">
            <span>(注:商品剩余在售数量为0时,将为您下架商品!)</span>
        </div>
    </el-page-header>

    <el-card class="el-card">
        <el-table :data="tableData" class="el-table">
            <el-table-column prop="gid" label="商品编号" width="90" />
            <el-table-column prop="gname" label="商品名称" />
            <el-table-column label="商品分类" width="150" style="z-index: 2;">
                <template #default="scope">
                    {{ gsFormat(scope.row.gs1, scope.row.gs2) }}
                </template>
            </el-table-column>
            <el-table-column prop="gprice" label="商品价格" width="90" />
            <el-table-column prop="gnum" label="剩余在售数量" width="120" />
            <el-table-column label="最后更新时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.gdate) }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button circle :icon="Star" type="success" @click="handleStar(scope.row)"></el-button>
                    <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
                    <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)"> <template #reference>
                            <el-button circle :icon="Delete" type="danger"></el-button>
                        </template></el-popconfirm>
                </template>
            </el-table-column>
            <template #empty>
                <div class="flex items-center justify-center h-100%" style="margin:20px">
                    您没有正在出售的商品，快去发布吧！
                </div>
            </template>
        </el-table>
    </el-card>

    <!-- 查看商品详细信息 -->
    <el-dialog v-model="dialogVisible" title="商品详细信息">
        <el-divider style="margin-top: -20px;"><el-icon><star-filled /></el-icon></el-divider>
        <div v-html="preview.gcontent" class="htmlcontent"></div>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/index'
import { useStore } from "vuex"
import formatTime from "@/utils/formatTime"
import { ElMessage } from "element-plus"
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const tableData = ref([])
const preview = ref([])
const dialogVisible = ref(false)

// 返回用户发售商品列表
const getTableData = async () => {
    await api.goodsList().then(res => {
        if (res.data.ActionType === 'ok') {
            tableData.value = res.data.data
        }
    })
}
getTableData()


// 获取该商品分类
const gsFormat = (gs1, gs2) => {
    return store.state.gs[gs1 - 1].sname + "/" + store.state.gs[gs2 - 1].sname
}

// 查看详细信息
const handleStar = (data) => {
    preview.value = data
    dialogVisible.value = true
}

// 编辑商品信息
const handleEdit = (item) => {
    router.push(`/sell/editgoods/${item.gid}`)
}

// 删除商品
const handleDelete = async (item) => {
    await api.deleteGoods(item).then(res => {
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
}
</style>