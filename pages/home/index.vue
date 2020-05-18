<template>
	<view class="home-container">
		<qi-loading></qi-loading>
		<swiper class="swiper" indicator-dots autoplay circular :indicator-active-color="activeColor">
			<swiper-item class="swiper-item" v-for="(item, index) in homeData && homeData.banner" :key="index" @tap="goWeb(item.link_url)">
				<image :src="item.img" alt=""></image>
			</swiper-item>
		</swiper>
		<view class="menus">
			<view class="menu-item" v-for="(item, index) in menus" :key="index" @tap="goPath(item)">
				<image :src="item.url" mode="aspectFit"></image>
				<view class="menu-name">{{item.text}}</view>
			</view>
		</view>
		<view class="new-article">
			<view class="left">
				<image src="https://www.jjtdyc.com/static/picture/picture/guanfang2.png" mode="aspectFit"></image>
			</view>
			<view class="right">
				<view class="roll-wrap">
					<view class="articles" :class="{'animate': animate}" :style="{'margin-top': marginTop + 'upx'}">
						<navigator hover-class="none" :url="`/pages/news/newDetail?id=${item.id}`" class="article-item" v-for="(item, index) in nowNews" :key="index">{{item.title}}</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="new-carlist red">
			<view>新闻资讯</view>
			<navigator hover-class="none" url="/pages/news/index" class="tel-num">查看更多+</navigator>
		</view>
		<view class="news-list">
			<navigator hover-class="none" :url="`/pages/news/newDetail?id=${item.id}`" class="news-item" v-for="(item, index) in homeData && homeData.news" :key="index">
				<view class="left">
					<image :src="item.img" mode=""></image>
					<view class="new-title">{{item.title}}</view>
				</view>
				<view class="right">
					<view class="excerpt">{{item.excerpt}}</view>
					<view class="create-time">{{item.created_at | momentTime}}</view>
				</view>
			</navigator>
		</view>
		<view class="new-carlist">
			<view>最新车源</view>
			<view class="tel-num" @tap="phoneCall">官方热线：400-087-0081</view>
		</view>
		<view class="car-list">
			<navigator hover-class="none" :url="`/pages/carDetail/index?id=${item.id}`" class="car-item" v-for="(item, index) in homeData && homeData.cars" :key="index">
				<image :src="item.cat_img"></image>
				<view class="right">
					<view class="car-name">{{item.title}}</view>
					<view class="time">上牌日期：{{item.list_date}}</view>
					<view class="bottom">
						<view class="time">{{item.created_at | momentDate}}</view>
						<view class="money-num">￥{{item.price}}万</view>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import config from '@/config'
	import { momentDate, momentTime } from '@/filters'
	export default {
		data() {
			return {
				activeColor: 'rgb(187, 39, 29)',
				swipers: ['https://www.jjtdyc.com/jjtdyc1.jpg','https://www.jjtdyc.com/jjtdyc2.jpg'],
				menus: [
					{
						url: '/static/image/home/buy-car.png',
						text: '买车',
						path: '/pages/buycar/index',
						type: 'switchTab'
					},
					{
						url: '/static/image/home/sale.png',
						text: '卖车',
						path: '/pages/sale/index',
						type: 'switchTab'
					},
					{
						url: '/static/image/home/app.png',
						text: 'APP下载'
					},
					{
						url: '/static/image/home/buy.png',
						text: '求购',
						path: '/pages/buying/index',
						type: 'navigate'
					},
					{
						url: '/static/image/home/paimai.png',
						text: '找车',
						path: '/pages/search/search',
						type: 'navigate'
					},
					{
						url: '/static/image/home/news.png',
						text: '资讯',
						path: '/pages/news/index',
						type: 'navigate'
					},
					{
						url: '/static/image/home/wenda.png',
						text: '问答',
						path: '/pages/question/index',
						type: 'navigate'
					},
					{
						url: '/static/image/home/pinggu.png',
						text: '评估',
						path: '/pages/evaluate/index',
						type: 'switchTab'
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
				],
				homeData: null,
				city: null,
				nowNews: [],
				marginTop: 0,
				animate: false,
				timer: null
			}
		},
		filters: {
			momentDate,
			momentTime
		},
		onShow() {
			let city = this.city
			this.city = uni.getStorageSync('city')
			this.setStyle()
			this.loadData()
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/address/index'
			})
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		onReachBottom() {
			uni.switchTab({
				url: '/pages/buycar/index'
			})
		},
		onHide() {
			if(this.timer) {
				clearInterval(this.timer)
				this.timer = null
			}
		},
		methods: {
			loadData() {
				this.$api.getHomeData({
					address_id : this.city && this.city.id || ''
				}).then(res => {
					this.homeData = res.result
					this.homeData.banner = this.homeData.banner && this.homeData.banner.map(item => {
						return {
							...item,
							img: `${config.qiniuSrc}${item.img}`
						}
					}) || []
					this.homeData.news = this.homeData.news && this.homeData.news.map(item => {
						return {
							...item,
							img: `${config.qiniuSrc}${item.img}`
						}
					}) || []
					this.homeData.cars = this.homeData.cars && this.homeData.cars.map(item => {
						return {
							...item,
							price: Math.round((item.price /10000) * 100) / 100,
							cat_img: `${config.qiniuSrc}${item.cat_img}`
						}
					}) || []
					this.nowNews = [...this.homeData.news]
					if(this.nowNews.length >= 2) {
						this.timer = setInterval(item => {
							console.log('enter')
							this.marginTop -= 56
							this.animate = true
							setTimeout(() => {
								let spliceArr = this.nowNews.splice(0,1)
								this.nowNews = this.nowNews.concat(spliceArr)
								this.marginTop = 0
								this.animate = false
							},500)
						}, 3000)
					}
				})
			},
			setStyle() {
				// #ifdef APP-PLUS
				let pages = getCurrentPages();
				let page = pages[pages.length - 1];
				let currentWebview = page.$getAppWebview();
				let titleNView = currentWebview.getStyle().titleNView;
				titleNView.buttons[0].text = this.city ? this.city.name : '全国';
				currentWebview.setStyle({
					titleNView: titleNView
				});
				// #endif
				// #ifdef H5
				document.getElementsByClassName('uni-btn-icon')[1].innerText = this.city ? this.city.name : '全国';
				// #endif
			},
			goWeb(url) {
				if(url) {
					uni.navigateTo({
						url: `./article?url=${url}`
					})
				}
			},
			phoneCall() {
				uni.makePhoneCall({
				    phoneNumber: '114'
				});
			},
			goPath(item) {
				if(!item.path) {
					return this.$alert('暂未开放')
				}
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
			height: 360upx!important;
			.swiper-item{
				height: 360upx!important;
				image{
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
				image{
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
				image{
					width: 98upx;
					height: 86upx;
					margin: 20upx;
				}
			}
			@keyframes mymove
			{
				from {margin-top: 0;}
				to {top:-56upx;}
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
					.articles{
						&.animate{
							animation:mymove .5s infinite;
						}
					}
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
			&.red{
				border-left: 4px solid #BB271D;
				.tel-num{
					color: #818d9a;
				}
			}
			.tel-num{
				color: #fe3e12;
			}
		}
		.news-list{
			padding: 0 30upx;
			.news-item{
				margin-bottom: 20upx;
				display: flex;
				font-size: 24upx;
				height: 188upx;
				border-bottom: 1px solid #f2f1f1;
				overflow: hidden;
				.left{
					width: 212upx;
					height: 188upx;
					margin-right: 20upx;
					position: relative;
					image{
						width: 100%;
						height: 100%;
						border-radius: 6upx;
					}
					.new-title{
						position: absolute;
						left: 0px;
						bottom: 0px;
						display: block;
						width: 100%;
						text-align: center;
						color: white;
						background: #969393;
						line-height: 44upx;
						border-radius: 0 0 6upx 6upx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.right{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.excerpt{
						font-size: 30upx;
						color: #303741;
						line-height: 32upx;
						margin-bottom: 10upx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 4;
						-webkit-box-orient: vertical;
					}
					.create-time{
						color: gray;
						white-space: nowrap;
						ext-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
		}
		.car-list{
			padding: 0 30upx;
			.car-item{
				margin-bottom: 20upx;
				display: flex;
				font-size: 24upx;
				border: 1upx solid #d8d8d8;
				image{
					width: 154upx;
					height: 140upx;
					object-fit: center;
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
