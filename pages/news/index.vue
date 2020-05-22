<template>
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
		<view class="news-list">
			<navigator hover-class="none" :url="`./newDetail?id=${item.id}`" class="news-item" v-for="(item, index) in list" :key="index" >
				<view class="summary">
					<view class="title">{{item.title}}</view>
					<view class="excerpt wordbreak">{{item.excerpt}}</view>
					<view class="author list-inline">
						<view>{{item.created_at | momentDate}}</view>
						<view class="pageview">阅读量 : {{item.views}}</view>
					</view>
				</view>
				<view class="newsimg">
					<image :src="item.img ? `http://39.99.187.24/media/${item.img}` : '../../static/image/mine/newscar.jpg'"></image>
				</view>
			</navigator>
		</view>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import { momentDate } from '@/filters/index.js'
	export default{
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
						tip: '抱歉,暂相关资讯', // 提示
						// btnText: '去看看'
					}
				},
			}
		},
		filters: {
			momentDate
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
				this.$api.getNewList({
					page: pageNum,
					number: pageSize,
					cat_id: 0
				}).then(res => {
					console.log(res.result)
					successCallback && successCallback(res.result);
				}).catch(err => {
					errorCallback && errorCallback();
				})
			}
		}
	}
</script>

<style lang="scss">
	.news-list{
		padding: 0 30upx 20upx;
		margin-top: 20upx;
		.news-item{
			box-shadow: 0px 0px 22upx #e8e7e7;
			padding: 24upx 20upx!important;
			margin: 30upx 0!important;
			border-bottom: 1px solid #eee;
			display: flex;
			height: 240upx;
			.summary{
				width: 71%;
				margin-right: 3%;
				.title{
					margin: 0 10upx 0 0;
					font-size: 32upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.excerpt{
					margin: 10upx 0 0;
					height: 84upx;
					color: #777;
					font-size: 26upx;
					line-height: 1.6;
					overflow: hidden;
				}
				.author{
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 10upx;
					color: #999;
					font-size: 26upx;
					view{
						padding-right: 10upx;
						padding-left: 10upx;
					}
					.pageview{
						color: #BB271D;
					}
				}
			}
			.newsimg{
				width: 26%;
				image{
					width: 169upx;
					height: 169upx;
				}
			}
		}
	}
</style>
