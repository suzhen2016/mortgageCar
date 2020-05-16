<template>
	<view class="edit-phone">
		<view v-if="type == 1" class="ui-form">新手机号<em>*</em></view>
		<input v-if="type == 1" type="number" v-model="phone" maxlength="11">
		
		<view v-if="type == 2" class="ui-form">邮箱地址<em>*</em></view>
		<input v-if="type == 2" type="number" v-model="email" maxlength="11">
		
		<view v-if="type == 3" class="ui-form">手机号码<em>*</em></view>
		<input v-if="type == 3" type="number" v-model="phone" maxlength="11">
		
		<view v-if="type != 4" class="ui-form">验证码<em>*</em></view>
		<view v-if="type != 4" class="evaluate-btn" @tap="handleEvaluate">点击按钮进行验证</view>
		<view v-if="type != 4" class="next-btn">下一步</view>
		<tfgg-verify ref="verifyElement"></tfgg-verify>
		
		<view v-if="type == 4" class="artificial-container">
			<center class="des">
				<view>请联系网站客服，并提供相关信息</view>
				<view>由客服人工协助找回</view>
			</center>
			<view class="btns">
				<navigator hover-class="none" url="./about/index" class="concat-btn">联系客服</navigator>
				<navigator hover-class="none" open-type="navigateBack"  class="back-btn">返回</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import tfggVerify from '@/components/tfgg-verify/tfgg-verify.vue'
	export default {
		components: {
			 "tfgg-verify":tfggVerify
		},
		data() {
			return {
				phone: '',
				email: '',
				type: '' // 1 修改手机 2 邮箱找回密码 3 手机短信找回密码 4 人工申述
			}
		},
		onLoad(options) {
			this.type = options.type
			if(this.type == 2) {
				uni.setNavigationBarTitle({
					title: '邮箱找回'
				})
			}else if(this.type == 3) {
				uni.setNavigationBarTitle({
					title: '短信找回'
				})
			}else if(this.type == 4) {
				uni.setNavigationBarTitle({
					title: '人工申诉'
				})
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods: {
			handleEvaluate() {
				this.$refs.verifyElement.show();
			}
		}
	}
</script>

<style lang="scss">
	.edit-phone{
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
		input{
			height: 72upx;
			line-height: 72upx;
			padding: 0 12upx;
			background: #eee;
		}
		.evaluate-btn{
			width: 686upx;
			height: 104upx;
			line-height: 104upx;
			text-align: center;
			background: #b7b6b6;
			color: #7b7b7b;
			border-radius: 6upx;
			transition: all .8s;
			font-size: 30upx;
		}
		.next-btn{
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
		.artificial-container{
			.des{
				font-size: 30upx;
				margin: 40upx 0;
			}
			.btns{
				display: flex;
				justify-content: space-between;
				.concat-btn, .back-btn{
					width: 45%;
					margin:  0 3%;
					background: #BB271D;
					height: 84upx;
					line-height: 84upx;
					text-align: center;
					border-radius: 6upx;
					color: #fff;
				}
				.back-btn{
					background: #FFFFFF;
					border: #E4E4E4 1px solid;
					color: #000000;
				}
			}
		}
	}
</style>
