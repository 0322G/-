<template>
    <div class="category" v-if="categorygoods">
        <div class="title">* {{ gs1 }}/{{ gs2 }} *</div>
        <el-divider>
            <el-icon><star-filled /></el-icon>
        </el-divider>
        <el-row :gutter="30">
            <el-col :span="6" v-for="item in categorygoods" :key="item.id">
                <el-card shadow="hover" class="card" @click="toGood(item)">
                    <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.avatar})` }"></div>
                    <div class="content">
                        <div class="name">{{ item.name }}</div>
                        <div class="price">&yen;<span class="num">{{ item.price }}</span></div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import api from '@/api/index'
import { useStore } from "vuex";
const store = useStore()
const route = useRoute()

// 该类所有商品
const categorygoods = ref([])
// 读取分类名
const gs1 = ref("")
const gs2 = ref("")

const getinfo = async () => {
    // 获取某类所有商品
    await api.gsgoods({ gs2: route.params.value }).then(res => {
        categorygoods.value = res.data.data
    })
    //分类名称
    gs1.value = store.state.gs[store.state.gs[route.params.value - 1].sparent - 1].sname
    gs2.value = store.state.gs[route.params.value - 1].sname
}
getinfo()

onMounted(() => {
    window.addEventListener('storage', function (e) {
        getinfo()
    });
})

// 跳转到具体商品
const toGood = (item) => {
    window.open('http://127.0.0.1:8080/Good/' + item.id)
}
</script>

<style lang="scss" scoped>
body {
    background-color: rgb(234, 234, 234);
}

.category {
    box-sizing: border-box;
    // background-color: white;
    padding: 15px 30px;
    width: 80%;
    margin: 0px auto;

    .title {
        text-align: center;
        font-size: 25px;
        padding-top: 30px;
        user-select: none;
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

    .price {
        color: red;
        font-size: 15px;
        margin-top: 5px;

        .num {
            font-size: 20px;
            margin-left: 3px;
        }
    }
}
</style>