<template>
	<view class="bargain-detail">
		<view class="car-name">17年宝马3系</view>
		<view class="form-item">
			<view class="form-label">手机:</view>
			<view class="form-content">
				<input type="text" v-model="phone" maxlength="11">
			</view>
		</view>
		<view class="form-item">
			<view class="form-label">意向价格:</view>
			<view class="form-content">
				<input type="number" v-model="price">
			</view>
		</view>
		<view class="submit-btn">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				price: ''
			}
		},
		onLoad(options) {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.bargain-detail{
		.car-name{
			font-size: 40upx;
			line-height: 44upx;
			padding: 32upx;
			text-align: center;
		}
		.form-item{
			display: flex;
			align-items: center;
			height: 100upx;
			.form-label{
				font-size: 28upx;
				width: 200upx;
				text-align: right;
				margin-right: 20upx;
			}
			.form-content{
				flex: 1;
				input{
					text-indent: 20upx;
					width: 406upx;
					color: #999;
					font-size: 26upx;
					height: 60upx;
					line-height: 60upx;
					border: 1px solid #999;
					border-radius: 10upx;
				}
			}
		}
		.submit-btn{
			width: 340upx;
			height: 68upx;
			line-height: 68upx;
			text-align: center;
			color: #fff;
			font-size: 26upx;
			margin: 20upx auto;
			background-color: #BB271D;
		}
	}
</style>
