<template>
	<view class="address-list">
		<scroll-view scroll-y="true" :style="{height: `${scrollHeight}px`}">
			<view class="address-item" v-for="(item, index) in addressList" :key="index">
				<view class="item-top">
					<view class="address-detail">福建省厦门会计法士大夫</view>
					<view class="select" :class="{'checked': item.checked}" @tap="item.checked = !item.checked"></view>
				</view>
				<view class="item-bottom">
					<view class="phone">ggdfg 130111111111111</view>
					<view class="operator" @tap="handleOperator"></view>
				</view>
			</view>
		</scroll-view>
		<view class="fixed-bottom" v-if="hasSelected">
			<view class="delete-btn" @tap="handleDelete">删除选中</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight: '',
				addressList: [
					{
						checked: false
					},
					{
						checked: false
					}
				]
			}
		},
		computed: {
			hasSelected() {
				if(this.addressList) {
					let selectL = this.addressList.filter(item => {
						return item.checked
					})
					return selectL.length > 0
				}else{
					return false
				}
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './addAddress'
			})
		},
		onLoad() {
			let height = uni.getSystemInfoSync().windowHeight
			this.scrollHeight = height - 48
		},
		methods: {
			handleDelete() {
				uni.showModal({
				    title: '提示',
				    content: '确定要删除选中地址吗？',
				    success: (res) => {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			handleOperator() {
				uni.showActionSheet({
				    itemList: ['修改', '删除'],
				    success:  (res) => {
				        if(res.tapIndex == 0){
							uni.navigateTo({
								url: './editAddress'
							})
						}else{
							uni.showModal({
							    title: '提示',
							    content: '确定要删该地址吗？',
							    success: (res) => {
							        if (res.confirm) {
							            console.log('用户点击确定');
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}
				    },
				    fail:  (res) => {
				        console.log(res.errMsg);
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.address-list{
		.address-item{
			box-shadow: 0px 0px 10upx #cbcbcb;
			padding: 8upx 10upx;
			margin: 10upx 12upx;
			font-size:28upx;
			.item-top, .item-bottom{
				height: 76upx;
				line-height: 30upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.phone{
				font-size:24upx;
				color: #999999;
			}
			.select{
				width: 64upx;
				height: 60upx;
				background: url('/static/image/mine/icon-check.png') no-repeat center center;
				background-size: 40upx 40upx;
				font-size: 24upx;
				color: #E46B09;
				&.checked{
					background-image: url('/static/image/mine/icon-checked.png');
				}
			}
			.operator{
				width: 64upx;
				height: 60upx;
				background: url('/static/image/mine/icon-sheet.png') no-repeat center center;
				background-size: 40upx 40upx;
				font-size: 24upx;
				color: #E46B09;
			}
		}
		.fixed-bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 96upx;
			background: #F8F8F8;
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			z-index: 10;
			.delete-btn{
				width: 160upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 8upx;
				background: #E64340;
				color: #FFFFFF;
				font-size: 24upx;
				margin-right: 20upx;
			}
		}
	}
</style>
