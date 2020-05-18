<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
	 @init="mescrollInit">
		<view class="buy-car-container">
			<view class="filter-container">
				<view class="nav">
					<block v-for="(item,index) in menu" :key="index">
						<view class="first-menu" :class="{'on':filterIndex == index}" @tap="togglePage(index)">
							<text class="name" v-if="index == 1 ">{{priceList[priceIndex].name}}</text>
							<text class="name" v-if="index == 3">{{ageList[ageIndex].name}}</text>
							<picker v-if="index == 0" mode="multiSelector" :range="brandRange" :value="brand" @change="handleBrandChange" @columnchange="brandColumnchange" @cancel="brandCancel">
								<view>{{brandDes ? brandDes : '选择品牌'}}</view>
							</picker>
							<picker v-if="index == 2" mode="multiSelector" :range="addressRange" :value="city" @change="handleAddressChange" @columnchange="addresColumnchange" @cancel="addressCancel">
								<view>{{address ? address : '选择地点'}}</view>
							</picker>
							<text class="iconfont triangle" :style="'transform:rotate('+triangleDeg[index]+'deg);'"></text>
						</view>
					</block>
				</view>
			</view>
			<view class="input-container">
				<input type="text" v-model="keyWord" placeholder="请输入关键词" class="search-input" maxlength="20" @confirm="onConfirm"/>
			</view>
			<view class="car-list">
				<navigator hover-class="none" :url="`/pages/carDetail/index?id=${item.id}`" class="car-item" v-for="(item, index) in carList" :key="index">
					<image :src="item.cat_img ? `http://39.99.187.24/media/${item.cat_img}` : '../../static/image/mine/newscar.jpg'"></image>
					<view class="right">
						<view class="car-name">
							<view>{{item.title}}</view>
							<view class="set-top" v-if="item.is_top == 'YES'">置顶</view>
						</view>
						<view class="time-container time">
							<view>上牌日期：{{item.list_date}}</view>
							<view class="address">{{item.address}}</view>
						</view>
						<view class="bottom">
							<view class="time">{{item.created_at | momentDate}}</view>
							<view class="money-num">￥{{Math.round((item.price /10000) * 100) / 100}}万</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import regionalComponents from '@/components/regionalComponents/regionalComponents.vue'
	import { momentDate } from '@/filters'
	export default {
		components: {
			MescrollUni,
			regionalComponents
		},
		data() {
			return {
				keyWord: '',
				mescroll: null, //mescroll实例对象
				downOption: {
					use: false,
					auto: true,
				},
				upOption: {
					auto: true, 
					// noMoreSize: 4,
					empty: {
						tip: '~ 空空如也 ~', // 提示
						// btnText: '去看看'
					}
				},
				filter: {
					address_id: '',
					brand_id: '',
					car_age: '',
					price_start: '',
					price_end: ''
				},
				carList: [],
				triangleDeg: [0,0,0,0],
				filterIndex: -1,
				menu: [
					{
						name: '选择品牌'
					},
					{
						name: '选择价格'
					},
					{
						name: '提车地点'
					},
					{
						name: '选择车龄'
					}
				],
				priceList: [
					{
						"name": "选择价格",
						"value": ""
					},
					{
						"name": "1万以下",
						"price_start": 0,
						"price_end": 10000
					},
					{
						"name": "1-3万",
						"price_start": 10000,
						"price_end": 30000
					},
					{
						"name": "3-5万",
						"price_start": 30000,
						"price_end": 50000
					},
					{
						"name": "5-10万",
						"price_start": 50000,
						"price_end": 100000
					},
					{
						"name": "15-20万",
						"price_start": 10000,
						"price_end": 30000
					},
					{
						"name": "20-25万",
						"price_start": 200000,
						"price_end": 250000
					},
					{
						"name": "25-30万",
						"price_start": 250000,
						"price_end": 300000
					},
					{
						"name": "35-40万",
						"price_start": 300000,
						"price_end": 400000
					},
					{
						"name": "40万以上",
						"price_start": 400000,
						"price_end": 10000000000000000
					}
				],
				priceIndex: 0,
				ageList: [
					{
						"name": "选择车龄",
						"value": ""
					},
					{
						"name": "1年以内",
						"value": "LessOne"
					},
					{
						"name": "1-3年",
						"value": "OneThree"
					},
					{
						"name": "3-5年",
						"value": "ThreeFive"
					},
					{
						"name": "5年以上",
						"value": "FiveMore"
					}
				],
				ageIndex: 0,
				addressRange: [[], []],
				city: [],
				originProvinces: [],
				originCitys: [],
				address: '',
				brandRange: [[], []],
				originBrandOne: [],
				originBrandTwo: [],
				brand: [],
				brandDes: ''
			}
		},
		filters: {
			momentDate
		},
		methods: {
			brandInit() {
				this.$api.getBrandList({
					letter_order: 'desc',
				}).then(res => {
					let result = res.result
					this.originBrandOne = result	
					this.brand[0] = 0
					result = result.map(item => {
						return `${item.letter.name}-${item.name}`
					})
					this.brandRange[0] = result
					this.$api.getBrandList({
						brand_pid: this.originBrandOne[0].id,
						brand_level: '2'
					}).then(res => {
						let result = res.result
						this.originBrandTwo = result
						this.brand[1] = 0
						result = result && result.map(item => {
							return `${item.letter.name}-${item.name}`
						}) || []
						this.brandRange.splice(1, 1 ,result)
					})
				})
			},
			handleBrandChange() {
				this.filter.address_id = this.originBrandTwo[this.brand[1]].id
				this.brandDes = this.originBrandTwo[this.brand[1]].name
			},
			brandColumnchange(e) {
				let detail = e.detail
				if(e.detail.column == 0) {
					let brandId = this.originBrandOne[e.detail.value].id
					this.brand[0] = e.detail.value
					this.$api.getBrandList({
						brand_pid: brandId,
						brand_level: '2'
					}).then(res => {
						let result = res.result
						this.brand[1] = 0
						this.originBrandTwo = result
						result = result && result.map(item => {
							return `${item.letter.name}-${item.name}`
						}) || []
						this.brandRange.splice(1, 1 ,result)
					})
				}else if(e.detail.column == 1) {
					this.brand[1] = e.detail.value
				}
			},
			brandCancel() {
				this.brand = [0,0]
				this.brandRange = [[],[]]
				this.brandInit()
			},
			addressInit() {
				this.$api.getAddressList({
					address_level: 1
				}).then(res => {
					let result = res.result
					this.originProvinces = result	
					this.city[0] = 0
					result = result.map(item => {
						return item.name
					})
					this.addressRange[0] = result
					this.$api.getAddressList({
						address_pid: this.originProvinces[0].id,
						address_level: 2
					}).then(res => {
						let result = res.result
						this.originCitys = result
						this.city[1] = 0
						result = result.map(item => {
							return item.name
						})
						this.addressRange.splice(1, 1 ,result)
					})
				})
			},
			handleAddressChange() {
				this.filter.address_id = this.originCitys[this.city[1]].id
				this.address = this.originCitys[this.city[1]].name
			},
			addresColumnchange(e) {
				let detail = e.detail
				if(e.detail.column == 0) {
					let address_pid = this.originProvinces[e.detail.value].id
					this.city[0] = e.detail.value
					this.$api.getAddressList({
						address_pid: address_pid,
						address_level: 2
					}).then(res => {
						let result = res.result
						this.city[1] = 0
						this.originCitys = result
						result = result.map(item => {
							return item.name
						})
						this.addressRange.splice(1, 1 ,result)
					})
				}else if(e.detail.column == 1) {
					this.city[1] = e.detail.value
				}
			},
			addressCancel() {
				this.city = [0,0]
				this.addressRange = [[],[]]
				this.addressInit()
			},
			togglePage(index) {
				if(index == this.filterIndex) {
					this.filterIndex = -1
					this.triangleDeg[index] = 0
				}else{
					this.filterIndex = index
					this.triangleDeg  = this.triangleDeg.map(item=> {
						return 0
					})
					this.triangleDeg[index] = 180
					
					if(this.filterIndex == 0) {
						
					}else if(this.filterIndex == 1) {
						uni.showActionSheet({
						    itemList: ['选择价格', '1万以下', '1-3万', '3-5万', "5-10万", "15-20万", "20-25万", "25-30万", "35-40万", "40万以上"],
						    success:  (res) => {
						       this.priceIndex = res.tapIndex
							   this.triangleDeg[index] = 0
							   this.filterIndex = -1
							   this.filter.price_start = this.priceList[res.tapIndex].price_start
							   this.filter.price_end = this.priceList[res.tapIndex].price_end
							   this.mescroll.resetUpScroll()
						    },
						    fail: function (res) {
						        console.log(res.errMsg);
						    }
						});
					}else if(this.filterIndex == 2) {
						
					}else if(this.filterIndex == 3) {
						uni.showActionSheet({
						    itemList: ['选择车龄', "1年以内", "1-3年", "3-5年", "5年以上"],
						    success:  (res) => {
						        this.ageIndex = res.tapIndex
								this.triangleDeg[index] = 0
								this.filterIndex = -1
								this.filter.car_age = this.ageList[res.tapIndex].value
								this.mescroll.resetUpScroll()
						    },
						    fail: function (res) {
						        console.log(res.errMsg);
						    }
						});
					}
				}
			},
			onConfirm() {
				this.mescroll.resetUpScroll()
			},
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			upCallback(mescroll) {
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					// console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" + curPageData.length);
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if (mescroll.num == 1) this.carList = []; //如果是第一页需手动制空列表
					this.carList = this.carList.concat(curPageData); //追加新数据
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				// successCallback(new Array(10).fill(0))
				this.$api.getCarList({
					page: pageNum,
					number: pageSize,
					title: this.keyWord,
					brand_id: this.filter.brand_id,
					address_id: this.filter.address_id,
					car_age: this.filter.car_age,
					price_start: this.filter.price_start,
					price_end: this.filter.price_end,
					side: 'BUY',
					user_id: '',
					status: 'checked'
				}).then(res => {
					successCallback && successCallback(res.result);
				}).catch(err => {
					errorCallback && errorCallback();
				})
			}
		},
		onLoad() {
			this.brandInit()
			this.addressInit()
		}
	}
