<template>
    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 我的购买 </span>
        </template>
        <div style="text-align: center; margin-top: 30px;">
            <span>(注:商品在送到3天后会自动确认收货,请及时查看详情!)</span>
        </div>
    </el-page-header>

    <!-- 购买商品列表 -->
    <el-card class="el-card">
        <el-table :data="tableData" class="el-table">
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
            <el-table-column prop="oprice" label="实际付款" width="85" />
            <el-table-column prop="price" label="商品单价" width="85" />
            <el-table-column prop="num" label="购买数量" width="85" />
            <el-table-column label="购买时间">
                <template #default="scope">
                    {{ formatTime.getTime(scope.row.date) }}
                </template>
            </el-table-column>
            <el-table-column label="订单详情" width="130">
                <template #default="scope">
                    <el-button round :icon="Tickets" @click="order(scope.row)" size="large"
                        v-if="scope.row.state == 4">查看订单</el-button>
                    <span v-else>{{ store.state.status[scope.row.state] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="130">
                <template #default="scope">
                    <el-popconfirm title="确认已收到货?" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="confirm(scope.row)" v-if="scope.row.state == 3"> <template #reference>
                            <el-button round :icon="CircleCheck" size="large" type="success">确认收货</el-button>
                        </template></el-popconfirm>

                    <el-popconfirm title="确定要删除该订单?" confirm-button-text="确定" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row)" v-if="scope.row.state == 4"><template #reference>
                            <el-button round :icon="Delete" size="large" type="danger">删除记录</el-button>
                        </template></el-popconfirm>
                </template>
            </el-table-column>
            <el-table-column label="联系商家/评价" width="160">
                <template #default="scope">
                    <el-button round :icon="ChatDotRound" size="large" @click="contact(scope.row)"
                        v-if="scope.row.state != 0 && scope.row.state != 4">联系商家</el-button>
                    <!-- <el-rate v-model="scope.row.start" v-if="scope.row.state === 4" @click="handlestar(scope.row)"
                        :disabled="scope.row.start != 0" :colors="colors" /> -->
                </template>
            </el-table-column>
            <template #empty>
                <div class="flex items-center justify-center h-100%" style="margin:20px">
                    您还没有购买商品记录，快去浏览吧！
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

            <el-descriptions title="个人信息" border style="margin-top: 20px;">
                <el-descriptions-item label="账号">{{ store.state.userInfo.id }}</el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <user />
                            </el-icon>
                            昵称
                        </div>
                    </template>
                    {{ store.state.userInfo.name }}
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
                    {{ store.state.userInfo.phone }}
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
                    &yen;{{ preview.oprice }} (&yen;{{ preview.price }}*{{ preview.num }})
                </el-descriptions-item>
            </el-descriptions>
        </el-card>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import api from '@/api/index'
import { useStore } from "vuex"
import formatTime from "@/utils/formatTime"
import { ElMessage } from "element-plus";
import { Tickets, ChatDotRound, CircleCheck, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()
const tableData = ref([])
const preview = ref([])
const dialogVisible = ref(false)
const colors = ref(['#FF0000', '#008000', '#FF9900'])

// 返回用户购买商品列表
const getTableData = async () => {
    await api.buyList().then(res => {
        if (res.data.ActionType === 'ok') {
            tableData.value = res.data.data
        }
    })
}
getTableData()

// 查看订单
const order = async (item) => {
    preview.value = item
    dialogVisible.value = true
}
// 确认收货
const confirm = async (item) => {
    item.state = 4
    await api.receipt(item).then(res => {
        if (res.data.ActionType === 'ok') {
            getTableData()
            ElMessage.success("已确认收货!")
        }
    })
}

// 联系商家
const contact = async (item) => {
    router.push(`/order/message/${item.bid}/${item.sid}`)
}

// 评分
const handlestar = (item) => {
    console.log(item);
    // await api.start(item).then(res => {
    //     if (res.data.ActionType === 'ok') {
    //         getTableData()
    //         ElMessage.success("已确认收货!")
    //     }
    // })

}


// 删除购买记录
const handleDelete = async (item) => {
    item["type"] = 1  //顾客删除记录
    await api.deletereceipt(item).then(res => {
        if (res.data.ActionType === 'ok') {
            getTableData()
            ElMessage.success("已删除购买记录!")
        }
    })
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