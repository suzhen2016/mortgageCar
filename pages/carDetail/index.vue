<template>
	<view class="cardetail-container">
		<qi-loading></qi-loading>
		<swiper class="swiper" indicator-dots autoplay circular :indicator-active-color="activeColor">
			<swiper-item class="swiper-item" v-for="(item, index) in carDetail && carDetail.car_images" :key="index">
				<image :src="item.img"></image>
			</swiper-item>
		</swiper>
		<view class="car-top">
			<view class="number">{{carDetail.price}}万</view>
			<view class="btns">
				<view class="btn active" @tap="checkLowPrice">查看底价</view>
				<view class="btn" @tap="bargain">我要砍价</view>
			</view>
		</view>
		<view class="show-content">
			<view class="car-name">{{carDetail.title}}</view>
			<view>
				<view class="common-title">车辆档案</view>
				<view class="item">
					<view class="left">车辆编号</view>
					<view class="right">{{carDetail.number}}</view>
				</view>
				<view class="item">
					<view class="left">上牌日期</view>
					<view class="right">{{carDetail.list_date}}</view>
				</view>
				<view class="item">
					<view class="left">查看次数</view>
					<view class="right">{{carDetail.views}}</view>
				</view>
				<view class="item">
					<view class="left">排量</view>
					<view class="right">{{carDetail.displacement}}</view>
				</view>
				<view class="item">
					<view class="left">归属地</view>
					<view class="right">{{carDetail.address && carDetail.address.province.name}} >  {{carDetail.address && carDetail.address.city.name}}</view>
				</view>
				<view class="item">
					<view class="left">联系方式</view>
					<view class="right">{{carDetail && carDetail.user &&  carDetail.user.phone}}</view>
				</view>
			</view>
			<view>
				<view class="common-title">详细说明</view>
				<view class="des" v-html="carDetail.detail"></view>
			</view>
			<view>
				<view class="common-title">注意</view>
				<view class="danger">{{carDetail.notice}}</view>
			</view>
		</view>
		<view class="footer-container">
			<!-- <marquee style="color: white;background: rgba(0, 0, 0, 0.5); height:50upx;line-height: 50upx;overflow: hidden;">安全提示：久久泰抵押车是第三方信息平台，推荐拨打官方客服电话400-087-0081，核实后交易。因您私下交易造成的损失，本平台不承担。</marquee> -->
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
	import appShare, { closeShare } from "@/utils/share.js"
	import config from '@/config'
	export default {
		data() {
			return {
				id: '',
				carDetail: {},
				activeColor: '#007aff',
				swipers: ['https://www.jjtdyc.com/jjtdyc1.jpg','https://www.jjtdyc.com/jjtdyc2.jpg','https://www.jjtdyc.com/jjtdyc1.jpg'],
			}
		},
		onLoad(options) {
			this.id = options.id
			this.loadDetail()
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
			loadDetail() {
				this.$api.getCarDetail({
					car_id: this.id
				}).then(res => {
					this.carDetail = res.result
					// this.carDetail.price = Math.round((this.carDetail.price /10000) * 100) / 100,
					this.carDetail.price  =  parseFloat(this.carDetail.price).toFixed(2)
					this.carDetail.car_images = this.carDetail.car_images && this.carDetail.car_images.map(item => {
						return {
							img: `${config.qiniuSrc}${item.img}`
						}
					})
					uni.setNavigationBarTitle({
						title: `${res.result.brand.brand_name.name}${res.result.brand.cars_name.name}`
					})
				})
			},
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
			onShare(){
				let shareData = {
					shareUrl:"https://kemean.com/",
					shareTitle:"分享的标题",
					shareContent:"分享的描述",
					shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
					appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
					appPath : "pages/home/home",
					appWebUrl : "https://kemean.com/",
				};
				let shareObj = appShare(shareData,res => {
					console.log("分享成功回调",res);
					// 分享成功后关闭弹窗
					// 第一种关闭弹窗的方式
					closeShare();
				});
				setTimeout(() => {
					// 第二种关闭弹窗的方式
					shareObj.close();
				},5000); 
			},
			onShareType(type){
				let shareData = {
					shareUrl:"https://kemean.com/",
					shareTitle:"分享的标题",
					shareContent:"分享的描述",
					shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
				};
				if(type == 3){
					shareData.mediaUrl = "http://qn.kemean.cn//upload/202004/18/1587189572683fync9eks.mp3";
					shareData.type = type;
				} else if(type == 4){
					shareData.mediaUrl = "https://www.w3school.com.cn/i/movie.mp4";
					shareData.type = type;
				}else if(type == 5){
					// 小程序必须是在微信开放平台与App绑定的才行
					shareData.appId = "wxd0e0881530ee4444";
					shareData.appPath = "pages/home/home";
					shareData.appWebUrl = "https://kemean.com/";
					shareData.type = type;
				}
				appShare(shareData,res => {
					console.log("分享成功回调",res);
				});
			},
			handleOperator() {
				uni.showActionSheet({
				    itemList: ['分享好友', '收藏', '复制'],
				    success:  (res) => {
						if(res.tapIndex == 0) {
							this.onShare()
						}else if(res.tapIndex == 1) {
							this.$alert('收藏成功')
						}else{
							uni.setClipboardData({
							    data: 'hello',
							    success:  () => {
							        this.$alert('已复制到剪贴板')
							    }
							});
						}
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
		padding-bottom: 100upx;
		.swiper{
			height: 400upx;
			.swiper-item{
				height: 100%;
				image{
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
			padding: 0px 40upx 40upx;
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
			// height: 160upx;
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
