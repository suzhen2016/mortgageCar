<template>
	<view class="question-detail-container">
		<view class="raise-question">
			<img src="/static/image/mine/default.jpg" alt="" class="avatar">
			<view class="right">
				<view class="user-detail">
					<view class="user-name">姜易蒙</view>
					<view class="question-state">已关闭</view>
				</view>
				<view class="time">2019-08-24 11:31</view>
			</view>
		</view>
		<view class="question-title">抵押车手续抵押车手续有哪些抵押车手续有哪些抵押车手续有哪些抵押车手续有哪些抵押车手续有哪些抵押车手续有哪些有哪些?</view>
		<view class="info">关注:16040&nbsp;&nbsp;答案:1&nbsp;&nbsp;悬赏:0</view>
		<view class="content"></view>
		<view class="head bd-b">最佳答案</view>
		<view class="content">暂无最佳答案</view>
		<view class="head bd-b">全部回答</view>
		<view class="list-user">
			<img src="/static/image/mine/default.jpg" alt="" class="avatar">
			<view class="right">
				<view class="user-detail">
					<view class="question-state">1楼</view>
				</view>
				<view class="time">2019-08-24 11:31</view>
			</view>
		</view>
		<view class="content">原车主身份证复印件(审车用)债权转让协议，行驶证，原车主签字画押的车辆质押借款协议</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options) {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.question-detail-container{
		font-size: 28upx;
		.raise-question{
			display: flex;
			align-items: center;
			padding: 0 32upx;
			margin-top: 20upx;
			padding-top: 20upx;
			height: 134upx;
			.avatar{
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 40upx;
			}
			.right{
				flex: 1;
			}
			.user-detail{
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #333;
				font-size: 32upx;
				height: 48upx;
				line-height: 64upx;
				.user-name{
					
				}
				.question-state{
					color: red;
					font-size: 28upx;
				}
			}
			.time{
				color: #c9c6c6;
				font-size: 22upx;
			}
		}
		.question-title{
			font-size: 32upx;
			line-height: 44upx;
			padding: 32upx;
		}
		.info{
			font-size: 28upx;
			padding: 0 32upx 32upx 32upx;
			color: #666666;
			text-align: right;
			width: 100%;
			border-bottom: #D9D9D9 1px dashed;
		}
		.content{
			font-size: 32upx;
			line-height: 180%;
			padding: 20upx 32upx;
			border-bottom: #D9D9D9 1px solid;
		}
		.head{
			height: 88upx;
			line-height: 88upx;
			font-size: 32upx;
			padding: 0 32upx;
		}
		.bd-b {
		    border-bottom: #D9D9D9 1px solid;
		}
		.list-user{
			display: flex;
			align-items: center;
			padding: 0 32upx;
			margin-top: 20upx;
			padding-top: 20upx;
			height: 134upx;
			.avatar{
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 40upx;
			}
			.right{
				flex: 1;
			}
			.user-detail{
				color: #333;
				font-size: 32upx;
				height: 48upx;
				line-height: 64upx;
				text-align: right;
				.question-state{
					color: red;
					font-size: 28upx;
				}
			}
			.time{
				color: #c9c6c6;
				font-size: 22upx;
			}
		}
	}
</style>
