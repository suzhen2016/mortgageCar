<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
		<view class="question-list">
			<navigator hover-class="none" :url="`./detail?id=${item.id}`" class="question-item" v-for="(item, index) in list" :key="index">
				<view class="question-title">{{item.title}}</view>
				<view class="question-footer">
					<view class="question-time">{{item.created_at | momentTime}}</view>
					<view class="question-state">{{item.receiver}}</view>
				</view>
			</navigator>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import { momentTime } from '@/filters'
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
			},
			keyWord: {
				type: String,
				default: ''
			},
			keyWordChange: {
				type: Boolean,
				default: false
			}
		},
		filters: {
			momentTime
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
				this.$api.getMessageList({
					page: pageNum,
					number: pageSize,
					is_open: 'open',
					title: this.keyWord,
					status: this.index == 0 ? 'received' : this.index == 1 ? 'sent' : this.index == 2 ? 'draft' : 'recycle',
					user_id: uni.getStorageSync('userInfo').id
				}).then(res => {
					successCallback && successCallback(res.result);
				}).catch(err => {
					errorCallback && errorCallback();
				})
			}
		},
		watch: {
			index(val) {
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.resetUpScroll()
				}
				// this.mescroll.triggerDownScroll();
			},
			keyWordChange(val) {
				if(val) {
					this.isInit = false
					this.mescroll.resetUpScroll()
				}
			}
		}
	}
</script>

<style lang="scss">
	.question-list{
		.question-item{
			box-shadow: 0px 0px 22upx #e8e7e7;
			width: 95%;
			margin: 20upx auto;
			border: none;
			padding: 20upx;
			.question-title{
				height: 80upx;
				line-height: 40upx;
				font-size: 30upx;
			}
			.question-footer{
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 80upx;
				line-height: 40upx;
			}
			.question-time, .question-state{
				font-size: 24upx;
				color: #999999;
			}
		}
	}
</style>
