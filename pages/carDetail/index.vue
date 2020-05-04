<template>
	<view class="cardetail-container">
		<swiper class="swiper" indicator-dots autoplay circular :indicator-active-color="activeColor">
			<swiper-item class="swiper-item" v-for="(item, index) in swipers" :key="index">
				<img :src="item" alt="">
			</swiper-item>
		</swiper>
		<view class="car-top">
			<view class="number">19.50万</view>
			<view class="btns">
				<view class="btn active" @tap="checkLowPrice">查看底价</view>
				<view class="btn" @tap="bargain">我要砍价</view>
			</view>
		</view>
		<view class="show-content">
			<view class="car-name">19年宝马X3</view>
			<view>
				<view class="common-title">车辆档案</view>
				<view class="item">
					<view class="left">车辆编号</view>
					<view class="right">164611</view>
				</view>
				<view class="item">
					<view class="left">上牌日期</view>
					<view class="right">2011-11-11</view>
				</view>
				<view class="item">
					<view class="left">查看次数</view>
					<view class="right">333</view>
				</view>
				<view class="item">
					<view class="left">排量</view>
					<view class="right">3.0</view>
				</view>
				<view class="item">
					<view class="left">归属地</view>
					<view class="right">福建 > 厦门</view>
				</view>
			</view>
			<view>
				<view class="common-title">详细说明</view>
				<view class="des"> [，，12年中规宝马X6 3.0T不要拿美规的比，新车106万，8AT变速箱，带HUD台显，天使眼，多功能方向盘，一键启动，定速巡航，性感鸡腿档把，电子手刹，电动耳朵，爱马仕座椅，天窗，电尾门，空气悬挂，双电动座椅加热，带腿部支撑，记忆座椅，18年抵押银行，没有查封，客户回头一年半，安全没问题，刚做的大保健，小违章随车走，浙户</view>
			</view>
			<view>
				<view class="common-title">注意</view>
				<view class="danger">联系我时，请说是在久久泰抵押车网看到的，谢谢。</view>
			</view>
		</view>
		<view class="footer-container">
			<marquee style="color: white;background: rgba(0, 0, 0, 0.5); height:50upx;line-height: 50upx;">安全提示：久久泰抵押车是第三方信息平台，推荐拨打官方客服电话400-087-0081，核实后交易。因您私下交易造成的损失，本平台不承担。</marquee>
			<view class="footer">
				<view class="footer-item" @tap="phoneCall">
					<img src="/static/image/mine/bigimg-zxdijia.png" alt="">
					<view>拨打电话</view>
				</view>
				<view class="footer-item" @tap="bargain">
					<img src="/static/image/mine/bigimg-dhzx.png" alt="">
					<view>我要砍价</view>
				</view>
				<view class="footer-item" @tap="handleOperator">
					<img src="/static/image/mine/m-shoucang1.png" alt="">
					<view>综合</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeColor: '#007aff',
				swipers: ['https://www.jjtdyc.com/jjtdyc1.jpg','https://www.jjtdyc.com/jjtdyc2.jpg','https://www.jjtdyc.com/jjtdyc1.jpg'],
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: 'X3'
			})
		},
		onNavigationBarButtonTap() {
			uni.showActionSheet({
			    itemList: ['车源列表'],
			    success:  (res) => {
			        uni.switchTab({
			        	url: '/pages/buycar/index'
			        })
			    },
			    fail: function (res) {
			        console.log(res.errMsg);
			    }
			})
		},
		methods: {
			phoneCall() {
				uni.makePhoneCall({
					phoneNumber: '114'
				})
			},
			bargain() {
				uni.navigateTo({
					url: './barGain'
				})
			},
			checkLowPrice() {
				uni.showToast({
					title: '您所在的会员组没有权限',
					icon: 'none'
				})
			},
			handleOperator() {
				uni.showActionSheet({
				    itemList: ['分享好友', '收藏', '复制'],
				    success: function (res) {
				        console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				})
			}
		}
	}
</script>

<style lang="scss">
	.cardetail-container{
		font-size: 28upx;
		.swiper{
			height: 400upx;
			.swiper-item{
				height: 100%;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.car-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 132upx;
			padding: 20upx 30upx;
			.number{
				color: #ff6d02;
				font-size: 46upx;
			}
			.btns{
				display: flex;
				align-items: center;
			}
			.btn{
				width: 160upx;
				height: 52upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 26upx;
				border-radius: 10upx;
				background-color: rgba(255, 51, 148, 0.04);
				border: 1px solid #B92B22;
				color: #b92b22;
				&.active{
					background-color: #BB271D;
					margin-right: 20upx;
					color: #fff;
				}
			}
		}
		.show-content{
			background-color: #fff;
			box-shadow: 0px 4upx 20upx #e0e0e0;
			padding: 0px 40upx;
			margin-bottom: 60upx;
		}
		.car-name{
			width: 100%;
			text-align: center;
			line-height: 60upx;
			font-size: 36upx;
			margin-bottom: 0px;
			color: #BB271D;
		}
		.common-title{
			margin-top: 20upx;
			height: 56upx;
			line-height: 56upx;
			font-size: 36upx;
			color: #111;
			&:before{
				content: "";
				width: 6upx;
				height: 44upx;
				background: #B92B22;
				float: left;
				margin-right: 16upx;
				margin-top: 6upx;
			}
		}
		.item{
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 60upx;
			line-height: 60upx;
			border-bottom: 1px dashed #e5e5e5;
			font-size: 28upx;
			color: #b0b3b4;
			padding-left: 22upx;
			.right{
				color: #111;
			}
		}
		.des{
			background: #f6f6f6;
		}
		.danger{
			color: red;
		}
		.footer-container{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 10;
			height: 160upx;
		}
		.footer{
			display: flex;
			.footer-item{
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				height: 100upx;
				img{
					width: 30upx;
					height: 30upx;
					margin-right: 8upx;
				}
				&:nth-child(1) {
					background-color:#BB271D;
				}
				&:nth-child(2) {
					background-color:#FF6402;
				}
				&:nth-child(3) {
					background-color:#f57c13;
				}
			}
		}
	}
</style>
