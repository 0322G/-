<template>
    <div class="header">
        <!-- LOGO -->
        <div class="logo">
            <img src="../../assets/LOGO.png" alt="">
        </div>

        <div class="search">
            <el-popover placement="bottom" :show-arrow="false" :width="600" :visible="visible" :offset="0">
                <!-- 搜索框 -->
                <template #reference>
                    <el-input v-model="searchGoods" class="input w-50 m-2" placeholder="请输入想要搜索的商品" :prefix-icon="Search"
                        type="search" size="large" @input="handleSearch" @blur="visible = false" clearable
                        @focus="handleFocus" @keyup.enter="toSearch" />
                </template>
                <!-- 搜索结果弹出层 -->
                <div v-if="searchgoodslist.length">
                    <div v-for="data in searchgoodslist" :key="data.id" class="search-item" @click="toGood(data)">
                        {{ data.name }}
                    </div>
                </div>
                <div v-else>
                    <el-empty description="抱歉,暂无该商品" :image-size="50" />
                </div>
            </el-popover>
        </div>
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted, reactive, ref } from 'vue'
import api from '@/api/index'
import { useRouter } from 'vue-router';
const router = useRouter()

// 输入框内容
const searchGoods = ref("")
// 弹出层是否展示
const visible = ref(false)
// 存储定时器
var timmer = null
// 搜索结果
const searchgoodslist = ref([])

// 输入框获焦时是否显示
const handleFocus = () => {
    // 搜索框非空则展示
    if (searchGoods.value != '') {
        visible.value = true
    }
}

// 搜索商品
const handleSearch = () => {
    // 清除原定时器   
    clearTimeout(timmer)
    // 重新计时
    timmer = setTimeout(() => {
        searchgoodslist.value = []
        if (searchGoods.value != '') {
            // 获取搜索结果
            api.getsearch({ value: searchGoods.value.trim() }).then(res => {
                if (res.data.ActionType === 'ok') {
                    searchgoodslist.value = res.data.data
                }
            })
        }
    }, 500)
    // 显示结果弹出层
    visible.value = true
}

// 回车搜索跳转
const toSearch = () => {
    if (searchGoods.value != '') {
        router.push({ name: 'Search', params: { value: searchGoods.value } })
    }
}

// 跳转到具体商品
const toGood = (item) => {
    window.open('http://127.0.0.1:8080/Good/' + item.id)
}
</script>

<style lang="scss" scoped>
.header {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
}

.logo {
    width: 330px;
    height: 100px;
    margin-left: 20px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
        user-select: none;
        -webkit-user-drag: none;
    }
}

.search {
    display: flex;
    align-items: center;
    margin-left: 50px;

    .el-input {
        width: 600px;
        height: 45px;
        border-radius: 10px;
        border: 2px solid #e6a23c;
        --el-input-border-radius: 10px;
        --el-input-icon-color: #e6a23c;
        --el-input-focus-border: 0px;
        --el-input-clear-hover-color: red;

        ::v-deep .el-input__wrapper {
            box-shadow: none !important;
        }
    }
}

.search-item {
    height: 40px;
    line-height: 40px;
    cursor: pointer;

    &:hover {
        background: rgb(238, 238, 238);
    }
}
</style>