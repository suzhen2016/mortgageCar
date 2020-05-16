/*
	lane
	封装uni-app请求
*/
import $store from "../store";
import config from "../config.js";
function alert (msg){
	if(!msg){
		return
	}
	uni.showToast({
		title:msg,
		icon:'none'
	})
};

function request(params, method, header) {
	// let token = uni.getStorageSync("token") || '39cynet-76358255-2095-4dd9-932c-274702f99435';
	let token = '39cynet-76358255-2095-4dd9-932c-274702f99435';
	return new Promise(function(resolve, reject) {
		$store.commit("switch_loading", "1")
		uni.request({
			url: config.base_url + params.url,
			data: params.data,
			method: method,
			header: Object.assign({
				"Api-Token": token,
				'Auth-Token': uni.getStorageSync("token"),
				"content-type": 'application/x-www-form-urlencoded'
			}, header),
			dataType: 'json',
			success(res) {
				// 成功回调
				if (res.statusCode == 200) {
					if(res.data.ok == true) {
						resolve(res.data)
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						reject(res.data.msg)
					}
				} else {
					uni.showToast({
						title: '请求数据失败:' + res.statusCode,
						icon: 'none'
					})
				}
				$store.commit("switch_loading", "0")
			},
			fail(e) {
				console.log(e)
				uni.showToast({
					title: '请求失败~',
					icon: "none"
				})
				reject(e)
				$store.commit("switch_loading", "0")
				// 失败回调
			},
			complete() {
				// 无论成功或失败 只要请求完成的 回调
				$store.commit("switch_loading", "0")
			}
		})
	})
};
export default {
	async get(params) {
		return await request(params, "GET");
	},
	async post(params,header) {
		return await request(params, "POST", header)
	},
	async put(params) {
		return await request(params, "PUT");
	},
	async delete(params) {
		return await request(params, "DELETE")
	},
}
