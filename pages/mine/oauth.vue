<template>
	<view class="oauth-container">
		<view class="item">
			<image src="/static/image/mine/default.jpg" mode="aspectFit" class="avatar"></image>
			<view class="right">
				<view class="top">
					<view>未绑定</view>
					<view class="type-name">微信</view>
				</view>
				<view class="bottom">
					<view>N/A</view>
					<view>立即绑定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.oauth-container{
		.item{
			box-shadow: 0px 0px 10upx #cbcbcb;
			padding: 8upx 10upx;
			margin: 10upx 12upx;
			height: 180upx;
			display: flex;
			align-items: center;
		}
		.avatar{
			width: 120upx;
			height: 120upx;
			border-radius: 50%;
		}
		.right{
			flex: 1;
			margin-left: 20upx;
			align-self: flex-start;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.top,.bottom{
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 28upx;
		}
		.bottom{
			margin-top: 40upx;
			color: #f57c13;
		}
		.type-name{
			color: #999;
			font-size: 26upx;
		}
	}
</style>
