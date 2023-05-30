<template>
    <div class="gs">
        <ul>
            <li>
                <div class="li-title"><el-icon :size="30">
                        <Reading />
                    </el-icon>
                    <span>书籍</span>
                </div>
                <el-breadcrumb separator="/" v-if="store.state.gsInfo[0]">
                    <el-breadcrumb-item v-for="item in store.state.gsInfo[0].children" :key="item.value"
                        @click="category(item.value)">{{ item.label
                        }}</el-breadcrumb-item>
                </el-breadcrumb>
            </li>
            <li>
                <div class="li-title"><el-icon :size="30">
                        <Camera />
                    </el-icon>
                    <span>数码</span>
                </div>
                <el-breadcrumb separator="/" v-if="store.state.gsInfo[1]">
                    <el-breadcrumb-item v-for="item in store.state.gsInfo[1].children" :key="item.value"
                        @click="category(item.value)">{{ item.label
                        }}</el-breadcrumb-item>
                </el-breadcrumb>
            </li>
            <li>
                <div class="li-title"><el-icon :size="30">
                        <Orange />
                    </el-icon>
                    <span>日用</span>
                </div>
                <el-breadcrumb separator="/" v-if="store.state.gsInfo[2]">
                    <el-breadcrumb-item v-for="item in store.state.gsInfo[2].children" :key="item.value"
                        @click="category(item.value)">{{ item.label
                        }}</el-breadcrumb-item>
                </el-breadcrumb>
            </li>
            <li>
                <div class="li-title"><el-icon :size="30">
                        <ElementPlus />
                    </el-icon>
                    <span>其它</span>
                </div>
                <el-breadcrumb separator="/" v-if="store.state.gsInfo[3]">
                    <el-breadcrumb-item v-for="item in store.state.gsInfo[3].children" :key="item.value"
                        @click="category(item.value)">{{ item.label
                        }}</el-breadcrumb-item>
                </el-breadcrumb>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import api from '@/api/index'
const store = useStore()


// 获取新商品分类数组
api.getGsInfo().then(res => {
    store.commit("changeGsInfo", res.data.data)
})
// 获取原分类数组
api.getGs().then(res => {
    store.commit("changeGs", res.data.data)
})


// 分类页面跳转
const category = (value) => {
    window.open('http://127.0.0.1:8080/Category/' + value)
}
</script>

<style lang="scss" scoped>
.gs {
    box-sizing: border-box;
    width: 26%;
    height: 320px;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);
}

ul {
    box-sizing: border-box;
    width: 100%;
    list-style: none;
    padding-left: 0px;
    padding-right: 20px;
    user-select: none;

    li {
        box-sizing: border-box;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 25px 0px;

        .li-title {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 25%;
        }

        .el-breadcrumb {
            width: 75%;
            display: flex;
            flex-wrap: wrap;
            justify-content: left;

            .el-breadcrumb__item {
                margin-top: 6px;
                font-size: 15px;

                ::v-deep .el-breadcrumb__inner:hover {
                    color: #cc9756 !important;
                    cursor: pointer !important;
                }
            }
        }
    }
}
</style>