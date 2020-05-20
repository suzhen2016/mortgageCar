<template>
	<view class="sale-container">
		<view class="form-item flex">
			<view class="form-label">标题</view>
			<view class="form-content">
				<input type="text" v-model="title" style="width: 300upx">
			</view>
		</view>
		<view class="form-item">
			<view class="form-label">汽车图片</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<!-- <image-drag-sort @upload="upload" :list="imageList"></image-drag-sort> -->
						<view class="uni-uploader-head">
							<view class="uni-uploader-title"></view>
							<view class="uni-uploader-info">{{imageList.length}}/9</view>
						</view>
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image" @tap="previewImage"></image>
										<view class="close-view" @tap.stop="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 9">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="form-item flex">
			<view class="form-label">车型</view>
			<picker mode="multiSelector" style="color: #666;font-size: 28upx" :range="brandRange" :value="brand" @change="handleBrandChange" @columnchange="brandColumnchange" @cancel="brandCancel">
				<view>{{brandDes ? brandDes : '选择车型'}}</view>
			</picker>
		</view>
		<view class="form-item flex">
			<view class="form-label">上牌日期</view>
			<picker mode = "date" @change="dateChange" style="color: #666;font-size: 28upx">{{list_date ? list_date : '选择日期'}}</picker>
		</view>
		<view class="form-item flex">
			<view class="form-label">所在地区</view>
			<picker style="color: #666;font-size: 28upx" mode="multiSelector" :range="addressRange" :value="city" @change="handleAddressChange" @columnchange="addresColumnchange" @cancel="addressCancel">
				<view>{{address ? address : '请选择'}}</view>
			</picker>
		</view>
		<view class="form-item flex">
			<view class="form-label">行驶里程</view>
			<view class="form-content">
				<input type="number" v-model="kilometre"><text>万公里</text>
			</view>
		</view>
		<view class="form-item flex">
			<view class="form-label">排量</view>
			<view class="form-content">
				<input type="number" v-model="displacement">
			</view>
		</view>
		<view class="form-item flex">
			<view class="form-label">售价</view>
			<view class="form-content">
				<input type="number" v-model="price"><text>万</text>
			</view>
		</view>
		<view class="form-item flex">
			<view class="form-label">底价</view>
			<view class="form-content">
				<input type="number" v-model="low_price"><text>万</text>
			</view>
		</view>
		<view class="form-item">
			<view class="label">详细内容<text>（*不能低于10个字，不出现联系方式）</text></view>
			<view class="form-content">
				<uEditor class="ql-container" @change="getContent"></uEditor>
			</view>
		</view>
		<view class="submit-btn" @tap="handlePublish">发布</view>
	</view>
</template>

