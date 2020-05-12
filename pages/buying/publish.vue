<template>
	<view class="buying-publish">
		<view class="ui-form">期望品牌<em>*</em></view>
		<view class="ui-form">求购标题<em>*</em></view>
		<view class="ui-form">所在地区<em>*</em></view>
		<view class="ui-form">级别</view>
		<view class="ui-form">价格<em>*</em></view>
		<view class="ui-form">行驶里程</view>
		<view class="ui-form">车龄</view>
		<view class="ui-form">其他要求</view>
		<view class="ui-form">姓名<em>*</em></view>
		<view class="ui-form">手机<em>*</em></view>
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
		methods:{
			brandOneChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.buying-publish{
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
		select{
			padding: 0 6upx;
			font-size: 28upx;
			height: 64upx;
			line-height: 64upx;
			border: #B2B2B2 1px solid;
			margin: 0 20upx 20upx 0;
			background: #FFFFFF;
		}
	}
</style>
