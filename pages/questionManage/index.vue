<template>
	<view class="message-container">
		<div class="input-container">
			<input type="text" v-model="keyWord" placeholder="输入关键词索" @confirm="onConfirm"/>
		</div>
		<scroll-view scroll-x scroll-with-animation class="tab-box" :scroll-left="scrollLeft">
			<view class="tab-item" v-for="(item, index) in tabs" :key="index" :class="{'active': selectedIndex == index}" :data-current="index" @tap="handleSelect">
				<text>{{item.value}}</text>
			</view>
		</scroll-view>
		<view class="question-content">
			<swiper class="swiper" :current="selectedIndex" @change="swiperChange">
				<swiper-item v-for="(item, index) in tabs" :key="index">
					<mescroll-item :i="parseFloat(item.key)" :index="selectedIndex" :keyWord="keyWord" :keyWordChange="keyWordChange"></mescroll-item>
				</swiper-item>
			</swiper>
		</view>
		<view class="fixed-bottom" v-if="selectQuestions.length > 0">
			<view class="delete-btn" @tap="handleDelete">删除选中</view>
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
				keyWord: '',
				selectedIndex: 0,
				scrollLeft: '',
				keyWordChange: false,
				tabs: [
					{
						key: 0,
						value: '已发布'
					},
					{
						key: 1,
						value: '审核中'
					},
					{
						key: 2,
						value: '未通过'
					}
				]
			}
		},
		computed: {
			selectQuestions() {
				return this.$store.state.selectQuestions
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: './publish'
			})
		},
		onUnload() {
			this.$store.commit('selectQuestion',[] )
		},
		methods: {
			onConfirm() {
				this.keyWordChange = true
				setTimeout(() => {
					this.keyWordChange = false
				}, 60)
			},
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
				if(this.selectQuestions.length > 0) {
					this.keyWordChange = true
					setTimeout(() => {
						this.keyWordChange = false
					}, 60)
				}
				this.$store.commit('selectQuestion',[] )
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor() {
				if (this.selectedIndex > 3) {
					//这里距离按实际计算
					this.scrollLeft = 300
				} else {
					this.scrollLeft = 0
				}
			},
			handleDelete() {
				uni.showModal({
				    title: '提示',
				    content: '确定要删除选中问答吗？',
				    success: (res) => {
				        if (res.confirm) {
							let ids = this.selectQuestions.map(item => {
								return item.id
							})
				           this.$api.deleteQuestion({
								ids
				           }).then(res => {
								this.$alert('删除成功')
								this.$store.commit('selectQuestion',[] )
								this.keyWordChange = true
								setTimeout(() => {
									this.keyWordChange = false
								}, 60)
				           })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
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
			height: calc(100vh - 452upx);
			.swiper{
				height: 100%;
			}
		}
		.fixed-bottom{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 96upx;
			background: #F8F8F8;
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			z-index: 10;
			.delete-btn{
				width: 160upx;
				height: 60upx;
				line-height: 60upx;
				text-align: center;
				border-radius: 8upx;
				background: #E64340;
				color: #FFFFFF;
				font-size: 24upx;
				margin-right: 20upx;
			}
		}
	}
</style>
