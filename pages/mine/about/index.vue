<template>
	<view class="about-container">
		<!-- <view class="list-item">
			<view>如何提问</view>
		</view>
		<view class="list-item">
			<view>诚聘英才</view>
		</view>
		<view class="list-item">
			<view>广告服务</view>
		</view>
		<view class="list-item">
			<view>VIP会员</view>
		</view> -->
		<navigator hover-class="none" url="./principle" class="list-item">
			<view>平台原理</view>
		</navigator>
		<navigator hover-class="none" url="./aboutUs" class="list-item">
			<view>关于我们</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.about-container{
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
	}
</style>
