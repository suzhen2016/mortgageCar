<template>
	<view class="question-container">
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
						value: '全部问题'
					},
					{
						key: 1,
						value: '等待解决'
					},
					{
						key: 2,
						value: '已经解决'
					}
				]
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/buying/publish'
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
	.question-container{
		display: flex;
		flex-direction: column;
		height: 100vh;
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
			flex: 1;
			.swiper{
				height: 100%;
			}
		}
	}
</style>
