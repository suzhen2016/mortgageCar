<template>
	<view class="buying-publish">
		<view class="ui-form">您的提问<em>*</em></view>
		<view>
			<input type="text" v-model="title" class="input">
		</view>
		<view class="ui-form">问题分类<em>*</em></view>
		<view class="select-type">
			<view class="type-select" @tap="handleSelectType">{{typeKey ? types[typeKey - 1].name : '选择分类'}}</view>
		</view>
		<view class="ui-form">补充说明</view>
		<view class="form-content">
			<uEditor class="ql-container"></uEditor>
		</view>
		<view class="ui-form">悬赏金币</view>
		<view class="coin-picker">
			<picker class="picker" @change="bindPickerChange" :value="index" :range="coins">
				<view class="uni-input">{{coins[index]}}</view>
			</picker>
			<view class="des">您目前的金币为4</view>
		</view>
		<view class="ui-form">匿名设定</view>
		<view>
			<label class="set-secret">
				<view>
					<checkbox :checked="checked" @tap="checked = !checked"/>
				</view>
				<view>您可以对问题设定匿名，但您需要付出0金币 </view>
			</label>
		</view>
		<view class="submit-btn">发布</view>
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
				title: '',
			    index: 0,
				coins: [0,5,10,15,20,30,50,80,100],
				checked: false,
				types: [
					{
						key: '1',
						name: '基础分类'
					},
					{
						key: '2',
						name: '新手知识'
					},
					{
						key: '3',
						name: '基础问题'
					}
				],
				typeKey: ''
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		methods:{
			bindPickerChange(e) {
				this.index = e.target.value
			},
			handleSelectType() {
				let list = this.types.map(item => {
					return item.name
				})
				uni.showActionSheet({
				    itemList: list,
				    success: (res) => {
						this.typeKey = this.types[res.tapIndex].key
				    },
				    fail: (res) => {
				        
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.buying-publish{
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
			font-size: 26upx;
		}
		.form-content{
			color: #666;
			font-size: 28px;
			.container{
				border:1px solid #e5e5e5;
			}
		}
		.coin-picker{
			display: flex;
			align-items: center;
			color: #666;
			font-size: 26upx;
			.picker{
				width: 106upx;
				padding: 0 6upx;
				height: 64upx;
				line-height: 64upx;
				border: #B2B2B2 1px solid;
				margin: 0 20upx 20upx 0;
				background: #FFFFFF;
			}
			.des{
				flex: 1;
				height: 64upx;
				line-height: 64upx;
			}
		}
		.set-secret{
			display: flex;
			font-size: 26upx;
		}
		.submit-btn{
			width: 560upx;
			height: 84upx;
			line-height: 84upx;
			text-align: center;
			background: #BB271D;
			color: #fff;
			margin: 40upx auto;
		}
		.type-select{
			width: 172upx;
			padding: 0 6upx;
			height: 64upx;
			line-height: 64upx;
			border: #B2B2B2 1px solid;
			margin: 0 20upx 20upx 0;
			background: #FFFFFF;
			color: #666;
			font-size: 26upx;
			text-align: center;
		}
	}
</style>
