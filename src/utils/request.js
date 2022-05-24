import axios from 'axios';
import VueCookies from 'vue-cookies'
import { Toast } from 'vant';
import qs from 'qs';
import baseUrl from './baseUrl'
// import router from '@/router'

const service = axios.create({
  baseURL: baseUrl,
  timeout: 5000, // 请求超时时间
  transformRequest: [function (data) {
    if (Object.prototype.toString.call(data) === '[object FormData]') {
      return data
    }
    if (Object.prototype.toString.call(data) === '[object String]') {
      return data
    }
    data = qs.stringify(data);
    return data;
  }]
});

// request拦截器
service.interceptors.request.use(
  config => {
    let token = VueCookies.get('accessToken')
    if(token){
      config.headers['Authorization'] = token;
    } 
    if(config.Accept == 'json'){
      config.headers['Content-Type'] = 'application/json';
    }else{
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    // 请求开始的时间
		config.metadata = { startTime: new Date()}
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// let toastFail, errorFail;
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code == 401 || res.code == 402 || res.code == 403) {
      router.push({ path: "/login" })
      return
    }
    // 请求结束的时间
		response.config.metadata.endTime = new Date()
		// 响应的时间
		response.duration = response.config.metadata.endTime - response.config.metadata.startTime
        
		if(response.duration >= 4000) {
		  Toast.loading({
			 message: '加载中...'
		  })
		}
    return response.data;
  },
  error => {
    Toast({
      message: '网络请求超时！',
      type: 'error'
    });
    return Promise.reject(error);
  }
);

export default service;
