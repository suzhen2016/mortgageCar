<template>
	<view class="new-detail">
		<view class="title">为什么抵押车的价格会存在差异？</view>
		<view class="info">
			2020-05-06 16:32&nbsp;&nbsp;&nbsp;  浏览: <text>4545</text>
		</view>
		<view class="content" v-html="article"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article: '有些车是全款带大本带结清证明的，这种车在抵押车市场占比很小，在很多人眼里算是安全系数比较高的车，市场热度高，出价比同系列的车就高一些。'
			}
		},
		onLoad() {
			
		},
		onNavigationBarButtonTap() {
			uni.showActionSheet({
			    itemList: ['新闻首页', '取消'],
			    success(res) {
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
		}
	}
</style>
