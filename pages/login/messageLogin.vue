<template>
	<view class="register-container">
		<qi-loading></qi-loading>
		<view class="input-item">
			<input type="number" v-model="phone"  maxlength="11" placeholder="已认证手机号">
		</view>
		<view class="evaluate-btn" @tap="handleEvaluate">点击按钮进行验证</view>
		<view class="input-item">
			<input type="text" v-model="code" maxlength="6" placeholder="请输入验证码" class="code-input">
			<view class="code-btn" @tap="getCode">{{hasSend ? `重新发送(${codeTime}秒)` : '发送短信'}}</view>
		</view>
		<view class="next-btn" @tap="handleLogin">登录</view>
		
		<tfgg-verify ref="verifyElement"></tfgg-verify>
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
				code: '',
				evaluateCode: '',
				hasSend: false,
				codeTime: 180,
				timer: null
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		onHide() {
			if(this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},
		methods: {
			handleEvaluate() {
				this.$refs.verifyElement.show();
			},
			getCode() {
				if(!this.hasSend) {
					if(!(/^1[3456789]\d{9}$/.test(this.phone))) {
						return this.$alert('请输入手机号码')
					}
					this.$api.sendCode({
						phone: this.phone
					}).then(res => {
						this.evaluateCode = res.result.code
						this.hasSend = true
						this.timer = setInterval(() => {
							this.codeTime -= 1
							if(this.codeTime == 0) {
								this.codeTime = 180
								clearInterval(this.timer)
								this.hasSend = false
							}
						},1000)
					})
				}
			},
			handleLogin() {
				if(!(/^1[3456789]\d{9}$/.test(this.phone))) {
					return this.$alert('请输入手机号码')
				}
				if(this.code != this.evaluateCode) {
					return this.$alert('验证码错误')
				}
				this.$api.codeLogin({
					phone: this.phone,
					code: this.code,
				}).then(res => {
					this.$alert('登录成功')
					uni.setStorageSync('token', res.result.token)
					uni.setStorageSync('userInfo', res.result)
					uni.reLaunch({
						url: '/pages/mine/index'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.register-container{
		padding-top: 40upx;
		.input-item{
			width: 88%;
			margin: 0 auto;
			margin-bottom: 20upx;
			background: #eee;
			border-radius: 10upx;
			padding: 0 2%;
			height: 90upx;
			display: flex;
			input{
				width: 98%;
				height: 90upx;
				line-height: 90upx;
				font-size: 32upx;
				&.code-input{
					width: 60%;
				}
			}
			.code-btn{
				width: 38%;
				color: #f57c13;
				font-size: 32upx;
				height: 90upx;
				line-height: 90upx;
				text-align: center;
			}
		}
		.agreement-container{
			align-items: center;
			background: none;
			font-size: 28upx;
			margin-top: 40upx;
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
			margin: 40upx auto;
		}
		.next-btn{
			width: 672upx;
			height: 84upx;
			line-height: 84upx;
			text-align: center;
			background: #BB271D;
			color: #fff;
			margin: 40upx auto 10upx;
		}
	}
</style>