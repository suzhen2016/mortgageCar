<template>
	<view class="avatar-container">
		<avatar selWidth="128px" selHeight="128px" @upload="myUpload" :avatarSrc="avatarUrl ? avatarUrl : '/static/image/mine/defaut.jpg'" 
		avatarStyle="width: 256upx; height: 256upx; border-radius: 100%;" class="select-avatar"></avatar>
		<!-- <div class="avatar"></div> -->
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	import config from '@/config'
	export default {
		components: {
			avatar
		},
		data() {
			return {
				avatarUrl: ''
			}
		},
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo')
			}
		},
		onLoad() {
			this.avatarUrl = this.userInfo.user_pho && this.userInfo.user_pho != 'None'
			|| 'http://image.wufazhuce.com/Fsrmr-V7PTb6fBOlrJqxzWi7G5Uu'
		},
		methods: {
			myUpload(rsp) {
				this.avatarUrl = rsp.path
				let token = '39cynet-76358255-2095-4dd9-932c-274702f99435';
				uni.uploadFile({
					url: config.uploadUrl, 
					filePath: rsp.path,
					name: 'upload_img',
					header: {
						"Api-Token": token,
						'Auth-Token': uni.getStorageSync("token")
					},
					success: (uploadFileRes) => {
						let img_id = JSON.parse(uploadFileRes.data).result.id
						this.$api.updateUserAvatar({
							user_id: this.userInfo.id,
							img_id: img_id
						}).then(res => {
							uni.setStorageSync('userInfo', res.result)
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.avatar-container{
		padding: 128upx 0;
		background: #eee;
		.avatar{
			background-image: url('https://www.jjtdyc.com/api/avatar/default.jpg');
			background-size: 256upx 256upx;
			background-position: center center;
			background-repeat: no-repeat;
			width: 256upx;
			height: 256upx;
			border-radius: 50%;
			margin: 0 auto;
		}
		.select-avatar{
			margin: 0 auto;
			text-align: center;
		}
	}
</style>
