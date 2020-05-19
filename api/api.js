import $ajax from "../utils";


//发送验证码
export const sendCode = (params) => {
	return $ajax.get({
		url: '/api/v1/sms_send/',
		data: params
	})
}
//验证码校验
export const codeCheck = (params) => {
	return $ajax.get({
		url: '/api/v1/sms_check/',
		data: params
	})
}
//用户注册
export const useRegister = (params) => {
	return $ajax.post({
		url: '/api/v1/register/',
		data: params
	})
}
//手机号验证码登陆
export const codeLogin = (params) => {
	return $ajax.post({
		url: '/api/v1/login_by_verify_code/',
		data: params
	})
}
//用户名密码登陆
export const userLogin = (params) => {
	return $ajax.post({
		url: '/api/v1/login_by_verify_passwd/',
		data: params
	})
}
//退出登陆
export const loginOut = (params) => {
	return $ajax.post({
		url: '/api/v1/logout/',
		data: params
	})
}
//修改个人资料
export const updateUserDetail = (params) => {
	return $ajax.post({
		url: '/api/v1/update_user_info/',
		data: params
	})
}
//修改头像
export const updateUserAvatar = (params) => {
	return $ajax.post({
		url: '/api/v1/user_pho_modify/',
		data: params
	})
}
//根据用户ID 获取用户信息
export const getUserInfo = (params) => {
	return $ajax.post({
		url: '/api/v1/get_user_info/',
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
//获取车源列表
export const getCarList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_cars_list/',
		data: params
	})
}
//获取车详情
export const getCarDetail = (params) => {
	return $ajax.post({
		url: '/api/v1/get_car_detail/',
		data: params
	})
}
//获取求购车列表
export const getCarBuyList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_request_buy_list/',
		data: params
	})
}
//获取求购车详情
export const getCarBuyDetail = (params) => {
	return $ajax.post({
		url: '/api/v1/get_request_buy_detail/',
		data: params
	})
}
//获取字母排列地址
export const getLetterAddressList = (params) => {
	return $ajax.get({
		url: '/api/v1/get_level_address_list/',
		data: params
	})
}
//首页数据
export const getHomeData = (params) => {
	return $ajax.get({
		url: '/api/v1/get_index/',
		data: params
	})
}
//提交问答接口
export const createQuestion = (params) => {
	return $ajax.post({
		url: '/api/v1/create_question/',
		data: params
	})
}
// 获取问答列表接口
export const getQuestionList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_question_list/',
		data: params
	})
}
// 获取问答详情接口
export const getQuestionDetail = (params) => {
	return $ajax.post({
		url: '/api/v1/get_question_by_id/',
		data: params
	})
}
//关闭或者打开问答
export const operatorQuestion = (params) => {
	return $ajax.post({
		url: '/api/v1/open_close_question/',
		data: params
	})
}
// 问答回复接口
export const replyQuestion = (params) => {
	return $ajax.post({
		url: '/api/v1/create_question_reply/',
		data: params
	})
}
// 删除问答
export const deleteQuestion = (params) => {
	return $ajax.post({
		url: '/api/v1/delete_question/',
		data: params
	})
}
//创建站内信件
export const createMessage = (params) => {
	return $ajax.post({
		url: '/api/v1/create_bot_msg/',
		data: params
	})
}
//关闭或者打开站内信件
export const operatorMessage = (params) => {
	return $ajax.post({
		url: '/api/v1/open_close_bot_msg/',
		data: params
	})
}
// 获取站内信件列表
export const getMessageList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_bot_msg/',
		data: params
	})
}
//获取站内信件详情
export const getMessageDetail = (params) => {
	return $ajax.post({
		url: '/api/v1/get_bot_msg_by_id/',
		data: params
	})
}
//删除站内信件
export const deleteMessage = (params) => {
	return $ajax.post({
		url: '/api/v1/delete_bot_msg/',
		data: params
	})
}
//获取一级地址，根据一级地址 ID 获取二级地址
export const getAddressList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_address_list/',
		data: params
	})
}
//根据 brand_level 获取对应的级别品牌
export const getLevelBrandList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_leval_brand_list/',
		data: params
	})
}
//获取所有字母的一级品牌列表  根据一级品牌 ID 获取二级品牌
export const getBrandList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_brand_list/',
		data: params
	})
}
// 获取车子级别表
export const getCarLevelList = (params) => {
	return $ajax.post({
		url: '/api/v1/get_car_level/',
		data: params
	})
}
//创建求购车辆信息接口
export const createRequestBuy = (params) => {
	return $ajax.post({
		url: '/api/v1/create_request_buy/',
		data: params
	})
}
//提交估价信息接口
export const createValuation = (params) => {
	return $ajax.post({
		url: '/api/v1/create_valuation/',
		data: params
	})
}
//提交卖车买车信息接口
export const createCar = (params) => {
	return $ajax.post({
		url: '/api/v1/create_car/',
		data: params
	})
}