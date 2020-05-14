<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback"
	 @init="mescrollInit">
		<view class="record-list">
			<view class="record-item" v-for="(item, index) in recordList" :key="index">
				<view class="record-top">
					<view class="num">+2</view>
					<view>余额:6</view>
				</view>
				<view class="record-bottom">
					<view>签到奖励</view>
					<view>2020-05-13 17:46</view>
				</view>
			</view>
		</view>
	 </mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			MescrollUni
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false, // 不自动加载
				},
				upOption: {
					auto: true, // 不自动加载
					// noMoreSize: 4,
					empty: {
						tip: '~ 空空如也 ~', // 提示
						// btnText: '去看看'
					}
				},
				recordList: []
			}
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
			
					if (mescroll.num == 1) this.recordList = []; //如果是第一页需手动制空列表
					this.recordList = this.recordList.concat(curPageData); //追加新数据
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
		}
	}
</script>

<style lang='scss'>
	.record-list{
		.record-item{
			box-shadow: 0px 0px 10upx #cbcbcb;
			padding: 20upx 20upx;
			margin: 10upx 12upx;
			.record-top, .record-bottom{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24upx;
				color: #999999;
				height: 60upx;
				line-height: 30upx;
				.num{
					font-size: 48upx;
					color: #333;
				}
			}
		}
	}
</style>
