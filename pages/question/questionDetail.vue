<template>
	<view class="question-detail-container">
		<qi-loading></qi-loading>
		<scroll-view scroll-y="true" :style="{height: scrollHeight + 'px'}">
			<view class="raise-question">
				<image :src="questionDetail.user && questionDetail.user.user_pho ? questionDetail.user && questionDetail.user.user_pho : '/static/image/mine/default.jpg'" alt="" class="avatar"></image>
				<view class="right">
					<view class="user-detail">
						<view class="user-name">{{questionDetail.user && questionDetail.user.user_name}}</view>
						<view class="question-state">{{questionDetail.is_open ? '' : '已关闭'}}</view>
					</view>
					<view class="time">{{questionDetail.created_at | momentTime}}</view>
				</view>
			</view>
			<view class="question-title" v-html="questionDetail.content"></view>
			<view class="info">关注:{{questionDetail.attention}}&nbsp;&nbsp;答案:{{questionDetail.reply_num}}&nbsp;&nbsp;悬赏:{{questionDetail.reward}}</view>
			<view class="content"></view>
			<view class="head bd-b">最佳答案</view>
			<view v-for="(item, index) in betterReply" :key="index">
				<view class="list-user">
					<img :src="item.user.user_pho ? item.user.user_pho : '/static/image/mine/default.jpg'" alt="" class="avatar">
					<view class="right">
						<!-- <view class="user-detail">
							<view class="question-state">{{index + 1}}楼</view>
						</view> -->
						<view class="time">{{item.created_at | momentTime}}</view>
					</view>
				</view>
				<view class="content" v-html="item.content"></view>
			</view>
			<view class="content" v-if="!betterReply.length">暂无最佳答案</view>
			<view class="head bd-b">全部回答</view>
			<view v-for="(item, index) in questionDetail.reply" :key="index">
				<view class="list-user">
					<img :src="item.user.user_pho ? item.user.user_pho : '/static/image/mine/default.jpg'" alt="" class="avatar">
					<view class="right">
						<view class="user-detail">
							<view class="question-state">{{index + 1}}楼</view>
						</view>
						<view class="time">{{item.created_at | momentTime}}</view>
					</view>
				</view>
				<view class="content" v-html="item.content"></view>
			</view>
			<view class="content" v-if="!questionDetail.reply.length">暂无回答</view>
		</scroll-view>
		<view class="fixed-bottom" v-if="questionDetail.is_open">
			<input type="text" v-model="content" placeholder="请输入回答">
			<view class="send-btn" @tap="handleSubmit">发送</view>
		</view>
	</view>
</template>

<script>
	import { momentTime } from '@/filters'
	export default {
		data() {
			return {
				id: '',
				betterReply: [],
				questionDetail: {},
				content: '',
				scrollHeight: ''
			}
		},
		filters: {
			momentTime
		},
		onLoad(options) {
			this.scrollHeight = uni.getSystemInfoSync().windowHeight - 50
			this.id = options.id
			this.loadDetail()
		},
		methods: {
			loadDetail() {
				this.$api.getQuestionDetail({
					question_id: this.id
				}).then(res => {
					this.questionDetail = res.result
					if(this.questionDetail.reply.length > 0 ) {
						this.betterReply = this.questionDetail.reply.filter(item => {
							return item.is_better == 'yes'
						})
					}
				})
			},
			handleSubmit() {
				let token = uni.getStorageSync('token')
				if(!token) {
					return uni.navigateTo({
						url: '/pages/login/login'
					})
				}
				if(!this.content) return 
				this.$api.replyQuestion({
					qs_id: this.id,
					content: this.content,
					user_id: uni.getStorageSync('userInfo').id
				}).then(res => {
					this.content = ''
					this.loadDetail()
				})
			}
		}
	}
</script>

<style lang="scss">
	.question-detail-container{
		font-size: 28upx;
		.raise-question{
			display: flex;
			align-items: center;
			padding: 0 32upx;
			margin-top: 20upx;
			padding-top: 20upx;
			height: 134upx;
			.avatar{
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 40upx;
			}
			.right{
				flex: 1;
			}
			.user-detail{
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #333;
				font-size: 32upx;
				height: 48upx;
				line-height: 64upx;
				.user-name{
					
				}
				.question-state{
					color: red;
					font-size: 28upx;
				}
			}
			.time{
				color: #c9c6c6;
				font-size: 22upx;
			}
		}
		.question-title{
			font-size: 32upx;
			line-height: 44upx;
			padding: 32upx;
		}
		.info{
			font-size: 28upx;
			padding: 0 32upx 32upx 32upx;
			color: #666666;
			text-align: right;
			width: 100%;
			border-bottom: #D9D9D9 1px dashed;
		}
		.content{
			font-size: 32upx;
			line-height: 180%;
			padding: 20upx 32upx;
			border-bottom: #D9D9D9 1px solid;
		}
		.head{
			height: 88upx;
			line-height: 88upx;
			font-size: 32upx;
			padding: 0 32upx;
		}
		.bd-b {
		    border-bottom: #D9D9D9 1px solid;
		}
		.list-user{
			display: flex;
			align-items: center;
			padding: 0 32upx;
			margin-top: 20upx;
			padding-top: 20upx;
			height: 134upx;
			.avatar{
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				margin-right: 40upx;
			}
			.right{
				flex: 1;
			}
			.user-detail{
				color: #333;
				font-size: 32upx;
				height: 48upx;
				line-height: 64upx;
				text-align: right;
				.question-state{
					color: red;
					font-size: 28upx;
				}
			}
			.time{
				color: #c9c6c6;
				font-size: 22upx;
			}
		}
		.fixed-bottom{
			height: 100upx;
			display: flex;
			justify-content: space-between;
			align-items: center;	
			background: #fff;
			padding: 10upx;
			input{
				background: #EFEFEF;
				width: 600upx;
				height: 80upx;
				font-size: 26upx;
				border-radius:10upx;
				padding-left: 21upx;
				box-sizing: border-box;
			}
			.send-btn{
				width: 120upx;
				height: 80upx;
				line-height: 80upx;
				text-align: center;
				color: #fff;
				font-size: 26upx;
				background: rgb(187, 39, 29);
				border-radius:10upx;
			}
		}
	}
</style>