</script>

<style lang="scss">
	.buy-car-container{
		.filter-container{
			flex-shrink: 0;
			width: 100%;
			height: 44px;
			position: fixed;
			z-index: 997;
			flex-wrap: nowrap;
			display: flex;
			flex-direction: row;
			top: var(--window-top);
			left:0;
			view {
				display: flex;
				flex-wrap: nowrap;
			}
			.nav {
				width: 100%;
				height: 44px;
				border-bottom: solid 1rpx #eee;
				z-index: 12;
				background-color: #ffffff;
				flex-direction: row;
				.first-menu {
					width: 100%;
					font-size: 13px;
					color: #757575;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					transition: color .2s linear;
			
					&.on {
						color: #ec652b;
			
						.iconfont {
							color: #ec652b;
						}
					}
					.name {
						height: 20px;
						text-align: center;
						text-overflow: clip;
						overflow: hidden;
					}
					.iconfont {
						width: 13px;
						height: 13px;
						align-items: center;
						justify-content: center;
						transition: transform .2s linear, color .2s linear;
					}
				}
			}
		}
		.input-container{
			margin: 120upx 12upx 32upx;
			.search-input{
				border-radius: 8upx;
				width: 100%;
				height: 72upx;
				line-height: 72upx;
				border: none;
				font-size: 30upx;
				padding-left: 16upx;
				background: #F2F2F2;
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
					background-color: #E7E7E7;
				}
				.right{
					flex: 1;
					margin-left: 10upx;
					view{
						padding: 6upx;
					}
					.car-name{
						display: flex;
						justify-content: space-between;
						align-items: center;
						color:#12A232;
						.set-top{
							display: flex;
							justify-content: center;
							align-items: center;
							color: #f60;
							border: 1px solid #f60;
							height: 36upx;
							font-size: 24upx;
							border-radius: 6upx;
							width: 70upx;
						}
					}
					.time-container{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.address{
							color: #ff3333;
						}
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
	/* 字体图标 */
	@font-face {
		font-family: "HM-FD-font";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALAAAsAAAAABpQAAAJzAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgp4gQIBNgIkAwwLCAAEIAWEbQc5G8sFERWMIbIfCbbzqA4hp7InSBibVsYGb4J42o82b3e/nJlHMw/NHbGOlwKJRCRpwzPtpAECCOZubdqxjYpQLMlVg+70/08edrgQOtx2ukpVyApZn+dyehPoQObHo3O85rYx9vOjXoBxQIHugW2yIkqIW2QXcScu4jwE8CSWbKSmrqUHFwOaJoCsLM5P4haSGIxRcRHshrUGucLCVcfqI3AZfV/+USguKCwNmtsxVztDxU/n55C+3W0Z4QQpEOTNFqCBbMCAjDUWB9CIwWk87aa70cYgqLkyd3dEmm+18R8eKATEBrV7A5CulBT8dKiWOYZk412XNcDdKSEKSGODnyKIDl+dmVt9/Dx4pu/xyeutkMlHISGPTsPCnoTNP9nOT6wTtDdlO6dPr47efvj942lkYuQzrhMKEjq9N6y98P3340gmlJ/RStUD6F31CAEEPtUW94/7rf+7XgaAz57X0ZHXAGsFFwVgw38yALuMb0IBbVyNamFYEw4oKMDTj3AHRQP5Pt4dci9VwSVkRNQh5r7CLskZadhsWHhRDBsXczk8ZYk3ewnCxmQeQKa3BOHvA8XXO2j+vqRhf7CE+sPmn4anvoL29JLa4qqaUQkmoK+QG2osCckq7txi2leK86aIPyJ3eQZ8xytXYmyQ51jQndJAxIJlqiGSLsOqImiZCjTiZCJt6Lq26U2OoXqwUo0hRaAE0K5AziANy/uLVeXzWyjVqyjcoeupjxDr5MMDn8MDkLG9Aenu5ZrOSSoghAUsRmogkkahSoWAtnlUARnCkY3It0Iu7mWhdmd9Z/19BwBP6GidEi0G56opckXTGZVSPxgAAAA=');
	}
	.iconfont {
		font-family: "HM-FD-font" !important;
		font-size: 13px;
		font-style: normal;
		color: #757575;
		&.triangle {
			&:before {
				content: "\e65a";
			}
		}
		&.selected {
			&:before {
				content: "\e607";
			}
		}
	}
</style>
