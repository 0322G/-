// 导入时间中文格式化库
import moment from "moment"
moment.locale("zh-cn")

const formatTime = {
    getTime: (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
}

export default formatTime