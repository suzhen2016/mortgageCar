<template>
	<view class="find-pwd">
		<navigator hover-class="none" :url="`./send?type=2`" class="list-item">
			<view>通过电子邮箱找回</view>
		</navigator>
		<navigator hover-class="none" :url="`./send?type=3`" class="list-item">
			<view>通过手机短信找回</view>
		</navigator>
		<navigator hover-class="none" :url="`./send?type=4`" class="list-item">
			<view>联系客服人工申诉</view>
		</navigator>
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
	.find-pwd{
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
