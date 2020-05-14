import $ajax from "../utils";

//发送验证码
export const sendCode = (params) => {
	return $ajax.get({
		url: '/api/v1/sms_send',
		data: params
	})
}
//验证码校验
export const codeCheck = (params) => {
	return $ajax.get({
		url: '/api/v1/sms_check',
		data: params
	})
}
//用户注册
export const useRegister = (params) => {
	return $ajax.POST({
		url: '/api/v1/register',
		data: params
	})
}
//手机号验证码登陆
export const codeLogin = (params) => {
	return $ajax.POST({
		url: '/api/v1/login_by_verify_code',
		data: params
	})
}
//用户名密码登陆
export const userLogin = (params) => {
	return $ajax.POST({
		url: '/api/v1/login_by_verify_passwd',
		data: params
	})
}
//退出登陆
export const loginOut = (params) => {
	return $ajax.POST({
		url: '/api/v1/logout',
		data: params
	})
}
//修改个人资料
export const updateUserDetail = (params) => {
	return $ajax.POST({
		url: '/api/v1/update_user_info',
		data: params
	})
}
//修改头像
export const updateUserAvatar = (params) => {
	return $ajax.POST({
		url: '/api/v1/user_pho_modify',
		data: params
	})
}
//根据用户ID 获取用户信息
export const getUserInfo = (params) => {
	return $ajax.POST({
		url: '/api/v1/get_user_info',
		data: params
	})
}
//获取新闻分类
export const getNewTypes = (params) => {
	return $ajax.get({
		url: '/api/v1/get_news_cat',
		data: params
	})
}
//获取新闻列表
export const getNewList = (params) => {
	return $ajax.get({
		url: '/api/v1/news_list',
		data: params
	})
}
//根据 ID 获取新闻详情
export const getNewDetail = (params) => {
	return $ajax.get({
		url: '/api/v1/news_detail',
		data: params
	})
}