<template>
	<view class="new-detail">
		<qi-loading></qi-loading>
		<view class="title">{{detail.title}}</view>
		<view class="info">
			{{detail.created_at | momentDate}}&nbsp;&nbsp;&nbsp;  浏览: <text>{{detail.views}}</text>
		</view>
		<view class="content" v-html="detail.body"></view>
	</view>
</template>

<script>
	import { momentDate } from '@/filters/index.js'
	export default {
		data() {
			return {
				id: '',
				detail: {},
			}
		},
		filters: {
			momentDate
		},
		onLoad(options) {
			this.id = options.id
			this.loadDetail()
		},
		onNavigationBarButtonTap() {
			uni.showActionSheet({
			    itemList: ['新闻首页', '取消'],
			    success:(res) => {
					if(res.tapIndex == 0) {
						uni.navigateBack({
							delta: 1
						})
					}
			    },
			    fail: function (res) {
			        console.log(res.errMsg);
			    }
			});
		},
		methods: {
			loadDetail() {
				this.$api.getNewDetail({
					news_id: this.id
				}).then(res => {
					this.detail = res.result
				})
			}
		}
	}
</script>

<style lang="scss">
	.new-detail{
		.title{
			font-size: 30upx;
			line-height: 44upx;
			padding: 32upx;
			text-align: center;
		}
		.info{
			font-size: 28upx;
			padding: 0 16px 16px 16px;
			color: #666666;
			text-align: center;
		}
		.content{
			font-size: 32upx;
			line-height: 180%;
			padding: 20upx 32upx;
			img{
				max-width: 100%;
			}
		}
	}
</style>
