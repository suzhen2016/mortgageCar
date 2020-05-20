<template>
	<view class="evaluate-container">
		<view class="pinggu_logo">
			<image src="/static/image/mine/cjpg2.png" mode="aspectFit"></image>
			<view>实时精准评估抵押车</view>
		</view>
		<view class="filter-form">
			<view class="filter-list">
				<view class="filter-item">
					<view class="title">品牌名称</view>
					<view class="picker">
						<picker mode="selector" :value="brand_id" :range="brandOneList" @change="brandOneChange">
							<view>{{brand_name}}</view>
						</picker>
					</view>
				</view>
				<view class="filter-item">
					<view class="title">车系名称</view>
					<view class="picker">
						<picker :disabled="!brand_id" mode="selector" :value="car_id" :range="brandTwoList" @change="brandTwoChange">
							<view>{{cars_name}}</view>
						</picker>
					</view>
				</view>
				<view class="filter-item">
					<view class="title">车型名称</view>
					<view class="picker">
						<picker :disabled="!car_id" mode="selector" :value="model_id" :range="brandThreeList" @change="brandThreeChange">
							<view>{{model_name}}</view>
						</picker>
					</view>
				</view>
				<view class="filter-item">
					<view class="title">首次上牌时间</view>
					<view class="picker">
						<picker mode="date" :value="list_date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{list_date}}</view>
						</picker>
					</view>
				</view>
				<view class="filter-item">
					<view class="title">表显里程</view>
					<view class="diatance">
						<input type="digit" v-model="mileage" /><text>万公里</text>
					</view>
				</view>
				<view class="filter-item">
					<view class="title">姓名</view>
					<view class="diatance">
						<input type="text" v-model="name" />
					</view>
				</view>
				<view class="filter-item">
					<view class="title">手机号</view>
					<view class="diatance">
						<input type="number" v-model="phone" maxlength="11" style="width:300upx"/>
					</view>
				</view>
				<view class="filter-item multiple">
					<view class="title">汽车图片(请上传4张图片)</view>
					<view class="uni-list list-pd">
						<view class="uni-list-cell cell-pd">
							<view class="uni-uploader">
								<!-- <image-drag-sort @upload="upload" :list="imageList"></image-drag-sort> -->
								<view class="uni-uploader-head">
									<view class="uni-uploader-title"></view>
									<view class="uni-uploader-info">{{imageList.length}}/4</view>
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
			</view>
		</view>
		<view class="submit-btn" @tap="handleSubmit">估价</view>
	</view>
</template>

