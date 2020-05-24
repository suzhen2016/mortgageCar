<template>
	<mescroll-uni  top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
	 @init="mescrollInit">
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
	 </mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import { momentDate } from '@/filters'
	export default {
		components: {
			MescrollUni,
		},
		data() {
			return {
				carList: [],
				keyword: '',
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: true,
				},
				upOption: {
					auto: false, 
					noMoreSize: 4,
					empty: {
						tip: '~ 暂无信息 ~', // 提示
						// btnText: '去看看'
					}
				},
			}
		},
		filters: {
			momentDate
		},
		onLoad(options) {
			this.keyword = options.keyword
		},
		methods: {
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
				console.log(pageNum, pageSize)
				this.$api.getCarList({
					page: pageNum,
					number: pageSize,
					title: this.keyword,
					side: 'BUY',
					brand_id: '',
					address_id: '',
					car_age: '',
					price_start: '',
					price_end: '',
					user_id: '',
					status: 'checked'
				}).then(res => {
					successCallback && successCallback(res.result);
				}).catch(err => {
					errorCallback && errorCallback();
				})
			}
		}
	}
</script>

<style lang="scss">
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
</style>
