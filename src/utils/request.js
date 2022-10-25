import Request from 'luch-request';
const BASE_URL = ''

// import qs from 'qs'
const http = new Request({
    baseURL: BASE_URL, //设置请求的base url
    timeout: 300000, //超时时长5分钟,
    header: {
        'Content-Type': 'multipart/form-data;application/json;charset=UTF-8;'
    }
})

//请求拦截器
http.interceptors.request.use(config => { // 可使用async await 做异步操作

    if (config.method === 'POST') {
        config.data = JSON.stringify(config.data);
    }
    return config
}, error => {
    return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use(response => {
    return response
}, error => {

    return Promise.resolve(error)
})
export default http;