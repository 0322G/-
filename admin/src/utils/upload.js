import api from '@/api/index'

function upload(userForm) {
    // 图片是文件数据，特殊存储传递
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    return api.getUpload(params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
}

export default upload