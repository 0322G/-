<template></template>

<script setup>
import api from '@/api/index'
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
const store = useStore()
const route = useRoute()
const router = useRouter()

let data = {
    out_trade_no: route.query.out_trade_no,
    trade_no: route.query.trade_no,
    gid: route.params.gid,
    oprice: route.params.oprice,
    onum: route.params.onum,
    oadd: route.params.oadd
};
api.indent(data).then(res => {
    if (res.data.ActionType === "ok") {
        api.getindent(data).then(res => {
            if (res.data.ActionType === "ok") {
                ElMessage.success('支付成功')
                // 购买成功，刷新页面               
                store.commit("changeIsBuy", store.state.isBuy + 1)
                localStorage.setItem('isbuy', store.state.isBuy);
                router.push('/Good/' + data.gid)
            } else {
                ElMessage.error('支付失败!')
            }
        })
    }
})

</script>

<style lang="scss" scoped></style>