<template>
	<view class="account-detail">
		<view class="list-item">
			<view>个人会员</view>
			<view>免费</view>
		</view><view class="list-item">
			<view>商家会员</view>
			<view>免费</view>
		</view><view class="list-item">
			<view>分站运营商</view>
			<view>￥300000元/年</view>
		</view><view class="list-item">
			<view>至尊加盟商</view>
			<view>￥5800元/年</view>
		</view><view class="list-item">
			<view>黄金加盟商</view>
			<view>￥2880元/年</view>
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
	}
</style>
