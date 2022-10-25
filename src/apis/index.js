import http from '@/utils/request'
import Vue from 'vue'
const api = {}

const requireApiModules = require.context(
    // 当前目录
    '.',
    // 是否查询其子目录
    false,
    // 匹配 API 模块文件名的正则表达式
    /\.\/(?!index).*\.js$/
)

// 自动导入
requireApiModules.keys().forEach(fileName => {
    // 获取模块对象
    const module = requireApiModules(fileName)
    // 通过路径获取模块名
    const moduleName = fileName
        .split('/')
        .pop()
        .split('.')
        .shift()

    api[moduleName] = (module.default || module)(http)
})

Vue.prototype.$api = api;

export default api