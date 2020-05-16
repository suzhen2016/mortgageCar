<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
		<view class="buying-list">
			<navigator hover-class="none" :url="`/pages/buying/detail?id=${item.id}`" class="buying-item" v-for="(item,index) in list" :key="index">
				<view class="car-text">
					<view class="name">
						<view class="title">{{item.title}}</view>
						<view class="price">{{item.price}}万</view>
					</view>
					<view class="time">{{item.created_at | getYear}}年 | {{item.kilometre}}公里</view>
					<view class="time">{{item.address.province}} » {{item.address.city}}</view>
				</view>
			</navigator>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import { getYear } from '@/filters'
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				list: [],
				mescroll: null, //mescroll实例对象
				downOption:{
					auto:true, // 不自动加载
				},
				upOption:{
					auto:false, // 不自动加载
					noMoreSize: 4, 
					empty:{
						tip: '抱歉,暂相关信息', // 提示
						// btnText: '去看看'
					}
				},
			}
		},
		filters: {
			getYear
		},
		onLoad() {
			
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './publish'
			})
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
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData)=>{
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					console.log("i="+this.i+", mescroll.num=" + mescroll.num + ", mescroll.size=" + mescroll.size + ", curPageData.length=" + curPageData.length);
					mescroll.endSuccess(curPageData.length);
					//设置列表数据
					if(mescroll.num == 1) this.list = []; //如果是第一页需手动制空列表
					this.list = this.list.concat(curPageData); //追加新数据
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
				// successCallback && successCallback([1,2,3]);
				this.$api.getCarBuyList({
					page: pageNum,
					number: pageSize
				}).then(res => {
					let result = res.result && res.result.map(item => {
						return {
							...item,
							price: Math.round((item.price /10000) * 100) / 100
						}
					})
					successCallback && successCallback(result);
				}).catch(err => {
					errorCallback && errorCallback();
				})
			}
		}
	}
</script>

<style lang="scss">
	.buying-list{
		.buying-item{
			border-bottom: 1px solid #eee;
			padding: 20upx;
			.car-text{
				width: 90%;
				margin-left: 30upx;
				.name{
					font-size: 32upx;
					height: 46upx;
					line-height: 46upx;
					color: #020202;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.title{
						max-width: 400upx;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.price{
						font-size: 34upx;
						color: #BB271d;
					}
				}
				.time{
					font-size: 26upx;
					color: #999999;
				}
			}
		}
	}
</style>
