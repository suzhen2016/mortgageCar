<template>
	<view class="message-detail">
		<qi-loading></qi-loading>
		<view class="title">{{detail.title}}</view>
		<view class="info">{{detail.created_at | momentTime}}</view>
		<view class="content">
			<u-parse :content="detail.content"></u-parse>
		</view>
		<view class="delete-btn" @tap="handleDelete(detail.id)">删除</view>
	</view>
</template>

<script>
	import uParse from '@/components/u-parse/u-parse.vue'
	import { momentTime } from '@/filters'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				id: '',
				detail: {}
			}
		},
		filters: {
			momentTime
		},
		onNavigationBarButtonTap() {
			uni.navigateBack()
		},
		onLoad(options) {
			this.id = options.id
			this.loadDetail()
		},
		methods: {
			loadDetail() {
				this.$api.getMessageDetail({
					bot_id: this.id
				}).then(res => {
					this.detail = res.result
				})
			},
			handleDelete(id) {
				uni.showModal({
				    title: '提示',
				    content: '确定要删除此信件吗？此操作不可撤销',
				    success:  (res) => {
				        if (res.confirm) {
				            this.$api.deleteMessage({
								ids: [id]
							}).then(res => {
								this.$alert('删除成功')
								uni.navigateBack()
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
	.message-detail{
		.title{
			font-size: 36upx;
			line-height: 44upx;
			padding: 32upx;
		}
		.info{
			font-size: 28upx;
			padding: 0 32upx 32upx 32upx;
			color: #666666;
			border-bottom: #A7A7AA 0.5px solid;
		}
		.content{
			font-size: 32upx;
			line-height: 180%;
			padding: 20upx 32upx;
			border-bottom: #A7A7AA 0.5px solid;
			overflow: hidden;
			img{
				max-width: 100%;
			}
		}
		.delete-btn{
			width: 686upx;
			height: 84upx;
			line-height: 84upx;
			text-align: center;
			color: #fff;
			font-size: 28upx;
			border-radius: 6upx;
			background: #BB271D;
			margin: 40upx auto;
		}
	}
</style>
