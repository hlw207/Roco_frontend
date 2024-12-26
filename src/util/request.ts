import axios, {AxiosError, type AxiosRequestConfig, type AxiosResponse} from "axios"
import {SERVER_ADDR} from "@/config"
import {useUserInfoStore} from "@/stores/user";
import router from "@/router";
import {ElMessage} from "element-plus";
import JSONBIG from 'json-bigint';

// 封装一下发起请求的部分, 便于本地测试时调用
function request(args: AxiosRequestConfig<any>) {
    args.baseURL = SERVER_ADDR
    args.timeout = 50000
    args.withCredentials = true

    axios.defaults.transformResponse = [
        function (data) {
            const json = JSONBIG({
                storeAsString: true
            })
            return json.parse(data)
        }
    ]

    // 创建请求拦截器
    axios.interceptors.request.use(
        (config) => {
            console.log(document.cookie)
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 创建响应拦截器
    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            // 处理响应数据
            console.log('jxd is a sb')
            // 检查响应数据中的code字段
            if (response.data.code === 100003) {
                console.log('token 过期');
                const user = useUserInfoStore()
                user.token = user.name = user.id = ''
                ElMessage.warning('登录过期')
                router.push('/login')
            }
            return response;
        },
        (error: AxiosError) => {
            const user = useUserInfoStore()
            // 处理响应错误
            if (error.response && error.response.status === 401) {
                // token失效，进行相应处理，例如跳转到登录页面
                console.log('Token has expired or is invalid');
                // 这里可以添加跳转到登录页面的代码
                router.push('/login')
                user.id = ''
                user.name = ''
                user.token = ''
            }
            return Promise.reject(error);
        }
    );

    return axios.request(args)
}

export { request }