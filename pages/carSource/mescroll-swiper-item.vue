<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
		<view class="question-list">
			<view class="address-item" v-for="(item, index) in list" :key="index" @tap="goDetail(item.id)">
				<view class="item-top">
					<view class="address-detail">{{item.title}}</view>
				</view>
				<view class="item-bottom">
					<view class="phone">{{item.created_at | momentTime}}</view>
					<view class="operator" @tap.stop="handleOperator(item.id)"></view>
				</view>
			</view>
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
			handleSelect(index) {
				this.list[index].checked = !this.list[index].checked 
				let questions = this.list.filter(item => {
					return item.checked
				})
				this.$store.commit('selectQuestion',questions )
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/question/questionDetail?id=${id}`
				})
			},
			handleOperator(id) {
				uni.showActionSheet({
				    itemList: ['删除'],
				    success:  (res) => {
				        uni.showModal({
				            title: '提示',
				            content: '确定要删除吗？此操作不可撤销',
				            success: (res) => {
				                if (res.confirm) {
				                    this.$api.deleteCar({
										car_ids: id
									}).then(res => {
										this.$alert('删除成功')
										this.mescroll.resetUpScroll()
									})
				                } else if (res.cancel) {
				                    console.log('用户点击取消');
				                }
				            }
				        });
				    },
				    fail:  (res) => {
				        console.log(res.errMsg);
				    }
				});
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
				// successCallback && successCallback([1,2,3]);
				let statusList = ['passed', 'checking', 'unpassed', 'expired', 'done']
				this.$api.getCarList({
					page: pageNum,
					number: pageSize,
					title: this.keyWord,
					status: statusList[this.index],
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
		.address-item{
			box-shadow: 0px 0px 10upx #cbcbcb;
			padding: 8upx 10upx;
			margin: 10upx 12upx;
			font-size:28upx;
			.item-top, .item-bottom{
				height: 76upx;
				line-height: 30upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.phone{
				font-size:24upx;
				color: #999999;
			}
			.select{
				width: 64upx;
				height: 60upx;
				background: url('/static/image/mine/icon-check.png') no-repeat center center;
				background-size: 40upx 40upx;
				font-size: 24upx;
				color: #E46B09;
				&.checked{
					background-image: url('/static/image/mine/icon-checked.png');
				}
			}
			.operator{
				width: 64upx;
				height: 60upx;
				background: url('/static/image/mine/icon-sheet.png') no-repeat center center;
				background-size: 40upx 40upx;
				font-size: 24upx;
				color: #E46B09;
			}
		}
	}
</style>
