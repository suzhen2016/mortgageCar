<template>
	<view class="favorite-container">
		<div class="input-container">
			<input type="text" v-model="keyWord" placeholder="输入关键词索"/>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord: ''
			}
		}
	}
</script>

<style lang="scss">
	.favorite-container{
		.input-container{
			padding: 32upx;
			input{
				background: #f0f0f0 url(../../static/image/mine/ico-search.png) no-repeat 12upx center;
				background-size: 32upx 32upx;
				padding: 0 56upx;
				border: none;
				height: 64upx;
				line-height: 64upx;
			}
		}
	}
</style>
