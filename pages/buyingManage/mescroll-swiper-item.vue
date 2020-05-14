<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
		<view class="buying-list">
			<navigator hover-class="none" url="/pages/buying/detail" class="buying-item" v-for="(item,index) in list" :key="index">
				<view class="car-text">
					<view class="name">
						<view class="title">急需求购车一台</view>
						<view class="price">30.00万</view>
					</view>
					<view class="time">2020年 | 2万公里</view>
					<view class="time">湖北省 » 武汉</view>
				</view>
			</navigator>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			MescrollUni
		},
		props:{
			i: [Number,String], // 每个tab页的专属下标
			index: { // 当前tab的下标
				type: [Number,String],
				default(){
					return 0
				}
			}
		},
		data() {
			return {
				list: [],
				isInit: false,// 列表是否已经初始化
				mescroll: null, //mescroll实例对象
				downOption:{
					auto:false, // 不自动加载
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
		mounted() {
			if(this.i === 0){
				this.isInit = true; // 标记为true
				this.mescroll.resetUpScroll()
			}
		},
		methods: {
			goDetail(item) {
				uni.navigateTo({
					url: './questionDetail'
				})
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
				successCallback && successCallback([1,2,3]);
				// this.$api.getCourseList({
				// 	pageStart: pageNum,
				// 	pageSize,
				// 	status: this.index == 0 ? '' : this.index,
				// 	userId: uni.getStorageSync('userInfo').id
				// }).then(res => {
				// 	successCallback && successCallback(res.data.result);
				// }).catch(err => {
				// 	errorCallback && errorCallback();
				// })
			}
		},
		watch: {
			index(val) {
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.resetUpScroll()
				}
				// this.mescroll.triggerDownScroll();
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
