<template>
	<view class="message-container">
		<scroll-view scroll-x scroll-with-animation class="tab-box" :scroll-left="scrollLeft">
			<view class="tab-item" v-for="(item, index) in tabs" :key="index" :class="{'active': selectedIndex == index}" :data-current="index" @tap="handleSelect">
				<text>{{item.value}}</text>
			</view>
		</scroll-view>
		<view class="question-content">
			<swiper class="swiper" :current="selectedIndex" @change="swiperChange">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<mescroll-item :i="parseFloat(item.key)" :index="selectedIndex"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import MescrollItem from "./mescroll-swiper-item.vue";
	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				selectedIndex: 0,
				scrollLeft: '',
				tabs: [
					{
						key: 0,
						value: '资金流水'
					},
					{
						key: 1,
						value: '信息付费'
					},
					{
						key: 2,
						value: '打赏记录'
					}
				]
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './charge'
			})
		},
		methods: {
			handleSelect(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.selectedIndex == cur) {
					return false;
				} else {
					this.selectedIndex = cur
				}
			},
			swiperChange(e) {
				this.selectedIndex = e.detail.current
				this.checkCor();
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor() {
				if (this.selectedIndex > 3) {
					//这里距离按实际计算
					this.scrollLeft = 300
				} else {
					this.scrollLeft = 0
				}
			}
		}
	}
</script>

<style lang="scss">
	.message-container{
		height: 100vh;
		.input-container{
			padding: 32upx;
			input{
				background: #f0f0f0 url(../../static/image/mine/ico-search.png) no-repeat 12upx center;
				background-size: 32upx 32upx;
				padding: 0 56upx;
				border: none;
				height: 64upx;
				line-height: 64upx;
			}
		}
		.tab-box{
			display: flex;
			height: 80upx;
			margin: 10upx 0;
			background: #fff;
			white-space: nowrap;
			.tab-item{
				display: inline-block;
				width: 33%;
				line-height: 80upx;
				text-align: center;
				color: #999;
				font-size: 24upx;
				position: relative;
				&.active{
					&:after{
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 85%;
						height: 4upx;
						background-color: #BB271D;
					}
				}
			}
		}
		.question-content{
			height: 100%;
			.swiper{
				height: 100%;
			}
		}
	}
</style>
