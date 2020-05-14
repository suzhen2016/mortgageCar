<template>
	<view class="add-address">
		<view class="ui-form">所在地区<em>*</em></view>
		<view></view>
		<view class="ui-form">详细地址<em>*</em></view>
		<view>
			<input type="text" v-model="addressDetail" class="input">
		</view>
		<view class="ui-form">邮政编码<em>*</em></view>
		<view>
			<input type="number" v-model="emailCode" class="input">
		</view>
		<view class="ui-form">真实姓名<em>*</em></view>
		<view>
			<input type="text" v-model="realName" class="input">
		</view>
		<view class="ui-form">手机号码<em>*</em></view>
		<view>
			<input type="number" v-model="telPhone" class="input" maxlength="11">
		</view>
		<view class="ui-form">电话号码</view>
		<view>
			<input type="number" v-model="phone" class="input">
		</view>
		<view class="ui-form">显示顺序</view>
		<view>
			<input type="number" v-model="order" class="input">
		</view>
		<view class="submit-btn">添加</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressDetail: '',
				emailCode: '',
				realName: '',
				telPhone: '',
				phone: '',
				order: ''
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
	.add-address{
		padding: 0 32upx;
		.ui-form{
			padding: 32upx 0;
			font-size: 32upx;
			em{
				padding-left: 12upx;
				font-size: 24upx;
				color: #FF0000;
			}
		}
		.input{
			height: 64upx;
			line-height: 64upx;
			border: #B2B2B2 1px solid;
			padding: 0 12upx;
			font-size: 28upx;
		}
		.submit-btn{
			width: 680upx;
			height: 84upx;
			line-height: 84upx;
			text-align: center;
			background: #BB271D;
			color: #fff;
			margin: 40upx auto;
		}
	}
</style>
