import axios from "axios";
import store from "@/store/index";
import { getTimeStamp } from "@/utill/auth";

const timeOut = 3600; // 定义超时时间

const instance = axios.create({
  baseURL: "/api",
  timeout: 3000,
  withCredentials: true,
});
// axios.defaults. = true;
import qs from "qs";
// axios拦截器
// 请求拦截
instance.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        // 如果它为true表示 过期了 // token没用了 因为超时了
        store.dispatch("user/logOut"); // 登出界面
        return Promise.reject(new Error("token超时了"));
      }
      config.headers["Authorization"] = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 超时时间
function IsCheckTimeOut() {
  var currenTime = Date.now(); // 当前时间戳
  var timeStamp = getTimeStamp(); // 缓存时间戳
  return (currenTime - timeStamp) / 1000 > timeOut;
}
export default instance;
