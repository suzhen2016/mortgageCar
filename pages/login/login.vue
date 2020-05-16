<template>
	<view class="login-container">
		<qi-loading></qi-loading>
		<view class="input-item">
			<input type="text" v-model="username"  maxlength="11" placeholder="用户名/已认证手机">
		</view>
		<view class="input-item">
			<input type="password" v-model="password" maxlength="11" placeholder="请填写密码">
		</view>
		<view class="login-btn" @tap="handleLogin">登录</view>
		<view class="login-bottom">
			<navigator hover-class="none" url="./register" class="item">会员注册</navigator>
			<navigator hover-class="none" url="./messageLogin" class="btn item">短信登录</navigator>
			<navigator hover-class="none" url="/pages/mine/findPwd" class="item">忘记密码?</navigator>
		</view>
		<view class="login-types">
			<view class="weixin">
				<image src="/static/image/mine/icon.png" mode=""></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './register'
			})
		},
		methods: {
			handleLogin() {
				if(!this.username) {
					return this.$alert('请输入手机号码')
				}
				if(!this.password) {
					return this.$alert('请输入密码')
				}
				this.$api.userLogin({
					username: this.username,
					password: this.password,
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
	.login-container{
		padding-top: 40upx;
		.input-item{
			width: 88%;
			margin: 0 auto;
			margin-bottom: 20upx;
			background: #eee;
			border-radius: 10upx;
			padding: 0 2%;
			height: 90upx;
			input{
				width: 98%;
				height: 88upx;
				line-height: 88upx;
				font-size: 32upx;
				margin: 20upx 0 0 0;
			}
		}
		.login-btn{
			width: 686upx;
			height: 84upx;
			line-height: 84upx;
			text-align: center;
			background: #BB271D;
			color: #fff;
			margin: 40upx auto 10upx;
		}
		.login-bottom{
			display: flex;
			align-items: center;
			padding: 34upx 32upx;
			.item{
				flex: 1;
				line-height: 48upx;
				text-align: center;
				font-size: 28upx;
				color: #aaa;
			}
			.btn{
				color: #f57c13;
			}
		}
		.login-types{
			text-align: center;
			image{
				width: 64upx;
				height: 64upx;
			}
		}
	}
</style>