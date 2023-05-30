<template>
    <el-upload class="avatar-uploader" action="" :show-file-list="false" :auto-upload="false" :on-change="handleChange">
        <img v-if="props.avatar" :src="uploadAvatar" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
            <Plus />
        </el-icon>
    </el-upload>
</template>

<script setup>
import { defineEmits, defineProps, computed } from 'vue';
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
    avatar: String
})

// 每次更改图片后将新图片回调
const emit = defineEmits(["change"])
const handleChange = (file) => {
    emit("change", file.raw)
}

//检验图片是否更新
const uploadAvatar = computed(() => props.avatar.includes("blob") ? props.avatar : 'http://localhost:3000' + props.avatar)

</script>

<style lang="scss" scoped>
::v-deep .el-avatar {
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }
}

::v-deep .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

::v-deep .el-upload:hover {
    border-color: var(--el-color-primary);
}

::v-deep .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    text-align: center;
}

.avatar {
    width: 200px;
    height: 200px;
    object-fit: cover;
}
</style>