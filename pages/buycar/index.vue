<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
	 @init="mescrollInit">
		<view class="buy-car-container">
			<HMfilterDropdown :filterData="filterData" :defaultSelected ="filterDropdownValue" :updateMenuName="true" @confirm="confirm" dataFormat="Object"></HMfilterDropdown>
			<view class="input-container">
				<input type="text" v-model="keyWord" placeholder="请输入关键词" class="search-input" maxlength="20"/>
			</view>
			<view class="car-list">
				<navigator hover-class="none" url="/pages/carDetail/index" class="car-item" v-for="(item, index) in 10" :key="index">
					<img src="https://jjtdyc.oss-cn-shenzhen.aliyuncs.com/upload/202005/01/2123337156997.jpeg" alt="">
					<view class="right">
						<view class="car-name">
							<view>11年雷克萨斯RX</view>
							<view class="set-top" v-if="index < 5">置顶</view>
						</view>
						<view class="time-container time">
							<view>上牌日期：2011年05月</view>
							<view class="address" v-if="index > 5">北京</view>
						</view>
						<view class="bottom">
							<view class="time">2020-05-01</view>
							<view class="money-num">￥14.30万</view>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	import HMfilterDropdown from '@/components/HM-filterDropdown/HM-filterDropdown.vue';
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import data from './data.js';//筛选菜单数据
	export default {
		components: {
			HMfilterDropdown,
			MescrollUni
		},
		data() {
			return {
				keyWord: '',
				filterData:[],
				filterDropdownValue: [],
				mescroll: null, //mescroll实例对象
				downOption: {
					use: false,
					auto: false, // 不自动加载
				},
				upOption: {
					auto: false, // 不自动加载
					// noMoreSize: 4,
					empty: {
						tip: '~ 空空如也 ~', // 提示
						// btnText: '去看看'
					}
				},
				carList: []
			}
		},
		methods: {
			confirm() {
				
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
				successCallback(new Array(10).fill(0))
				// request.favorite_list({
				// 	page: pageNum
				// }).then(res => {
				// 	successCallback && successCallback(res.list);
				// }).catch(err => {
				// 	errorCallback && errorCallback();
				// })
			}
		},
		onLoad() {
			this.filterDropdownValue = [
				[1,1,0],				//第0个菜单选中 一级菜单的第1项，二级菜单的第1项，三级菜单的第3项
				[null,null],			//第1个菜单选中 都不选中
				[1],					//第2个菜单选中 一级菜单的第1项
				[[0],[1,2,7],[1,0]],	//筛选菜单选中 第一个筛选的第0项，第二个筛选的第1,2,7项，第三个筛选的第1,0项
				[[0],[1],[1]],			//单选菜单选中 第一个筛选的第0项，第二个筛选的第1项，第三个筛选的第1项
			];
			this.filterData = data; 
		}
	}
</script>

<style lang="scss">
	.buy-car-container{
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
</style>
