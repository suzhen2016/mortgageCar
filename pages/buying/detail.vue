<template>
	<view class="buying-detail">
		<qi-loading></qi-loading>
		<view class="question-title">{{carDetail && carDetail.title}}</view>
		<view class="hide-box">
			<view class="title-sm">基本信息</view>
			<view class="parameter-configure-list">
				<view class="list-item">
					<view>品牌</view>
					<view>{{carDetail && carDetail.brand.top_name}} » {{carDetail && carDetail.brand.level_name}}</view>
				</view>
				<view class="list-item">
					<view>发布时间</view>
					<view>{{carDetail && carDetail.created_at | momentDate}}</view>
				</view>
				<view class="list-item">
					<view>归属地</view>
					<view>{{carDetail && carDetail.address.province}} » {{carDetail && carDetail.address.city}}</view>
				</view>
				<view class="list-item" style="color: #ff6d02">
					<view>期望价格</view>
					<view>{{carDetail && carDetail.price}}万</view>
				</view>
			</view>
			<view class="title-sm">备注</view>
			<view class="cardetailbox">{{carDetail && carDetail.note}}</view>
			<view class="title-sm">注意</view>
			<view class="cardetailboxdetail">{{carDetail && carDetail.notice}}</view>
		</view>
	</view>
</template>

<script>
	import { momentDate } from '@/filters' 
	export default {
		data() {
			return {
				id: '',
				carDetail: null
			}
		},
		filters: {
			momentDate
		},
		onLoad(options) {
			this.id = options.id
			this.loadDetail()
		},
		methods: {
			loadDetail() {
				this.$api.getCarBuyDetail({
					request_buy_id: this.id
				}).then(res => {
					this.carDetail = res.result
					this.carDetail.price = Math.round((this.carDetail.price /10000) * 100) / 100
					uni.setNavigationBarTitle({
						title: this.carDetail.title
					})
				})
			}
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
