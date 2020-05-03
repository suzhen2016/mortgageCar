<template>
	<view class="home-container">
		<swiper class="swiper" indicator-dots autoplay circular :indicator-active-color="activeColor">
			<swiper-item class="swiper-item" v-for="(item, index) in swipers" :key="index">
				<img :src="item" alt="">
			</swiper-item>
		</swiper>
		<view class="menus">
			<view class="menu-item" v-for="(item, index) in menus" :key="index" @tap="goPath(item)">
				<img :src="item.url" alt="">
				<view class="menu-name">{{item.text}}</view>
			</view>
		</view>
		<view class="new-article">
			<view class="left">
				<img src="https://www.jjtdyc.com/static/picture/picture/guanfang2.png" alt="">
			</view>
			<view class="right">
				<view class="roll-wrap">
					<view class="articles">
						<view class="article-item" v-for="(item, index) in articles" :key="index">{{item}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="new-carlist">
			<view>最新车源</view>
			<view class="tel-num" @tap="phoneCall">官方热线：400-087-0081</view>
		</view>
		<view class="car-list">
			<view class="car-item" v-for="(item, index) in 20" :key="index">
				<img src="https://jjtdyc.oss-cn-shenzhen.aliyuncs.com/upload/202005/01/2123337156997.jpeg" alt="">
				<view class="right">
					<view class="car-name">11年雷克萨斯RX</view>
					<view class="time">上牌日期：2011年05月</view>
					<view class="bottom">
						<view class="time">2020-05-01</view>
						<view class="money-num">￥14.30万</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeColor: 'rgb(187, 39, 29)',
				swipers: ['https://www.jjtdyc.com/jjtdyc1.jpg','https://www.jjtdyc.com/jjtdyc2.jpg'],
				menus: [
					{
						url: '/static/image/home/buy-car.png',
						text: '买车'
					},
					{
						url: '/static/image/home/sale.png',
						text: '卖车'
					},
					{
						url: '/static/image/home/app.png',
						text: 'APP下载'
					},
					{
						url: '/static/image/home/buy.png',
						text: '求购'
					},
					{
						url: '/static/image/home/paimai.png',
						text: '找车'
					},
					{
						url: '/static/image/home/news.png',
						text: '资讯'
					},
					{
						url: '/static/image/home/wenda.png',
						text: '问答',
						path: '/pages/question/index',
						type: 'navigate'
					},
					{
						url: '/static/image/home/pinggu.png',
						text: '评估'
					}
				],
				articles: [
					'抵押车都有些什么合同手续？',
					'受原债权人银行委托来扣车，抵押车被强行开走合法吗',
					'抵押车这么便宜，其中的门道你了解吗？',
					'抵押车买了盗抢险有用吗？',
					'抵押车有哪些车不能买？',
					'特殊时期买一辆抵押车，出门更放心！',
					'抵押车可不可以买？怎么买？',
					'抵押车有使用期限吗？',
					'抵押车要交定金吗？',
					'抵押车消费人群主要有哪几类？'
				]
			}
		},
		onLoad() {

		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url: '/pages/address/index'
			})
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		methods: {
			phoneCall() {
				uni.makePhoneCall({
				    phoneNumber: '114'
				});
			},
			goPath(item) {
				if(item.type == 'navigate') {
					uni.navigateTo({
						url: item.path
					})
				}else{
					uni.switchTab({
						url: item.path
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.home-container{
		.swiper{
			.swiper-item{
				height: 360upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
		}
		.menus{
			display: flex;
			flex-wrap: wrap;
			margin-top: 22upx;
			padding: 0 10upx 20upx;
			.menu-item{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 25%;
				margin-bottom: 10upx;
				img{
					width: 100upx;
					height: 90upx;
				}
				.menu-name{
					font-size: 24upx;
					color: #2f3540;
					margin-top: 10upx;
				}
			}
		}
		.new-article{
			width: 91%;
			margin-bottom: 10upx;
			margin: 0 auto;
			box-shadow: 0px 0px 16upx #f47c74;
			height: 130upx;
			border-radius: 6upx;
			display: flex;
			.left{
				padding-left: 1%;
				img{
					width: 98upx;
					margin: 20upx;
				}
			}
			.right{
				padding: 10upx;
				width: 75%;
				overflow: hidden;
				.roll-wrap{
					height: 106upx;
					overflow: hidden;
					line-height: 56upx;
					font-size: 24upx;
					color: #666;
				}
			}
		}
		.new-carlist{
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-left: 4px solid #12A232;
			letter-spacing: 2upx;
			font-size: 28upx;
			color: #2f3540;
			position: relative;
			background: #fff;
			font-weight: 700;
			padding: 0 40upx 0 20upx;
			margin-left: 20upx;
			margin-top: 30upx;
			margin-bottom: 30upx;
			.tel-num{
				color: #fe3e12;
			}
		}
		.car-list{
			padding: 0 30upx;
			.car-item{
				margin-bottom: 20upx;
				display: flex;
				font-size: 24upx;
				border: 1upx solid #d8d8d8;
				img{
					width: 154upx;
					height: 100%;
				}
				.right{
					flex: 1;
					margin-left: 10upx;
					view{
						padding: 6upx;
					}
					.car-name{
						color:#12A232;
					}
					.time{
						color: #666;
					}
					.bottom{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.money-num{
							color: #f60;
							font-size: 28upx;
						}
					}
				}
			}
		}
	}
</style>
