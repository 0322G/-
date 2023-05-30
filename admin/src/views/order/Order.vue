<template>
    <!-- 所有订单列表 -->
    <el-card class="el-card">
        <el-table :data="tableData" class="el-table">
            <el-table-column prop="oid" label="订单编号" />
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
            <el-table-column prop="price" label="商品价格" width="90" />
            <el-table-column prop="num" label="订单数量" width="90" />
            <el-table-column label="下单时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.date) }}
                </template>
            </el-table-column>
            <el-table-column label="订单状态" width="130">
                <template #default="scope">
                    {{ store.state.status[scope.row.state] }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button round :icon="Tickets" @click="order(scope.row)" size="large">详细信息</el-button>
                </template>
            </el-table-column>
            <template #empty>
                <div class="flex items-center justify-center h-100%" style="margin:20px">
                    目前系统内未存在订单!
                </div>
            </template>
        </el-table>
    </el-card>

    <!-- 订单详情 -->
    <el-dialog v-model="dialogVisible" title="">
        <el-card class="el-card">
            <el-descriptions title="订单详情" border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <tickets />
                            </el-icon>
                            订单号
                        </div>
                    </template>
                    {{ preview.oid }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <Calendar />
                            </el-icon>
                            购买日期
                        </div>
                    </template>
                    {{ formatTime.getTime(preview.date) }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <office-building />
                            </el-icon>
                            收获地址
                        </div>
                    </template>
                    {{ preview.oadd }}
                </el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="商家信息" border style="margin-top: 20px;">
                <el-descriptions-item label="账号">{{ preview.sid }}</el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <user />
                            </el-icon>
                            昵称
                        </div>
                    </template>
                    {{ preview.sname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <iphone />
                            </el-icon>
                            手机号
                        </div>
                    </template>
                    {{ preview.sphone }}
                </el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="顾客信息" border style="margin-top: 20px;">
                <el-descriptions-item label="账号">{{ preview.bid }}</el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <user />
                            </el-icon>
                            昵称
                        </div>
                    </template>
                    {{ preview.bname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <iphone />
                            </el-icon>
                            手机号
                        </div>
                    </template>
                    {{ preview.bphone }}
                </el-descriptions-item>
            </el-descriptions>

            <el-descriptions title="商品信息" border style="margin-top: 20px;">
                <el-descriptions-item label="编号">{{ preview.gid }}</el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <Goods />
                            </el-icon>
                            名称
                        </div>
                    </template>
                    {{ preview.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <Coin />
                            </el-icon>
                            实际付款
                        </div>
                    </template>
                    &yen;{{ preview.price * preview.num }} (&yen;{{ preview.price }}*{{ preview.num }})
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import api from '@/api/index'
import { useStore } from "vuex"
import formatTime from "@/utils/formatTime"
import { ElMessage } from "element-plus";
import { Tickets, ChatDotRound, CircleCheck, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const store = useStore()
const tableData = ref([])
const preview = ref([])
const dialogVisible = ref(false)

// 返回所有订单
const getTableData = async () => {
    await api.indentlist().then(res => {
        if (res.data.ActionType === 'ok') {
            tableData.value = res.data.data
        }
    })
}
onMounted(() => {
    getTableData()
})

// 查看订单详细信息
const order = async (item) => {
    preview.value = item
    dialogVisible.value = true
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

.cell-item {
    display: flex;
    align-items: center;
}
</style>