<script>
	import imageDragSort from "@/components/image-drag-sort/index.vue"
	import editor from "@/components/editor/editor"
	import image from '@/utils/image.js';
	import config from '@/config'
	const device = uni.getSystemInfoSync();
	export default {
		components: {
			imageDragSort,
			uEditor: editor
		},
		data() {
			return {
				editorCtx: null,  //编辑器
				title: '',
				imageList: [],
				maxImgCount: 9,
				img_ids: '',
				detail: '',
				addressRange: [[], []],
				city: [],
				originProvinces: [],
				originCitys: [],
				address: '',
				address_id: '',
				brandRange: [[], []],
				originBrandOne: [],
				originBrandTwo: [],
				brand: [],
				brand_id: '',
				brandDes: '',
				list_date: '',
				displacement: '',
				price: '',
				low_price: '',
				kilometre: ''
			}
		},
		onLoad(){
			this.addressInit()
			this.brandInit()
		},
		methods: {
			getContent(e, editorCtx) {
				this.detail = e
				this.editorCtx = editorCtx
			},
			upload(e) {
				this.imageList = e
			},
			close(e){
				this.imageList.splice(e,1);
			},
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log("是否继续?", isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['original'],
					count: this.maxImgCount - this.imageList.length,
					success: async (res) => {
						// #ifdef APP-PLUS
						const tempFilePaths = res.tempFilePaths;
						let tempPathList = [];
						for (let i = 0; i < tempFilePaths.length; i++) {
							const path = tempFilePaths[i];
							const src = await this.compressImageHandler(path)
							tempPathList.push(src);
						}
						this.imageList = this.imageList.concat(tempPathList);
						// #endif
						
						// #ifndef APP-PLUS
						this.imageList = this.imageList.concat(res.tempFilePaths)//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// #endif
						
					}
				})
			},
			async compressImageHandler(src){
				const tempPath = await image.compressImage(src,device.platform);
				return tempPath
			},
			isFullImg: function() {
				return new Promise((res) => {
					uni.showModal({
						content: "已经有9张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false)
							}
						},
						fail: () => {
							res(false)
						}
					})
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			dateChange(e) {
				this.list_date = e.detail.value
			},
			addressInit() {
				this.$api.getAddressList({
					address_level: 1
				}).then(res => {
					let result = res.result
					this.originProvinces = result	
					this.city[0] = 0
					result = result.map(item => {
						return item.name
					})
					this.addressRange[0] = result
					this.$api.getAddressList({
						address_pid: this.originProvinces[0].id,
						address_level: 2
					}).then(res => {
						let result = res.result
						this.originCitys = result
						this.city[1] = 0
						result = result.map(item => {
							return item.name
						})
						this.addressRange.splice(1, 1 ,result)
					})
				})
			},
			handleAddressChange() {
				this.address_id = this.originCitys[this.city[1]].id
				this.address = this.originCitys[this.city[1]].name
			},
			addresColumnchange(e) {
				let detail = e.detail
				if(e.detail.column == 0) {
					let address_pid = this.originProvinces[e.detail.value].id
					this.city[0] = e.detail.value
					this.$api.getAddressList({
						address_pid: address_pid,
						address_level: 2
					}).then(res => {
						let result = res.result
						this.city[1] = 0
						this.originCitys = result
						result = result.map(item => {
							return item.name
						})
						this.addressRange.splice(1, 1 ,result)
					})
				}else if(e.detail.column == 1) {
					this.city[1] = e.detail.value
				}
			},
			addressCancel() {
				this.city = [0,0]
				this.addressRange = [[],[]]
				this.addressInit()
			},
			brandInit() {
				this.$api.getBrandList({
					brand_level: '1',
				}).then(res => {
					let result = res.result
					this.originBrandOne = result	
					this.brand[0] = 0
					result = result.map(item => {
						return `${item.letter.name}-${item.name}`
					})
					this.brandRange[0] = result
					this.$api.getBrandList({
						brand_pid: this.originBrandOne[0].id,
						brand_level: '2'
					}).then(res => {
						let result = res.result
						this.originBrandTwo = result
						this.brand[1] = 0
						result = result && result.map(item => {
							return `${item.letter.name}-${item.name}`
						}) || []
						this.brandRange.splice(1, 1 ,result)
					})
				})
			},
			handleBrandChange() {
				this.brand_id = this.originBrandTwo[this.brand[1]].id
				this.brandDes = this.originBrandTwo[this.brand[1]].name
			},
			brandColumnchange(e) {
				let detail = e.detail
				if(e.detail.column == 0) {
					let brandId = this.originBrandOne[e.detail.value].id
					this.brand[0] = e.detail.value
					this.$api.getBrandList({
						brand_pid: brandId,
						brand_level: '2'
					}).then(res => {
						let result = res.result
						this.brand[1] = 0
						this.originBrandTwo = result
						result = result && result.map(item => {
							return `${item.letter.name}-${item.name}`
						}) || []
						this.brandRange.splice(1, 1 ,result)
					})
				}else if(e.detail.column == 1) {
					this.brand[1] = e.detail.value
				}
			},
			brandCancel() {
				this.brand = [0,0]
				this.brandRange = [[],[]]
				this.brandInit()
			},
			handlePublish() {
				if(!this.title) {
					return this.$alert('请输入标题')
				}
				if(!this.imageList) {
					return this.$alert('请上传汽车图片')
				}
				if(!this.brand_id) {
					return this.$alert('请选择车型')
				}
				if(!this.list_date) {
					return this.$alert('请选择上牌日期')
				}
				if(!this.address_id) {
					return this.$alert('请选择所在地区')
				}
				if(!this.kilometre) {
					return this.$alert('请输入行驶里程')
				}
				if(!this.displacement) {
					return this.$alert('请输入排量')
				}
				if(!this.price) {
					return this.$alert('请输入售价')
				}
				if(!this.low_price) {
					return this.$alert('请输入底价')
				}
				if(!this.detail) {
					return this.$alert('请输入详细内容')
				}
				let token = '39cynet-76358255-2095-4dd9-932c-274702f99435';
				let files = this.imageList.map(item => {
					return {
						name: 'batch_img',
						file: item,
						uri: item
					}
				})
				uni.uploadFile({
					url: config.multipleUploadUrl, 
					files: files,
					header: {
						"Api-Token": token,
						'Auth-Token': uni.getStorageSync("token")
					},
					formData: {
						
					},
					success: (uploadFileRes) => {
						this.img_ids = JSON.parse(uploadFileRes.data).result.map(item => {
							return item.id
						})
						this.img_ids = this.img_ids.join(',')
						this.$api.createCar({
							side: 'SELL',
							user_id: uni.getStorageSync('userInfo').id,
							title: this.title,
							img_ids: this.img_ids,
							brand_id: this.brand_id,
							list_date: this.list_date,
							address_id: this.address_id,
							kilometre: this.kilometre,
							displacement:  this.displacement,
							price: this.price,
							low_price: this.low_price,
							detail: this.detail
						}).then(res => {
							// uni.navigateTo({
							// 	url: '/pages/carSource/index'
							// })
							this.imageList = []
							this.title = ''
							this.brand_id = ''
							this.brandDes = ''
							this.list_date = ''
							this.address_id = ''
							this.address = ''
							this.kilometre = ''
							this.displacement = ''
							this.price = ''
							this.low_price = ''
							this.detail = ''
							this.editorCtx.setContents({
								html: ''
							})
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.sale-container{
		padding: 30upx;
		.form-item{
			padding: 12upx 0;
			&.flex{
				display: flex;
				height: 90upx;
			}
			.form-label{
				display: inline-block;
				width: 24%;
				text-align-last: justify;
				font-size: 28upx;
				margin-right: 40upx;
				padding-right: 24upx;
				position: relative;
				&:after{
					content: '*';
					position: absolute;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					font-size: 24upx;
					color: #FF0000;
				}
			}
			.label{
				font-size: 28upx;
				text{
					color: red;
				}
			}
			.form-content{
				display: flex;
				align-items: center;
				color: #666;
				font-size: 28upx;
				input{
					border: #B2B2B2 1px solid;
					width: 160upx;
					height: 64upx;
					margin: 0 12upx;
					text-indent: 10upx;
				}
				.ql-container{
					border: 1px solid rgb(178,178,178);
					padding: 0 20upx;
				}
			}
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
		.uni-list::before {
			height: 0;
		}
		.uni-list:after {
			height: 0;
		}
		.list-pd {
			margin-top: 0;
		}
		.close-view{
			text-align: center;
			line-height:30upx;
			height: 35upx;
			width: 35upx;
			background: #ef5350;
			color: #FFFFFF;
			position: absolute;
			top: 1upx;
			right: 1upx;
			font-size: 35upx;
			border-radius: 8upx;
		}
		/* textarea */
		.uni-textarea{
			width:100%;
			background:#FFF;
		}
		.uni-textarea textarea{
			width:96%;
			padding:18upx 2%;
			line-height:1.4;
			font-size:34upx;
			height:250upx;
			box-sizing: border-box;
		}
		.uni-uploader{
			position: relative;
			padding-bottom: 35upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 1upx;
				background: #DADADA;
				transform: scaleY(0.5);
			}
		}
		/* 上传 */
		.uni-uploader {
			flex: 1;
			flex-direction: column;
		}
		.uni-uploader-head {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}
		.uni-uploader-info {
			color: #B2B2B2;
		}
		.uni-uploader-body {
			margin-top: 16upx;
		}
		.uni-uploader__files {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}
		.uni-uploader__file {
			margin: 10upx;
			width: 210upx;
			height: 210upx;
		}
		.uni-uploader__img {
			display: block;
			width: 210upx;
			height: 210upx;
		}
		.uni-uploader__input-box {
			position: relative;
			margin:10upx;
			width: 208upx;
			height: 208upx;
			border: 2upx solid #D9D9D9;
		}
		.uni-uploader__input-box:before,
		.uni-uploader__input-box:after {
			content: " ";
			position: absolute;
			top: 50%;
			left: 50%;
			-webkit-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
			background-color: #D9D9D9;
		}
		.uni-uploader__input-box:before {
			width: 4upx;
			height: 79upx;
		}
		.uni-uploader__input-box:after {
			width: 79upx;
			height: 4upx;
		}
		.uni-uploader__input-box:active {
			border-color: #999999;
		}
		.uni-uploader__input-box:active:before,
		.uni-uploader__input-box:active:after {
			background-color: #999999;
		}
		.uni-uploader__input {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
</style>
