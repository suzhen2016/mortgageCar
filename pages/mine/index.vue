<template>
	<view class="mine-container">
		<view class="container-section-new">
			<view class="person-name">
				<img src="/static/image/mine/default.jpg" alt="">
				<view class="detail">
					<view class="account">账号: jkjssd</view>
					<view class="sign" @tap="handleSign">今日签到</view>
				</view>
			</view>
		</view>
		<view class="menus">
			<navigator hover-class="none" url="./information" class="menu-item">
				<img src="../../static/image/mine/glzx.png" alt="">
				<view>管理中心</view>
			</navigator>
			<view class="menu-item">
				<img src="../../static/image/mine/znxj.png" alt="">
				<view>站内信件</view>
			</view>
		</view>
		<view class="list">
			<view class="list-item" v-for="(item, index) in list" :key="index" @tap="goPath(item.url)">
				<img :src="item.img" alt="">
				<view>{{item.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						img: '/static/image/mine/car.png',
						text: '车源管理',
						url: ''
					},
					{
						img: '/static/image/mine/group.png',
						text: '团购管理',
						url: ''
					},
					{
						img: '/static/image/mine/news.png',
						text: '新闻管理',
						url: ''
					},
					{
						img: '/static/image/mine/question.png',
						text: '问答管理',
						url: ''
					},
					{
						img: '/static/image/mine/shop.png',
						text: '求购管理',
						url: ''
					},
					{
						img: '/static/image/mine/phone.png',
						text: '客服电话：400-087-0081',
						url: ''
					},
					{
						img: '/static/image/mine/about.png',
						text: '关于我们',
						url: './aboutUs'
					}
				]
			}
		},
		methods: {
			goPath(url) {
				uni.navigateTo({
					url
				})
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
				img{
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
						background: #DD756A;
						color: white;
						font-size: 30upx;
						border-radius: 40upx;
						padding: 10upx 24upx;
						margin-top: 20upx;
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
				img{
					width: 80upx;
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
				img{
					width: 40upx;
					height: 40upx;
					margin-right: 40upx;
				}
			}
		}
	}
</style>