<script>
	function getDate(type) {
		const date = new Date();
	
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let day = date.getDate();
	
		if (type === 'start') {
			year = year - 60;
		} else if (type === 'end') {
			year = year + 2;
		}
		month = month > 9 ? month : '0' + month;;
		day = day > 9 ? day : '0' + day;
	
		return `${year}-${month}-${day}`;
	}
	import image from '@/utils/image.js';
	import config from '@/config'
	const device = uni.getSystemInfoSync();
	export default {
		data() {
			return {
				list_date: getDate({
					format: true
				}),
				startDate:getDate('start'),
				endDate:getDate('end'),
				imageList: [],
				maxImgCount: 4,
				phone: '',
				name: '',
				mileage: '',
				brand_name: '请选择品牌', //品牌
				brand_id: '',
				cars_name: '请选择车系', //车系
				car_id: '',
				model_name: '请选择车型', //车型
				model_id: '',
				originOneList: [],
				brandOneList: [],
				originTwoList: [],
				brandTwoList: [],
				originThreeList: [],
				brandThreeList: []
			}
		},
		onLoad() {
			this.getBrandOne()
		},
		methods: {
			getBrandOne() {
				this.$api.getBrandList({
					brand_level: '1',
				}).then(res => {
					this.originOneList = res.result
					let result = res.result.map(item => {
						return `${item.letter.name} ${item.name}`
					})
					this.brandOneList = ['请选择品牌'].concat(result)
				})
			},
			brandOneChange(e) {
				let index = e.detail.value
				let tmpId = this.brand_id
				this.brand_name = this.brandOneList[index]
				this.brand_id = index == 0 ? '' : this.originOneList[index - 1].id
				if(index == 0) {
					this.car_id = ''
					this.cars_name = '请选择车系'
					this.model_id = ''
					this.model_name = '请选择车型'
				}else{
					if(tmpId != this.brand_id) {
						this.car_id = ''
						this.cars_name = '请选择车系'
						this.model_id = ''
						this.model_name = '请选择车型'
					}
					this.getBrandTwo()
				}
			},
			getBrandTwo() {
				this.$api.getBrandList({
					brand_pid: this.brand_id,
					brand_level: '2',
				}).then(res => {
					this.originTwoList = res.result
					let result = res.result.map(item => {
						return `${item.letter.name} ${item.name}`
					})
					this.brandTwoList = ['请选择车系'].concat(result)
				})
			},
			brandTwoChange(e) {
				let index = e.detail.value
				let tmpId = this.car_id
				this.cars_name = this.brandTwoList[index]
				this.car_id = index == 0 ? '' : this.originTwoList[index - 1].id
				if(index == 0) {
					this.model_id = ''
					this.model_name = '请选择车型'
				}else{
					if(tmpId != this.car_id) {
						this.model_id = ''
						this.model_name = '请选择车型'
					}
					this.getBrandThree()
				}
			},
			getBrandThree() {
				this.$api.getBrandList({
					brand_pid: this.car_id,
					brand_level: '3',
				}).then(res => {
					this.originThreeList = res.result
					let result = res.result.map(item => {
						return `${item.letter.name} ${item.name}`
					})
					this.brandThreeList = ['请选择车型'].concat(result)
				})
			},
			brandThreeChange(e) {
				let index = e.detail.value
				this.model_name = this.brandThreeList[index]
				this.model_id = index == 0 ? '' : this.originThreeList[index - 1].id
			},
			bindDateChange(e) {
				this.list_date = e.detail.value
			},
			close(e){
				this.imageList.splice(e,1);
			},
			chooseImage: async function() {
				if (this.imageList.length === this.maxImgCount) {
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
						content: "已经有4张图片了,是否清空现有图片？",
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
			handleSubmit() {
				if(!this.brand_id) {
					return this.$alert('请选择品牌')
				}
				if(!this.car_id) {
					return this.$alert('请选择车系')
				}
				if(!this.model_id) {
					return this.$alert('请选择车型')
				}
				if(!this.list_date) {
					return this.$alert('请选择上牌日期')
				}
				if(!this.mileage) {
					return this.$alert('请输入表显里程')
				}
				if(!this.name) {
					return this.$alert('请输入姓名')
				}
				if(!this.phone) {
					return this.$alert('请输入电话')
				}
				if(!this.imageList) {
					return this.$alert('请上传汽车图片')
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
						let img_ids = JSON.parse(uploadFileRes.data).result.map(item => {
							return item.id
						})
						img_ids = img_ids.join(',')
						this.$api.createValuation({
							user_id: uni.getStorageSync('userInfo').id,
							img_ids: img_ids,
							mileage: this.mileage,
							brand_name: this.brand_name,
							cars_name: this.cars_name,
							model_name: this.model_name,
							list_date: this.list_date,
							phone: this.phone,
							name: this.name
						}).then(res => {
							this.$alert('提交评估信息成功，等待估价')
							this.imageList = []
							this.mileage= ''
							this.brand_name = '请选择品牌'
							this.brand_id = ''
							this.cars_name = '请选择车系'
							this.car_id = ''
							this.model_name = '请选择车型'
							this.model_id = ''
							this.phone = ''
							this.name = ''
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.evaluate-container{
		.pinggu_logo{
			text-align: center;
			padding: 20upx 0;
			font-size: 32upx;
			line-height: 52upx;
			image{
				width: 228upx;
				height: 88upx;
			}
		}
		.filter-form{
			box-shadow: 0px 4upx 20upx #e0e0e0;
			width: 94%;
			margin: 0 auto;
			.filter-list{
				margin: 0 14upx;
				.filter-item{
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 110upx;
					padding-right: 20upx;
					&.multiple{
						display: block;
						height: auto;
					}
					.title{
						color: #2f3540;
						font-size: 28upx;
					}
					.picker, .diatance{
						font-size: 26upx;
						height: 60upx;
						line-height: 60upx;
					}
					.diatance{
						display: flex;
						align-items: center;
						input{
							border:1px solid #eee;
							margin-right: 20upx;
							width: 200upx;
							text-indent: 10upx;
						}
					}
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
</style>
