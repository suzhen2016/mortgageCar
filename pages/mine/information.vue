<template>
	<view class="information-container">
		<view class="container-section-new">
			<view class="person-name">
				<image src="/static/image/mine/default.jpg" mode="aspectFit"></image>
				<view class="detail">
					<view class="account">账号: {{userInfo.name}}</view>
					<view class="level">会员组: 个人会员</view>
				</view>
			</view>
		</view>
		<view class="list">
			<navigator hover-class="none" url="./signRecord" class="list-item">
				<view>签到记录</view>
			</navigator>
			<navigator hover-class="none" url="/pages/capitalRecord/index" class="list-item">
				<view>我的资金</view>
				<view class="right">￥0.00元</view>
			</navigator>
			<navigator hover-class="none" url="./coinRecord" class="list-item">
				<view>我的金币</view>
				<view class="right">4枚</view>
			</navigator>
			<navigator hover-class="none" url="/pages/orderCar/index" class="list-item">
				<view>我的定金</view>
			</navigator>
			<navigator hover-class="none" url="/pages/ordergps/index" class="list-item">
				<view>我的订单</view>
			</navigator>
			<navigator hover-class="none" url="./validate" class="list-item">
				<view>会员认证</view>
			</navigator>
			<!-- <view class="list-item">
				<view>团购订单</view>
			</view> -->
			<navigator hover-class="none" url="./coupon" class="list-item">
				<view>领券中心</view>
			</navigator>
			<navigator hover-class="none" url="/pages/capitalRecord/index" class="list-item">
				<view>资金流水</view>
			</navigator>
			<navigator hover-class="none" url="./payRecord" class="list-item">
				<view>支付记录</view>
			</navigator>
			<navigator hover-class="none" url="./coinRecord" class="list-item">
				<view>金币管理</view>
			</navigator>
			<navigator hover-class="none" url="./address" class="list-item">
				<view>收货地址</view>
			</navigator>
			<navigator hover-class="none" url="./favorite" class="list-item">
				<view>车源收藏</view>
			</navigator>
			<navigator hover-class="none" url="./oauth" class="list-item">
				<view>一键登录</view>
			</navigator>
			<navigator hover-class="none" url="./weixin" class="list-item">
				<view>微信关注</view>
			</navigator>
			<navigator hover-class="none" url="./editAccount" class="list-item">
				<view>修改资料</view>
			</navigator>
			<navigator hover-class="none" url="./accountDetail" class="list-item">
				<view>账户详情</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo')
			}
		},
		onNavigationBarButtonTap() {
			uni.showModal({
			    title: '提示',
			    content: '确定要退出本次登录吗？',
			    success:  (res) => {
			        if (res.confirm) {
						this.$api.loginOut().then(res => {
							uni.clearStorageSync()
							uni.switchTab({
								url: '/pages/home/index'
							})
						})
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		}
	}
</script>

<style lang="scss">
	.information-container{
		.container-section-new{
			background: url(../../static/image/mine/bg.png) center top no-repeat;
			width: 100%;
			height: 368upx;
			background-size: 100% 368upx;
			display: flex;
			padding: 0 40upx;
			.person-name{
				display: flex;
				align-items: center;
				margin-top: -40upx;
				image{
					width: 150upx;
					height: 150upx;
					margin-right: 20upx;
					border-radius: 50%;
				}
				.detail{
					.account{
						color: #e4e4e4;
						margin-bottom: 14upx;
						font-size: 28upx;
					}
					.level{
						color: white;
						font-size: 24upx;
						padding: 10upx 0;
						margin-top: 20upx;
					}
				}
			}
		}
		.list{
			padding: 30upx 20upx 40upx;
			.list-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 110upx;
				color: #2F3540;
				font-size: 32upx;
				padding: 0 80upx;
				.right{
					color: #e07313;
					font-size: 26upx;
				}
			}
		}
	}
</style>
