<template>
	<view class="mine-container">
		<view class="container-section-new">
			<view class="person-name">
				<view @tap="goAvatar">
					<image src="/static/image/mine/default.jpg" mode=""></image>
				</view>
				<view class="detail">
					<view class="account" v-if="userInfo">账号: {{userInfo.name}}</view>
					<view class="account" v-if="!userInfo">昵称</view>
					<!-- <view class="sign" @tap="handleSign" v-if="userInfo">今日签到</view> -->
					<navigator hover-class="none" url="/pages/login/login" class="sign" v-if="!userInfo">点击登录</navigator>
					<navigator hover-class="none" url="/pages/login/register" class="sign" v-if="!userInfo">注册</navigator>
				</view>
			</view>
		</view>
		<view class="menus">
			<view  class="menu-item" @tap="goUrl('./information')">
				<image src="/static/image/mine/glzx.png" mode="aspectFit"></image>
				<view>管理中心</view>
			</view>
			<view class="menu-item" @tap="goUrl('/pages/message/index')">
				<image src="/static/image/mine/znxj.png" mode="aspectFit"></image>
				<view>站内信件</view>
			</view>
		</view>
		<view class="list">
			<view class="list-item" v-for="(item, index) in list" :key="index" @tap="goPath(item.url, index)">
				<image :src="item.img" mode="aspectFit"></image>
				<view>{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: null,
				list: [
					{
						img: '/static/image/mine/car.png',
						text: '车源管理',
						url: '/pages/carSource/index'
					},
					// {
					// 	img: '/static/image/mine/group.png',
					// 	text: '团购管理',
					// 	url: ''
					// },
					{
						img: '/static/image/mine/news.png',
						text: '新闻管理',
						url: ''
					},
					{
						img: '/static/image/mine/question.png',
						text: '问答管理',
						url: '/pages/questionManage/index'
					},
					{
						img: '/static/image/mine/shop.png',
						text: '求购管理',
						url: '/pages/buyingManage/index'
					},
					{
						img: '/static/image/mine/phone.png',
						text: '客服电话：18210042149',
						url: '18210042149'
					},
					{
						img: '/static/image/mine/about.png',
						text: '关于我们',
						url: '/pages/mine/about/aboutUs'
					}
				]
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			goAvatar() {
				if(!this.userInfo) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}else{
					uni.navigateTo({
						url: './avatar'
					})
				}
			},
			goUrl(url) {
				if(!this.userInfo) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				}else{
					uni.navigateTo({
						url
					})
				}
			},
			goPath(url, index) {
				if(index == 4) {
					console.log(1)
					return uni.makePhoneCall({
						phoneNumber: url
					})
				}
				if(index == 5) {
					return  uni.navigateTo({
						url
					})
				}
				if(!this.userInfo) {
					return uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				if(url) {
					uni.navigateTo({
						url
					})
				}else{
					uni.showToast({
						title: '您所在的会员组无访问权限',
						icon: 'none'
					})
				}
			},
			handleSign() {
				uni.showToast({
					title: '签到成功'
				})
				setTimeout(() => {
					uni.navigateTo({
						url: './signRecord'
					})
				},1000)
				
			}
		}
	}
</script>

<style lang="scss">
	.mine-container{
		.container-section-new{
			background: url(../../static/image/mine/bg.png) center top no-repeat;
			width: 100%;
			height: 368upx;
			background-size: 100% 368upx;
			display: flex;
			padding: 0 40upx;
			.person-name{
				display: flex;
				align-items: center;
				margin-top: -40upx;
				image{
					width: 150upx;
					height: 150upx;
					margin-right: 20upx;
					border-radius: 50%;
				}
				.detail{
					.account{
						color: #e4e4e4;
						margin-bottom: 14upx;
						font-size: 28upx;
					}
					.sign{
						display: inline-block;
						background: #DD756A;
						color: white;
						font-size: 30upx;
						border-radius: 40upx;
						padding: 10upx 24upx;
						margin-top: 20upx;
						margin-right: 20upx;
					}
				}
			}
		}
		.menus{
			display: flex;
			.menu-item{
				width: 30%;
				margin: 30upx 10%;
				text-align: center;
				font-size: 28upx;
				image{
					width: 80upx;
					height: 60upx;
					margin-bottom: 10upx;
				}
			}
		}
		.list{
			padding-top: 30upx;
			padding: 30upx 20upx 40upx 40upx;
			.list-item{
				display: flex;
				align-items: center;
				color: #2F3540;
				font-size: 28upx;
				height: 110upx;
				image{
					width: 40upx;
					height: 40upx;
					margin-right: 40upx;
				}
			}
		}
	}
</style>
