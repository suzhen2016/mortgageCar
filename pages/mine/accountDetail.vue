<template>
	<view class="account-detail">
		<view class="list-item">
			<view>会员名</view>
			<view>ccc</view>
		</view>
		<view class="list-item">
			<view>昵称</view>
			<view>ccc</view>
		</view>
		<view class="list-item">
			<view>会员组</view>
			<view>个人会员</view>
		</view>
		<view class="list-item">
			<view>上次登录</view>
			<view>2020-05-07 14:39</view>
		</view>
		<view class="list-item">
			<view>注册时间</view>
			<view>2020-04-27 16:48</view>
		</view>
		<navigator hover-class="none" url="./grade" class="level-btn">会员升级</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './grade'
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.account-detail{
		padding-top: 40upx;
		.list-item{
			font-size: 28upx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-left: 30upx;
			height: 88upx;
			line-height: 88upx;
			padding: 0 72upx 0 0;
			border-top: #D9D9D9 1upx dashed;
			border-bottom: #D9D9D9 2upx dashed;
			background: url("/static/image/mine/list-set.png") no-repeat right center;
			background-size: 46upx 26upx;
		}
		.level-btn{
			width: 686upx;
			background: #BB271D;
			height: 84upx;
			line-height: 84upx;
			border-radius: 6upx;
			color: #FFFFFF;
			font-size: 26upx;
			text-align: center;
			margin: 40upx auto;
		}
	}
</style>
