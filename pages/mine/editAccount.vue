<template>
	<view class="edit-account">
		<uni-collapse :accordion="true">
		    <uni-collapse-item title="个人资料" :open="true">
		       <view class="detail-container">
				   <view class="margin">手机</view>
				   <view class="phone">
				   	<view>130111111111</view>
				   	<navigator hover-class="none" :url="`./send?type=1`" class="edit-phone">修改</navigator>
				   </view>
				   <view class="ui-form">姓名<em>*</em></view>
				   <input type="text" v-model="name" maxlength="6">
				   <view class="ui-form">地区<em>*</em></view>
				   <view>请选择</view>
				   <view class="ui-form">地址</view>
				   <input type="text" v-model="address" maxlength="30">
				   <view class="ui-form">邮编</view>
				   <input type="number" v-model="postcode" maxlength="10">
				   <view class="ui-form">电话</view>
				   <input type="number" v-model="phoneNumber" maxlength="11">
				   <view class="ui-form">公司</view>
				   <input type="number" v-model="company" >
				   <view class="ui-form">部门</view>
				   <input type="number" v-model="department" >
				   <view class="ui-form">职位</view>
				   <input type="number" v-model="position" >
				   <view class="ui-form">QQ</view>
				   <input type="number" v-model="qq">
				   <view class="ui-form">微信</view>
				   <input type="number" v-model="weixin" >
				   <view class="ui-form">微信二维码</view>
				   <view class="upload-container" @tap="upload">
					   <image v-if="qrCode" :src="qrCode"></image>
				   </view>
				   <view class="ui-form">旺旺</view>
				   <input type="number" v-model="wangwang" >
			   </view>
		    </uni-collapse-item>
		    <uni-collapse-item title="密码管理">
		       <view class="password-container">
				   <view class="ui-form">新登录密码</view>
				   <input type="number" v-model="newPwd" >
				   <view class="ui-form">重复登录密码</view>
				   <input type="number" v-model="confirmPwd" >
				   <view class="ui-form">现有密码</view>
				   <input type="number" v-model="pwd" >
				   <view class="ui-form">新支付密码</view>
				   <input type="number" v-model="newpayPwd" >
				   <view class="ui-form">重复支付密码</view>
				   <input type="number" v-model="confirmpayPwd" >
				   <view class="ui-form">现有支付密码</view>
				   <input type="number" v-model="payPwd" >
				   <navigator hover-class="none" url="./findPwd" class="margin find-pwd">找回支付密码</navigator>
			   </view>
		    </uni-collapse-item>
		</uni-collapse>
		<view class="submit-btn">保存</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				name: '',
				address: '',
				postcode: '',
				phoneNumber: '',
				company: '',
				department: '',
				position: '',
				qq: '',
				weixin: '',
				qrCode: '',
				wangwang: '',
				newPwd: '',
				confirmPwd: '',
				pwd: '',
				newpayPwd: '',
				confirmpayPwd: '',
				payPwd: ''
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta:1
			})
		},
		methods: {
			upload() {
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album', 'camera'],
				    success:  (res) => {
				        this.qrCode = res.tempFilePaths[0]
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.edit-account{
		font-size: 30upx;
		.margin{
			margin: 32upx 0;
		}
		.detail-container, .password-container{
			background-color: #fff;
			padding: 0 32upx 40upx;
		}
		.phone{
			display: flex;
			align-items: center;
			height: 64upx;
			line-height: 64upx;
			.edit-phone{
				color: #f57c13;
				margin-left: 40upx;
			}
		}
		.ui-form{
			padding: 32upx 0;
			font-size: 32upx;
			em{
				padding-left: 12upx;
				font-size: 24upx;
				color: #FF0000;
			}
		}
		input{
			height: 64upx;
			line-height: 64upx;
			border: #B2B2B2 1px solid;
			padding: 0 12upx;
		}
		.upload-container{
			width: 180upx;
			height: 120upx;
			border: #EDEEF1 1px solid;
			background: url('/static/image/mine/upload-image.png') no-repeat center center;
			background-size: 40px 40px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.find-pwd{
			height: 64upx;
			line-height: 64upx;
			color: #f57c13;
		}
		.submit-btn{
			width: 686upx;
			background: #BB271D;
			height: 84upx;
			line-height: 84upx;
			border-radius: 6upx;
			color: #FFFFFF;
			font-size: 26upx;
			text-align: center;
			margin: 40upx auto;
		}
	}
</style>
