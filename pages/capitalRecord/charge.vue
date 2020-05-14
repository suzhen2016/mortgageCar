<template>
	<view class="charge-container">
		<view class="item top">
			<input type="number" v-model="num" placeholder="支付金额" maxlength="10">
		</view>
		<view class="item bottom">
			支付功能未开通，业务咨询请联系官方客服热线400-087-0081
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: ''
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
	.charge-container{
		.item{
			margin-top: 40upx;
			border-top: #A7A7AA 0.5px solid;
			border-bottom: #A7A7AA 0.5px solid;
			padding: 0 32upx;
			height: 112upx;
			font-size: 28upx;
			color: #666;
			&.bottom{
				border-top: none;
				margin-top: 0;
				display: flex;
				align-items: center;
			}
			input{
				width: 98%;
				height: 68upx;
				line-height: 68upx;
				border: none;
				padding: 0;
				margin: 20upx 0 0 0;
				font-size: 36upx;
			}
		}
	}
</style>
