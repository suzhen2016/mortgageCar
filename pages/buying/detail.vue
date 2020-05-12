<template>
	<view class="buying-detail">
		<view class="question-title">急需求购车一台</view>
		<view class="hide-box">
			<view class="title-sm">基本信息</view>
			<view class="parameter-configure-list">
				<view class="list-item">
					<view>品牌</view>
					<view>奔驰 » 奔驰GLC</view>
				</view>
				<view class="list-item">
					<view>发布时间</view>
					<view>2020-05-01</view>
				</view>
				<view class="list-item">
					<view>归属地</view>
					<view>湖北省 » 武汉</view>
				</view>
				<view class="list-item" style="color: #ff6d02">
					<view>期望价格</view>
					<view>30.00万</view>
				</view>
			</view>
			<view class="title-sm">备注</view>
			<view class="cardetailbox">暂无</view>
			<view class="title-sm">注意</view>
			<view class="cardetailboxdetail">交易过程中检查车辆的相关证件，避免上当受骗！</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title: '急需求购车一台'
			})
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.buying-detail{
		padding: 20upx 40upx;
		.question-title{
			line-height: 60upx;
			font-size: 34upx;
			margin-bottom: 30upx;
		}
		.title-sm{
			height: 84upx;
			line-height: 56upx;
			font-size: 28upx;
			color: #111;
			&::before{
				content: "";
				width: 6upx;
				height: 44upx;
				background: #B92B22;
				float: left;
				margin-right: 16upx;
				margin-top: 6upx;
			}
		}
		.parameter-configure-list{
			margin-bottom: 50upx;
			.list-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28upx;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 1px dashed #e5e5e5;
				color: #b0b3b4;
				padding-left: 22upx;
			}
		}
		.cardetailbox{
			background: #f6f6f6;
			padding: 30upx;
			font-size: 28upx;
		}
		.cardetailboxdetail{
			color: red;
			padding: 0 30upx;
			font-size: 28upx;
		}	
	}
</style>
