
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
