# uniapp使用初步总结
## 一、项目初始化
跟着官方文档走

推荐选择uni-ui/uni-app模板皆可以，看个人需求，

![](https://imgkr2.cn-bj.ufileos.com/59b9725e-1070-4949-b695-d75e15f2bb05.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=3FzOl%252FxBKu2We87TQe2HjhCcvRc%253D&Expires=1612600601)

对文件目录作出一些小修改（个人喜欢及喜好）
1. 文件目录说明
* config文件夹：统一管理可配置的信息和变量
* globalData.js：全局变量统一管理文件（相当于vuex）；
2. servers文件件：接口请求服务管理文件夹；
* apis文件夹：request请求封装管理和接口api配置管理文件夹；
* request.js：对wx.request的Promise封装；
* xxx.js：对应模块的接口管理文件；
* requestFilter.js：接口请求和响应拦截封装文件；
3. 其他不过多描述

![](https://imgkr2.cn-bj.ufileos.com/a5638166-ea05-403a-858a-7042cc512931.png?UCloudPublicKey=TOKEN_8d8b72be-579a-4e83-bfd0-5f6ce1546f13&Signature=CwyBZUTAX3fl35VbyRoPkeBqN3Q%253D&Expires=1612600769)

### ui框架推荐
个人推荐 uViewUI 具体看个人需求


![](https://static01.imgkr.com/temp/ba7ac480f1384032ac0db7837a0cedaa.png)


## 二、接口封装请求
uniapp 插件市场有许多封装好的组件看个人喜好使用，个人推荐使用promise自行封装，保证后续可控性及维护性，借鉴axios封装

### request.js
``` js

import formatError from "./requestFilter"
const app = getApp()
const request = (method, url, data) => {
	//设置请求头
	const header = {

	}
	//promise封装一层，使得调用的时候直接用then和catch接收
	return new Promise((resolve, reject) => {
		uni.request({
			method: method,
			url: app.globalData.host + url, //完整的host
			data: data,
			header: header,
			success(res) {
				//对成功返回的请求进行数据管理和统一逻辑操作
				if (res.statusCode === 200) { //请求返回成功
					if (res.data && res.data.code === "SUCCESS") { //后端对接口请求处理成功，返回数据给接口调用处
						resolve(res.data) //then接收
					} else { //后端对也请求判断后认为不合逻辑报错
						formatError(res) //统一的报错处理逻辑
						reject(res.data) //catch接收
					}
				} else {
					reject(res.data) //catch接收
				}

			},
			fail(err) {
				uni.showToast({
					title: '网络异常，稍后再试！',
					mask: true,
					icon: 'none',
					duration: 3000
				})
			}
		})
	})
}
export default request;

```
### 具体使用
以user.js为例
``` js
import request from "../request";

// 获取用户openid
export const usrInfos = data => request("POST", "/user/usrInfos", data);
```

### 页面调用
``` js
<script>
	import { usrInfos } from "../../servers/apis/user"
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			login(){
				usrInfos().then(res=>{
					
				})
			}
		},
		onLoad() {
			this.login()
		}
	}
</script>
```

## 接口请求拦截及相应拦截封装
注意：拦截需明确接口返回字段格式及约定好返回码规范

### requestFilter.js
``` js
/**
 * 对接口返回的后端错误进行格式转化
 * @param {接口成功返回的数据} res 
 */
const formatError = (err) =>{
  uni.showToast({
    title: err.message,
    mask: false,
    icon: 'none',
    duration: 3000
  })
};

export default formatError;

```

## 关于数据管理
uniapp全局变量相关：<a href="https://ask.dcloud.net.cn/article/35021">链接</a>
推荐使用vuex或globalData方式，我这里使用小程序的globalData方式

<font color="red">官方：小程序中有个globalData概念，可以在 App 上声明全局变量。 Vue 之前是没有这类概念的，但 uni-app 引入了globalData概念，并且在包括H5、App等平台都实现了。</font>

<font color="red">后续在多平台上具体是否有兼容性问题未知</font>
### globalData.js
``` js
export default {
	host: "http://www.wawow.xyz/api/test", //接口请求的域名和接口前缀 

}

```

### 挂载
``` js
import Vue from 'vue'
import App from './App'
import globalData from './config/globalData.js'
Vue.config.productionTip = false

App.mpType = 'app'
App.globalData = globalData
const app = new Vue({
    ...App
})
app.$mount()

```
