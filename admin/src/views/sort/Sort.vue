<template>
    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 商品分类管理 </span>
        </template>
        <div style="margin: 30px 0px 0px 50px; ">
            <span>(注:商品有两级分类,一级分类默认四种,可以对二级分类进行增删操作)</span>
        </div>
    </el-page-header>
    <!-- 商品分类菜单 -->
    <el-menu default-active="2" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title><el-icon size="large">
                    <Reading />
                </el-icon>书籍</template>
            <el-menu-item v-for="item in store.state.gsInfo[0].children" :key="item.value">
                <template #title>
                    {{ item.label }}
                    <el-icon @click="deletegs(item)">
                        <CircleClose />
                    </el-icon>
                </template>
            </el-menu-item>
            <el-menu-item>
                <el-input v-if="inputVisible1" ref="InputRef1" v-model="inputValue1" @keyup.enter="handleInputConfirm1"
                    @blur="handleInputConfirm1" style="width: 50%;" />
                <el-button v-else @click="showInput1">
                    添加子分类
                </el-button>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title><el-icon size="large">
                    <Camera />
                </el-icon>电子</template>
            <el-menu-item v-for="item in store.state.gsInfo[1].children" :key="item.value">
                <template #title>
                    {{ item.label }}
                    <el-icon @click="deletegs(item)">
                        <CircleClose />
                    </el-icon>
                </template>
            </el-menu-item>
            <el-menu-item>
                <el-input v-if="inputVisible2" ref="InputRef2" v-model="inputValue2" @keyup.enter="handleInputConfirm2"
                    @blur="handleInputConfirm2" style="width: 50%;" />
                <el-button v-else @click="showInput2">
                    添加子分类
                </el-button>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title><el-icon size="large">
                    <Orange />
                </el-icon>生活用品</template>
            <el-menu-item v-for="item in store.state.gsInfo[2].children" :key="item.value">
                <template #title>
                    {{ item.label }}
                    <el-icon @click="deletegs(item)">
                        <CircleClose />
                    </el-icon>
                </template>
            </el-menu-item>
            <el-menu-item>
                <el-input v-if="inputVisible3" ref="InputRef3" v-model="inputValue3" @keyup.enter="handleInputConfirm3"
                    @blur="handleInputConfirm3" style="width: 50%;" />
                <el-button v-else @click="showInput3">
                    添加子分类
                </el-button>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title><el-icon size="large">
                    <ElementPlus />
                </el-icon>其它</template>
            <el-menu-item v-for="item in store.state.gsInfo[3].children" :key="item.value">
                <template #title>
                    {{ item.label }}
                    <el-icon @click="deletegs(item)">
                        <CircleClose />
                    </el-icon>
                </template>
            </el-menu-item>
            <el-menu-item>
                <el-input v-if="inputVisible4" ref="InputRef4" v-model="inputValue4" @keyup.enter="handleInputConfirm4"
                    @blur="handleInputConfirm4" style="width: 50%;" />
                <el-button v-else @click="showInput4">
                    添加子分类
                </el-button>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>

    <el-divider>
        <el-icon><star-filled /></el-icon>
    </el-divider>

    <!-- 导航条 -->
    <el-page-header icon="" title="学生物品交易系统">
        <template #content>
            <span class="text-large font-600 mr-3"> 首页轮播图管理 </span>
        </template>
        <div style="margin: 30px 0px 0px 50px; ">
            <span>(注:将想要展示的商品id加入标签中)</span>
        </div>
    </el-page-header>
    <!-- 首页轮播图管理 -->
    <el-card>
        <el-tag v-for="item in dynamicTags" :key="item.id" class="mx-1" closable :disable-transitions="false" size="large"
            @close="handleClose(item)" type="success" effect="dark">
            {{ item.id }}
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20"
            @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" style="width: 100px;" />
        <el-button v-else class="button-new-tag ml-1" @click="showInput">
            添加商品
        </el-button>
        <!-- 轮播图 -->
        <div class="carousel">
            <el-carousel>
                <el-carousel-item v-for="item in dynamicTags" :key="item.id">
                    <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.avatar})` }"></div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </el-card>
</template>

<script setup>
import api from '@/api/index'
import { ElMessage } from "element-plus"
import { useStore } from "vuex"
const store = useStore()
import { nextTick, ref } from 'vue'
import { ElInput } from 'element-plus'

const inputValue = ref('')
const dynamicTags = ref(store.state.carousel)
const inputVisible = ref(false)
const InputRef = ref()

const inputValue1 = ref('')
const inputVisible1 = ref(false)
const InputRef1 = ref()

const inputValue2 = ref('')
const inputVisible2 = ref(false)
const InputRef2 = ref()

const inputValue3 = ref('')
const inputVisible3 = ref(false)
const InputRef3 = ref()

const inputValue4 = ref('')
const inputVisible4 = ref(false)
const InputRef4 = ref()

// 删除商品分类
const deletegs = async (item) => {
    await api.deletegs(item).then(res => {
        if (res.data.ActionType === 'ok') {
            // 更新新商品分类数组
            api.getGsInfo().then(res => {
                store.commit("changeGsInfo", res.data.data)
            })
            // 更新原分类数组
            api.getGs().then(res => {
                store.commit("changeGs", res.data.data)
            })
            ElMessage.success("分类已删除")
        } else {
            ElMessage.error('尚有商品处于该分类中,暂无法删除!')
        }
    })
}

// 显示输入框
const showInput1 = () => {
    inputVisible1.value = true
    nextTick(() => {
        InputRef1.value.input.focus()
    })
}
// 显示输入框
const showInput2 = () => {
    inputVisible2.value = true
    nextTick(() => {
        InputRef2.value.input.focus()
    })
}
// 显示输入框
const showInput3 = () => {
    inputVisible3.value = true
    nextTick(() => {
        InputRef3.value.input.focus()
    })
}
// 显示输入框
const showInput4 = () => {
    inputVisible4.value = true
    nextTick(() => {
        InputRef4.value.input.focus()
    })
}

// 确认添加子分类
const handleInputConfirm1 = async () => {
    if (inputValue1.value) {
        await api.addgs({ sname: inputValue1.value, sparent: 1 }).then(res => {
            if (res.data.ActionType === 'ok') {
                // 更新新商品分类数组
                api.getGsInfo().then(res => {
                    store.commit("changeGsInfo", res.data.data)
                })
                // 更新原分类数组
                api.getGs().then(res => {
                    store.commit("changeGs", res.data.data)
                })
            }
        })
    }
    inputVisible1.value = false
    inputValue1.value = ''
}
// 确认添加子分类
const handleInputConfirm2 = async () => {
    if (inputValue2.value) {
        await api.addgs({ sname: inputValue2.value, sparent: 2 }).then(res => {
            if (res.data.ActionType === 'ok') {
                // 更新新商品分类数组
                api.getGsInfo().then(res => {
                    store.commit("changeGsInfo", res.data.data)
                })
                // 更新原分类数组
                api.getGs().then(res => {
                    store.commit("changeGs", res.data.data)
                })
            }
        })
    }
    inputVisible2.value = false
    inputValue2.value = ''
}
// 确认添加子分类
const handleInputConfirm3 = async () => {
    if (inputValue3.value) {
        await api.addgs({ sname: inputValue3.value, sparent: 3 }).then(res => {
            if (res.data.ActionType === 'ok') {
                // 更新新商品分类数组
                api.getGsInfo().then(res => {
                    store.commit("changeGsInfo", res.data.data)
                })
                // 更新原分类数组
                api.getGs().then(res => {
                    store.commit("changeGs", res.data.data)
                })
            }
        })
    }
    inputVisible3.value = false
    inputValue3.value = ''
}
// 确认添加子分类
const handleInputConfirm4 = async () => {
    if (inputValue4.value) {
        await api.addgs({ sname: inputValue4.value, sparent: 4 }).then(res => {
            if (res.data.ActionType === 'ok') {
                // 更新新商品分类数组
                api.getGsInfo().then(res => {
                    store.commit("changeGsInfo", res.data.data)
                })
                // 更新原分类数组
                api.getGs().then(res => {
                    store.commit("changeGs", res.data.data)
                })
            }
        })
    }
    inputVisible4.value = false
    inputValue4.value = ''
}

// 轮播图删除
const handleClose = async (item) => {
    await api.deleteCarousel(item).then(res => {
        if (res.data.ActionType === 'ok') {
            // 更新轮播图信息
            api.carousel().then(res => {
                store.commit("changeCarousel", res.data.data)
                dynamicTags.value = store.state.carousel
            })
        }
    })
}
// 显示输入框
const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}
// 确认添加轮播图图片
const handleInputConfirm = async () => {
    if (inputValue.value) {
        const num = Number(inputValue.value)
        var bool = false
        store.state.goodsInfo.forEach((item) => {
            if (item.id === num) {
                bool = true
            }
        })
        console.log(bool);
        if (bool) {
            await api.addcarousel({ gid: inputValue.value }).then(res => {
                if (res.data.ActionType === 'ok') {
                    // 更新轮播图信息
                    api.carousel().then(res => {
                        store.commit("changeCarousel", res.data.data)
                        dynamicTags.value = store.state.carousel
                    })
                }
            })
        } else {
            ElMessage.error("请输入正确的商品编号！")
        }
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
    width: 30%;
    margin: 10px 0px 100px 50px;
    border: 1px solid #cc9756;
    border-radius: 10px;
}

.el-menu-item {
    display: flex;
    justify-content: space-between;
    cursor: default;

    svg {
        cursor: pointer;

        &:hover {
            color: red;
        }
    }
}

.el-card {
    margin-top: 20px;
    margin-bottom: 100px;
    width: 60%;
    border: 1px solid #cc9756;
    border-radius: 15px;
    background-color: rgb(240, 240, 240);
}

.el-tag {
    margin-right: 10px;
    user-select: none;
}

.carousel {
    box-sizing: border-box;
    width: 400px;
    height: 300px;
    margin: 20px auto 0px;
}

.el-carousel__item .image {
    width: 100%;
    height: 300px;
    background-size: cover;
    cursor: pointer;
}
</style>