<template>
    <el-card class="box-card" v-if="show">
        <el-container>
            <el-aside class="avatar">
                <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${good.avatar})` }"></div>
            </el-aside>
            <el-main>
                <div class="name"><span>商品名称: </span> {{ good.name }}</div><br>
                <div class="price"><span>价格: </span> &yen;<span class="pricenum">{{ good.price }}</span></div><br>
                <div class="num"><span>剩余数量:</span> {{ good.num }}</div><br>
                <div class="address"><span>收获地址:</span>
                    <el-input v-model="oadd" clearable type="text" />
                </div><br>
                <div class="date"><span>发布日期:</span> {{ formatTime.getTime(good.date) }}</div><br>
                <span>购买/添加购物车数量: </span>
                <el-input-number v-model="onum" :min="1" :max="good.num" class="onum" /><br><br>
                <span v-if="cnum != 0" style="margin-left: 40px;">(提示: 您的购物车已有 {{ cnum }} 件该商品)</span>
                <span v-else style="margin-left: 40px;">(提示: 您的购物车还没有该商品)</span><br><br>
                <el-button type="primary" size="large" class="add" @click="addgood"
                    :disabled="cnum >= good.num">添加购物车</el-button>
                <el-button type="danger" size="large" style="margin-left: 50px;" @click="buygood">直接购买</el-button>
            </el-main>
        </el-container>
        <el-divider>
            <el-icon><star-filled /></el-icon>
        </el-divider>
        <div class="title">商品详细信息</div>
        <div v-html="good.content"></div>
    </el-card>
    <el-card class="box-card" v-else>
        <h3>抱歉该商品已售罄,5秒后将为您返回!</h3>
    </el-card>
</template>

<script setup>
import { StarFilled } from '@element-plus/icons-vue'
import { ref } from "vue";
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from "vue-router";
import api from '@/api/index'
import { useStore } from "vuex";
import formatTime from "@/utils/formatTime"
const store = useStore()
const route = useRoute()
const router = useRouter()

// 是否显示商品页面
const show = ref(false)
// 记录商品信息
const good = ref({})
// 记录默认收获地址
const oadd = ref(store.state.userInfo.add)
// 记录购买/添加购物车数量
const onum = ref(1)
// 记录购物车已有数量
const cnum = ref(0)


const getInfo = () => {
    // 获取某个商品信息
    api.getgood({ gid: route.params.value }).then(res => {
        if (res.data.ActionType === 'ok') {
            good.value = res.data.data
            show.value = true
        } else {
            show.value = false
            setTimeout(function () {
                window.close()
                router.go(-1);
            }, 5000)
        }
    })
    // 获取该用户购物车中该商品数量
    api.cartgoods({ gid: route.params.value }).then(res => {
        cnum.value = res.data.data
    })
}
getInfo()


// 添加购物车
const addgood = () => {
    api.addgood({ gid: route.params.value, onum: onum.value, cnum: cnum.value }).then(res => {
        if (res.data.ActionType === "ok") {
            ElMessage.success('已添加购物车')
        } else {
            ElMessage.error('添加失败!')
        }
        getInfo()
        onum.value = 1
        oadd.value = store.state.userInfo.add
    })
}
// 直接购买
const buygood = () => {
    if (oadd.value === '') {
        ElMessage.error('请填写收获地址!')
    } else {
        api.buygood({ gid: route.params.value, onum: onum.value, oadd: oadd.value }).then(res => {
            if (res.data.ActionType === "ok") {
                // 打开支付页面       
                window.location.href = res.data.result
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.box-card {
    width: 60%;
    margin: 50px auto;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);
}

.avatar {
    width: 300px;
    height: 300px;
    margin: 20px 30px 30px 50px;

    .image {
        width: 100%;
        height: 100%;
        background-size: cover;
    }
}

span {
    font-size: 16px;
    font-weight: normal;
    color: black;
}

.price {
    color: red;
    font-size: 15px;
    margin-top: 5px;

    .pricenum {
        font-size: 20px;
        margin-left: 3px;
        color: red;
    }
}

.name,
.num {
    font-size: 18px;
    color: black;
}

.date {
    color: black;
}

.address {
    display: flex;
    align-items: center;

    .el-input {
        width: 250px;
        height: 35px;
        margin-left: 20px;
    }
}

.el-divider--horizontal {
    border-top-color: black;

    ::v-deep .el-divider__text {
        background-color: rgb(240, 240, 240);

        .el-icon {
            color: black;
        }
    }
}

.title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: black;
}
</style>