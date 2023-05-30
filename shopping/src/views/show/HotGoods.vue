<template>
    <div class="newGoods">
        <h3>新品推荐</h3>
        <el-divider>
            <el-icon><star-filled /></el-icon>
        </el-divider>
        <el-row justify="space-between">
            <el-col v-for="item in newGoods" :key="item.id">
                <el-card shadow="hover" class="card" @click="toGood(item)" :title="item.name">
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
import { StarFilled } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import api from '@/api/index'

var newGoods = ref([])

const result = () => {
    // 获取最新商品信息
    api.getnew().then(res => {
        newGoods.value = res.data.data
    })
}
result()

onMounted(() => {
    window.addEventListener('storage', function (e) {
        result()
    });
})

// 跳转商品
const toGood = (item) => {
    window.open('http://127.0.0.1:8080/Good/' + item.id)
}
</script>

<style lang="scss" scoped>
.newGoods {
    box-sizing: border-box;
    width: 100%;
    margin-top: 40px;
    margin-bottom: 50px;

    h3 {
        text-align: center;
        font-size: 30px;
        font-style: italic;
        font-family: Arial;
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

.el-row {
    width: 100%;

    .el-col-24 {
        max-width: 18%;
    }

    .card {
        background-color: rgb(234, 234, 234);
        border: 2px solid rgb(234, 234, 234);
        width: 100%;
        user-select: none;
        margin-top: 20px;
        cursor: pointer;

        &:hover {
            border: 2px solid #cc9756;
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
    }
}
</style>