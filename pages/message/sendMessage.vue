<template>
	<view class="send-message">
		<view class="ui-form">收件人<em>*</em></view>
		<view>
			<input type="text" v-model="receiver" class="input">
		</view>
		<view class="ui-form">标题<em>*</em></view>
		<view>
			<input type="text" v-model="title" class="input">
		</view>
		<view class="ui-form">内容<em>*</em></view>
		<uEditor class="ql-container" @change="getContent"></uEditor>
		<view class="ui-form">选项</view>
		<view style="font-size: 26upx;">
			<radio-group @change="radioChange">
				<label class="radio-item" v-for="(item, index) in items" :key="item.value">
					<view>
						<radio :value="item.value" :checked="index === current" />
					</view>
					<view>{{item.value}}</view>
				</label>
			</radio-group>
		</view>
		<view class="send-btn" @tap="handlePublish">发送</view>
		<view>
			<view class="send-item">今日可发<text class="one">10</text>次</view>
			<view class="send-item">当前已发<text class="two">0</text>次</view>
			<view class="send-item">还可以发<text class="three">10</text>次</view>
		</view>
	</view>
</template>

<script>
	import editor from "@/components/editor/editor"
	export default {
		components: {
			uEditor: editor
		},
		data() {
			return {
				receiver: '',
				title: '',
				content: '',
				items: [
					{
						key: 0,
						value: '不发送，保存为草稿'
					},
					{
						key: 1,
						value: '保存到已发送'
					},
					{
						key: 2,
						value: '已读回执'
					}
				],
				current: 0
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods:{
			getContent(e) {
				this.content = e
			},
			radioChange (evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			handlePublish() {
				if(!this.receiver) {
					return this.$alert('请输入收件人')
				}
				if(!this.title) {
					return this.$alert('请输入标题')
				}
				if(!this.content) {
					return this.$alert('请输入补充说明')
				}
				let userInfo = uni.getStorageSync('userInfo')
				this.$api.createMessage({
					receiver: this.receiver,
					title: this.title,
					content: this.content,
					user_id: uni.getStorageSync('userInfo').id,
					msg_status: this.current == 0 ? 'draft' : this.current == 1 ? 'sent ' : 'received',
					is_open: 'open'
				}).then(res => {
					this.$alert('发送成功')
					uni.navigateBack()
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.send-message{
		padding: 0 32upx;
		.ui-form{
			padding: 32upx 0;
			font-size: 32upx;
			em{
				padding-left: 12upx;
				font-size: 24upx;
				color: #FF0000;
			}
		}
		.input{
			height: 64upx;
			line-height: 64upx;
			border: #B2B2B2 1px solid;
			padding: 0 12upx;
			font-size: 28upx;
		}
		.ql-container{
			border: #B2B2B2 1px solid;
		}
		.radio-item{
			display: flex;
			margin-bottom: 20upx;
		}
		.send-btn{
			height: 84upx;
			line-height: 84upx;
			text-align: center;
			color: #fff;
			font-size: 28upx;
			border-radius: 6upx;
			background: #BB271D;
			margin: 40upx 0;
		}
		.one, .two, .three{
			margin: 0 10upx;
		}
		.one{
			color: red;
		}
		.three{
			color: blue;
		}
		.send-item{
			margin: 20upx 0;
			font-size: 28upx;
		}
	}
</style>
