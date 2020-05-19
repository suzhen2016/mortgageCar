<template>
	<view class="buying-publish">
		<view class="ui-form">期望品牌<em>*</em></view>
		<view class="first-menu">
			<picker mode="multiSelector" :range="brandRange" :value="brand" @change="handleBrandChange" @columnchange="brandColumnchange" @cancel="brandCancel">
				<view>{{brandDes ? brandDes : '选择品牌'}}</view>
			</picker>
			<text class="iconfont triangle"></text>
		</view>
		<view class="ui-form">求购标题<em>*</em></view>
		<view>
			<input type="text" v-model="title"  maxlength="30"/>
		</view>
		<view class="ui-form">所在地区<em>*</em></view>
		<view class="first-menu">
			<picker mode="multiSelector" :range="addressRange" :value="city" @change="handleAddressChange" @columnchange="addresColumnchange" @cancel="addressCancel">
				<view>{{address ? address : '请选择'}}</view>
			</picker>
			<text class="iconfont triangle"></text>
		</view>
		<view class="ui-form">级别</view>
		<view class="first-menu">
			<picker :range="levelRange" :value="level" @change="handleLevelChange">
				<view>{{levelName}}</view>
			</picker>
			<text class="iconfont triangle"></text>
		</view>
		<view class="ui-form">价格<em>*</em></view>
		<view>
			<input type="number" v-model="price" class="price"/>万元
		</view>
		<view class="ui-form">行驶里程</view>
		<view>
			<input type="number" v-model="kilometre" class="price"/>公里
		</view>
		<view class="ui-form">车龄</view>
		<view class="first-menu" @tap="selectCarage">
			<view>{{carAgeName}}</view>
			<text class="iconfont triangle"></text>
		</view>
		<view class="ui-form">其他要求</view>
	    <textarea v-model="note"/>
		<view class="ui-form">姓名<em>*</em></view>
		<view>
			<input type="text" v-model="name" maxlength="10"/>
		</view>
		<view class="ui-form">手机<em>*</em></view>
		<view>
			<input type="number" v-model="phone" maxlength="11"/>
		</view>
		<view class="publish-btn" @tap="handlePublish">发布</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				brand_id: '',
				address_id: '',
				level_id: '',
				car_age: '',
				carAgeName: '====',
				title: '',
				price: '',
				kilometre: '',
				note: '',
				name: '',
				phone: '',
				levelList: [],
				addressRange: [[], []],
				city: [],
				originProvinces: [],
				originCitys: [],
				address: '',
				brandRange: [[], []],
				originBrandOne: [],
				originBrandTwo: [],
				brand: [],
				brandDes: '',
				levelRange: [],
				level: [],
				levelName: '===='
			}
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			})
		},
		onLoad() {
			this.brandInit()
			this.addressInit()
			this.loadLevelData()
		},
		methods:{
			handleLevelChange(e) {
				this.level_id = e.detail.value == 0 ? '' : this.levelList[e.detail.value - 1].id
				this.levelName = e.detail.value == 0 ? '====' : this.levelList[e.detail.value - 1].name
			},
			loadLevelData() {
				this.$api.getCarLevelList().then(res => {
					this.levelList = res.result
					let levelRange = this.levelList.map(item => {
						return item.name
					})
					this.levelRange = ['===='].concat(levelRange)
				})
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
			selectCarage() {
				let carAgeList = [
					{
						name: '====',
						value: ''
					},
					{
						name: '1年以内',
						value: 'LessOne'
					},
					{
						name: '1到3年',
						value: 'OneThree'
					},
					{
						name: '3到5年',
						value: 'ThreeFive'
					},
					{
						name: '5年以上',
						value: 'FiveMore'
					}
				]
				uni.showActionSheet({
				    itemList: ['====', '1年以内', '1到3年', '3到5年', '5年以上'],
				    success:  (res) => {
						this.carAgeName = carAgeList[res.tapIndex].name
				        this.car_age = carAgeList[res.tapIndex].value
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			},
			handlePublish() {
				if(!this.brand_id) {
					return this.$alert('请选择期望品牌')
				}
				if(!this.title) {
					return this.$alert('请输入求购标题')
				}
				if(!this.address_id) {
					return this.$alert('请选择所在地区')
				}
				// if(!this.level_id) {
				// 	return this.$alert('请选择级别')
				// }
				if(!this.price) {
					return this.$alert('请输入价格')
				}
				// if(!this.kilometre) {
				// 	return this.$alert('请输入行驶里程')
				// }
				// if(!this.car_age) {
				// 	return this.$alert('请选择车龄')
				// }
				if(!this.name) {
					return this.$alert('请输入姓名')
				}
				if(!this.phone) {
					return this.$alert('请输入手机')
				}
				this.$api.createRequestBuy({
					title: this.title,
					brand_id: this.brand_id,
					address_id: this.address_id,
					level_id: this.level_id,
					price: this.price,
					kilometre: this.kilometre,
					car_age: this.car_age,
					user_id: uni.getStorageSync('userInfo').id,
					note: this.note,
					name: this.name,
					phone: this.phone
				}).then(res => {
					uni.redirectTo({
						url: '/pages/buyingManage/index'
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	/* 字体图标 */
	@font-face {
		font-family: "HM-FD-font";
		src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALAAAsAAAAABpQAAAJzAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgp4gQIBNgIkAwwLCAAEIAWEbQc5G8sFERWMIbIfCbbzqA4hp7InSBibVsYGb4J42o82b3e/nJlHMw/NHbGOlwKJRCRpwzPtpAECCOZubdqxjYpQLMlVg+70/08edrgQOtx2ukpVyApZn+dyehPoQObHo3O85rYx9vOjXoBxQIHugW2yIkqIW2QXcScu4jwE8CSWbKSmrqUHFwOaJoCsLM5P4haSGIxRcRHshrUGucLCVcfqI3AZfV/+USguKCwNmtsxVztDxU/n55C+3W0Z4QQpEOTNFqCBbMCAjDUWB9CIwWk87aa70cYgqLkyd3dEmm+18R8eKATEBrV7A5CulBT8dKiWOYZk412XNcDdKSEKSGODnyKIDl+dmVt9/Dx4pu/xyeutkMlHISGPTsPCnoTNP9nOT6wTtDdlO6dPr47efvj942lkYuQzrhMKEjq9N6y98P3340gmlJ/RStUD6F31CAEEPtUW94/7rf+7XgaAz57X0ZHXAGsFFwVgw38yALuMb0IBbVyNamFYEw4oKMDTj3AHRQP5Pt4dci9VwSVkRNQh5r7CLskZadhsWHhRDBsXczk8ZYk3ewnCxmQeQKa3BOHvA8XXO2j+vqRhf7CE+sPmn4anvoL29JLa4qqaUQkmoK+QG2osCckq7txi2leK86aIPyJ3eQZ8xytXYmyQ51jQndJAxIJlqiGSLsOqImiZCjTiZCJt6Lq26U2OoXqwUo0hRaAE0K5AziANy/uLVeXzWyjVqyjcoeupjxDr5MMDn8MDkLG9Aenu5ZrOSSoghAUsRmogkkahSoWAtnlUARnCkY3It0Iu7mWhdmd9Z/19BwBP6GidEi0G56opckXTGZVSPxgAAAA=');
	}
	.iconfont {
		font-family: "HM-FD-font" !important;
		font-size: 13px;
		font-style: normal;
		color: #757575;
		&.triangle {
			&:before {
				content: "\e65a";
			}
		}
		&.selected {
			&:before {
				content: "\e607";
			}
		}
	}
	page{
		background-color: #fff;
		font-size: 24upx;
		color: #666;
	}
	.buying-publish{
		padding: 0 32upx;
		.ui-form{
			padding: 32upx 0;
			font-size: 32upx;
			font-weight: bold;
			em{
				padding-left: 12upx;
				font-size: 24upx;
				color: #FF0000;
			}
		}
		input{
			height: 64upx;
			line-height: 88upx;
			border: #B2B2B2 1px solid;
			padding: 0 12upx;
			border-radius: 0;
			font-size: 28upx;
		}
		textarea{
			width: 100%;
			height: 144upx;
			line-height: 48upx;
			border: #B2B2B2 1px solid;
			padding: 0 12upx;
			border-radius: 0;
			font-size: 28upx;
		}
		.first-menu {
			width: 20%;
			height: 64upx;
			border: #B2B2B2 1px solid;
			font-size: 13px;
			color: #757575;
			display: flex;
			flex-wrap: nowrap;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			transition: color .2s linear;
					
			&.on {
				color: #ec652b;
					
				.iconfont {
					color: #ec652b;
				}
			}
			.name {
				height: 20px;
				text-align: center;
				text-overflow: clip;
				overflow: hidden;
			}
			.iconfont {
				width: 13px;
				height: 13px;
				align-items: center;
				justify-content: center;
				transition: transform .2s linear, color .2s linear;
			}
		}
		.publish-btn{
			width: 560upx;
			height: 84upx;
			line-height: 84upx;
			text-align: center;
			background: #BB271D;
			color: #fff;
			margin: 40upx auto;
		}
	}
</style>
