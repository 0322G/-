import axios from "axios"

const instance = axios.create({
    //网络请求公共配置
})

// 发送数据前拦截
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token")
        config.headers.Authorization = `Bearer ${token}`
        return config;
    },
    error => {
        return Promise.reject(error)
    }
)

// 获取数据前拦截
instance.interceptors.response.use(
    response => {
        const { authorization } = response.headers
        authorization && localStorage.setItem("token", authorization)
        return response;
    },
    error => {
        const { status } = error.response
        if (status === 401) {
            localStorage.removeItem("token")
            window.location.href = "#/login"
        }
        return Promise.reject(error)
    }
)

export default instance