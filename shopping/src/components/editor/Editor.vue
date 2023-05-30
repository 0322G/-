<template>
    <div id="myeditor">
    </div>
</template>

<script setup>
import { onMounted, defineEmits, toRefs } from "vue";
import E from "wangeditor";

const emit = defineEmits(["event"])
const props = defineProps({
    content: {
        type: String,
    },
})

onMounted(() => {
    // 创建编辑框
    const editor = new E("#myeditor")
    editor.create()

    // 设置初始值
    editor.txt.html(props.content)

    // 获取编辑框内容
    editor.config.onchange = function (newHtml) {
        // 子传父
        emit("event", newHtml)
    }
})
</script>

<style lang="scss" scoped></style>