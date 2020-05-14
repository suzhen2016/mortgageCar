<template>
	<view class="validate-container">
		<view class="item">
			<view>手机认证</view>
			<view class="pass-type pass">已通过</view>
		</view>
		<view class="item">
			<view>实名认证</view>
			<view class="pass-type">已通过</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		}
	}
</script>

<style lang="scss">
	.validate-container{
		.item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 88upx;
			line-height: 88upx;
			border-bottom: #D9D9D9 1px dashed;
			border-top: #D9D9D9 1px dashed;
			padding: 0 72upx 0 30upx;
			background: url(/static/image/mine/list-set.png) no-repeat right center;
			background-size: 46upx 26upx;
			font-size: 28upx;
			.pass-type{
				font-size: 24upx;
			}
			.pass{
				color: green;
			}
		}
	}
</style>
