import api from '@/api/index'

function addgoods(goodsForm) {
    // 图片是文件数据，特殊存储传递
    const params = new FormData()
    for (let i in goodsForm) {
        params.append(i, goodsForm[i])
    }
    return api.addGoods(params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export default addgoods