<template>
    <!-- 导航条 -->
    <el-page-header @back="handleBack()" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 联系 </span>
        </template>
    </el-page-header>

    <!-- 聊天框 -->
    <el-card class="el-card">
        <div class="header">
            <span>目前只支持文字聊天，如需详细询问可自行线下联系</span>
            <el-button type="info" @click="showphone" style="margin-right: 30px;">获取对方手机号码</el-button>
        </div>
        <hr style="margin-bottom: 0px;">
        <div class="main">
            <el-scrollbar height="400px" class="ul" ref="scrollbar">
                <div v-for="item in chat" :key="item.index" class="li">
                    <div v-if="item.newX" class="time">
                        {{ formatTime.getTime(item.mdate) }}
                    </div>
                    <div class="oid-li" v-if="item.oid === route.params.oid">
                        <div class="content">
                            {{ item.message }}
                        </div>
                        <el-avatar :size="40" :src="avatarUrl" />
                    </div>
                    <div class="sid-li" v-else>
                        <el-avatar :size="40" :src="savatarUrl" />
                        <div class="content">
                            {{ item.message }}
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <div class="send">
            <el-input v-model="searchGoods" class="input w-50 m-2" placeholder="请输入想要发送的内容" type="search" size="large"
                @keyup.enter="send" clearable />
            <el-button type="primary" @click="send" style="margin-left: 35px;">发送</el-button>
        </div>


    </el-card>

    <!-- 查看对方手机号码 -->
    <el-dialog v-model="dialogVisible" title="请选择合适时间，文明用语！" width="30%">
        <span style="font-size: 15px;">对方手机号码为： {{ sphone }}</span>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, getCurrentInstance, onUpdated, nextTick } from 'vue'
import api from '@/api/index'
import { useStore } from "vuex";
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from "element-plus";
import VueSocketIO from 'vue-socket.io'
import moment from "moment"
moment.locale("zh-cn")
import formatTime from "@/utils/formatTime"
const store = useStore()
const route = useRoute()
const router = useRouter()


// 显示对方手机号码
const dialogVisible = ref(false)
// 对方信息
const sphone = ref("")
const savatar = ref("")
// 输入框内容
const searchGoods = ref("")
// 聊天记录
const chat = ref([])
// 聊天界面对象
const scrollbar = ref()
// 时间是否显示
const showtime = ref(false)

// 创建socket实例对象
const { proxy } = getCurrentInstance();
// 获取socket对象
const socket = new VueSocketIO({
    debug: false,
    connection: `http://localhost:3000?oid=${route.params.oid}`
})
proxy.$socket = socket

// 获取对方手机号和头像
api.getphone({ id: route.params.sid }).then(res => {
    sphone.value = res.data.data.sphone
    savatar.value = res.data.data.savatar
})
var odate = 0
// 获取聊天记录
api.getmessage({ oid: route.params.oid, sid: route.params.sid }).then(res => {
    chat.value = res.data.data.map((item, index) => {
        let bool = false
        if (index === 0) {
            bool = true
            odate = new Date(item.mdate)
        } else {
            const ndate = new Date(item.mdate)
            bool = ndate - odate > 60000
            odate = ndate
        }
        return {
            ...item,
            newX: bool
        }
    })
    nextTick(() => {
        scrollbar.value.wrapRef.scrollTop = scrollbar.value.wrapRef.scrollHeight - 400
    })
})

onMounted(() => {
    // 创建监听
    proxy.$addSockets(sockets, proxy);
})

onBeforeUnmount(() => {
    // 注销socketio
    proxy.$removeSockets(sockets, proxy);
});


// 引入头像路径
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
const savatarUrl = computed(() => savatar.value ? 'http://localhost:3000' + savatar.value : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')


// 发送信息
const send = async () => {
    // 搜索框为空则提示输入
    if (searchGoods.value === '') {
        ElMessage.error("发送内容不能为空!")
    } else {
        // 存储聊天信息
        await api.message({ oid: route.params.oid, sid: route.params.sid, message: searchGoods.value }).then(res => {
            if (res.data.ActionType === 'ok') {
                const mdate = moment().format()
                const ndate = new Date(mdate)
                const bool = ndate - odate > 60000
                odate = ndate
                chat.value.push({ oid: route.params.oid, sid: route.params.sid, mdate: mdate, message: searchGoods.value, newX: bool })
                nextTick(() => {
                    scrollbar.value.wrapRef.scrollTop = scrollbar.value.wrapRef.scrollHeight - 400
                })
            } else {
                ElMessage.error("发送失败,请重新发送!")
            }
        })
        // 触发事件message  发送内容  对方id  
        proxy.$socket.io.emit("send", searchGoods.value, route.params.sid);
        searchGoods.value = ""
    }
}

// 监听消息
const sockets = {
    message(data) {
        const oid = data[0]
        const mdate = moment().format()
        const message = data[1]
        chat.value.push({ oid: oid, sid: route.params.oid, mdate: mdate, message: message })
        console.log(chat.value);
    },
};


// 查看手机号
const showphone = () => {
    dialogVisible.value = true
}

// 返回
const handleBack = () => {
    router.back()
}
</script>

<style lang="scss" scoped>
.el-card {
    margin: 30px auto 70px;
    width: 70%;
    background-color: rgb(206, 206, 206);
    padding: 0px 25px;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main {
    width: 100%;
    height: 400px;
    padding: 0;
    overflow: hidden;
    border: 0px;
}

.el-scrollbar {
    width: 100%;
    margin: 0 auto;
    border: 0px;
    background-color: rgb(224, 224, 224);

    .time {
        font-size: 13px;
        text-align: center;
        margin-bottom: 5px;
    }

    .li {
        width: 92%;
        margin: 10px auto;

        .oid-li {
            display: flex;
            justify-content: right;

            .el-avatar {
                margin-left: 10px;

                ::v-deep img {
                    width: 40px;
                    object-fit: cover;
                }
            }

            .content {
                max-width: 80%;
                margin-top: 5px;
                text-align: left;
                word-break: break-all;
                padding: 10px;
                border-radius: 10px;
                background-color: rgb(18, 183, 245);
                color: white;
            }
        }

        .sid-li {
            display: flex;
            justify-content: left;

            .el-avatar {
                margin-right: 10px;

                ::v-deep img {
                    width: 40px;
                    object-fit: cover;
                }
            }

            .content {
                max-width: 80%;
                margin-top: 5px;
                word-break: break-all;
                padding: 10px;
                border-radius: 10px;
                background-color: white;
            }
        }
    }
}

.send {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;

    .el-input {
        width: 600px;
        height: 40px;
        border-radius: 10px;
        border: 1px solid #e6a23c;
        --el-input-border-radius: 10px;
        --el-input-icon-color: #e6a23c;
        --el-input-focus-border: 0px;
        --el-input-clear-hover-color: red;

        ::v-deep .el-input__wrapper {
            box-shadow: none !important;
        }
    }
}
</style>