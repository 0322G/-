<template>
    <div class="search">
        <div class="title">*以下是为您搜索的结果,希望有您想要的物品*</div>
        <el-divider>
            <el-icon><star-filled /></el-icon>
        </el-divider>
        <el-row :gutter="30">
            <el-col :span="6" v-for="item in categorygoods" :key="item.id">
                <el-card shadow="hover" class="card" @click="toGood(item)">
                    <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.avatar})` }"></div>
                    <div class="content">
                        <div class="name">{{ item.name }}</div>
                        <div class="price">&yen;{{ item.price }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import api from '@/api/index'
const route = useRoute()

// 该类所有商品
const categorygoods = ref([])
// 获取搜索结果
api.getsearch({ value: route.params.value.trim() }).then(res => {
    if (res.data.ActionType === 'ok') {
        categorygoods.value = res.data.data
    }
})


// 跳转到具体商品
const toGood = (item) => {
    window.open('http://127.0.0.1:8080/Good/' + item.id)
}
</script>

<style lang="scss" scoped>
.search {
    box-sizing: border-box;
    padding: 15px 30px;
    width: 80%;
    margin: 0px auto;

    .title {
        text-align: center;
        font-size: 20px;
        padding-top: 30px;
        user-select: none;
        margin-bottom: 30px;
    }

    .el-divider--horizontal {
        border-top-color: black;

        ::v-deep .el-divider__text {
            background-color: rgb(206, 206, 206);

            .el-icon {
                color: black;
            }
        }
    }
}

.card {
    background-color: rgb(234, 234, 234);
    border: 2px solid rgb(234, 234, 234);
    width: 100%;
    user-select: none;

    &:hover {
        border: 2px solid #cc9756;
    }
}

.image {
    width: 170px;
    height: 170px;
    background-size: cover;
    margin: 0px auto;
}

.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 15px;

    .name {
        width: 100%;
        text-align: center;
        padding: 0px 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>