<template>
	<view class="avatar-container">
		<avatar selWidth="128px" selHeight="128px" @upload="myUpload" :avatarSrc="avatarUrl ? avatarUrl : '/static/image/mine/defaut.jpg'" 
		avatarStyle="width: 256upx; height: 256upx; border-radius: 100%;" class="select-avatar"></avatar>
		<!-- <div class="avatar"></div> -->
	</view>
</template>

<script>
	import avatar from "@/components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				avatarUrl: 'http://image.wufazhuce.com/Fsrmr-V7PTb6fBOlrJqxzWi7G5Uu'
			}
		},
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo')
			}
		},
		methods: {
			myUpload(rsp) {
				this.avatarUrl = rsp.path
				this.$api.updateUserAvatar({
					user_id: this.userInfo.id,
					user_pho: this.avatarUrl
				}).then(res => {
					uni.setStorageSync('userInfo', res.result)
				})
				return 
			    let avatar = rsp.path;
				uni.uploadFile({
				  url: config.uploadUrl,
				  name: 'file',
				  filePath: avatar,
				  header: {
					Authorization: uni.getStorageSync('token')
				  },
				  formData: {
				    
				  },
				  success: (res) =>{
				   let headImgUrl = JSON.parse(res.data).data.uploadResultUrl
				   let {nickname, sex} = this.userInfo
				   this.$api.updateUserInfo({
						nickname, 
						headImgUrl, 
						sex
				   }).then(res => {
						this.loadInfo()
					})
				  },
				  fail: function(res) {
				   console.log(res)
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
