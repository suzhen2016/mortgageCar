<template>
	<view class="loading_box" v-show="is_loading=='1'" @click="switch_loading">
		<view class="loading">
			<image class="rotate" src="/static/loading2.png" mode=""></image>
		</view>

		<!-- <view class="loading">
			<view class="loader loader-17">
			  <view class="css-square square1"></view>
			  <view class="css-square square2"></view>
			  <view class="css-square square3"></view>
			  <view class="css-square square4"></view>
			  <view class="css-square square5"></view>
			  <view class="css-square square6"></view>
			  <view class="css-square square7"></view>
			  <view class="css-square square8"></view>
			</view>
			  
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			switch_loading() {
				this.$loading()
			}
		},
		computed: {
			is_loading() {
				// console.log("---------")
				// console.log(this.$store.state.loading)
				return this.$store.state.loading
			}
		}
	}
</script>

<style>
	.loader-17 .css-square {
		position: absolute;
		top: 50%;
		width: 40rpx;
		height: 12rpx;
		background: #ffffff;
	}

	.loader-17 .square1 {
		left: 70px;
		-webkit-animation: dominos 1s 0.125s ease infinite;
		animation: dominos 1s 0.125s ease infinite;
	}

	.loader-17 .square2 {
		left: 60px;
		-webkit-animation: dominos 1s 0.3s ease infinite;
		animation: dominos 1s 0.3s ease infinite;
	}

	.loader-17 .square3 {
		left: 50px;
		-webkit-animation: dominos 1s 0.425s ease infinite;
		animation: dominos 1s 0.425s ease infinite;
	}

	.loader-17 .square4 {
		left: 40px;
		-webkit-animation: dominos 1s 0.540s ease infinite;
		animation: dominos 1s 0.540s ease infinite;
	}

	.loader-17 .square5 {
		left: 30px;
		-webkit-animation: dominos 1s 0.665s ease infinite;
		animation: dominos 1s 0.665s ease infinite;
	}

	.loader-17 .square6 {
		left: 20px;
		-webkit-animation: dominos 1s 0.79s ease infinite;
		animation: dominos 1s 0.79s ease infinite;
	}

	.loader-17 .square7 {
		left: 10px;
		-webkit-animation: dominos 1s 0.9s ease infinite;
		animation: dominos 1s 0.9s ease infinite;
	}

	.loader-17 .square8 {
		left: 0px;
		-webkit-animation: dominos 1s 1s ease infinite;
		animation: dominos 1s 1s ease infinite;
	}


	/*LOADER-4*/

	.loader-4 {
		border: 7px double #ff5722;
		animation: ball-turn 1s linear infinite;
	}

	.loader-4:before,
	.loader-4:after {
		content: "";
		position: absolute;
		width: 12px;
		height: 12px;
		background: #ff5722;
		border-radius: 50%;
		bottom: 0;
		right: 37px;
	}

	.loader-4:after {
		left: 37px;
		top: 0;
	}

	@keyframes dominos {
		50% {
			opacity: 0.7;
		}

		75% {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		80% {
			opacity: 1;
		}
	}

	@keyframes ball-turn {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}

	.loading_box {
		width: 100%;
		height: 100vh;
		/* background-color: rgba(0,0,0,0.4); */
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10000;
	}

	.loading {
		width: 200upx;
		height: 200upx;
		margin-left: 275upx;
		margin-top: 300upx;
		text-align: center;
		line-height: 200upx;
		color: #FFFFFF;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 20upx;

	}

	.loading image {
		width: 80upx;
		height: 80upx;
		vertical-align: middle;
	}

	.loading .icon {
		width: 160upx;
		height: 160upx;
		vertical-align: middle;
	}

	.iconfont {
		font-size: 60upx;
		display: inline-block;
	}

	/* 无限旋转动画 */
	.rotate {
		-webkit-transition-property: -webkit-transform;
		-webkit-transition-duration: 1s;
		-moz-transition-property: -moz-transform;
		-moz-transition-duration: 1s;
		-webkit-animation: rotate 0.6s linear infinite;
		-moz-animation: rotate 0.6s linear infinite;
		-o-animation: rotate 0.6s linear infinite;
		animation: rotate 0.6s linear infinite;
	}

	@-webkit-keyframes rotate {
		from {
			-webkit-transform: rotate(359deg)
		}

		to {
			-webkit-transform: rotate(0deg)
		}
	}

	@-moz-keyframes rotate {
		from {
			-moz-transform: rotate(359deg)
		}

		to {
			-moz-transform: rotate(0deg)
		}
	}

	@-o-keyframes rotate {
		from {
			-o-transform: rotate(359deg)
		}

		to {
			-o-transform: rotate(0deg)
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(359deg)
		}

		to {
			transform: rotate(0deg)
		}
	}

	/* 无限旋转动画 end */
</style>
