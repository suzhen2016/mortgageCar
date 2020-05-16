<template>
	<citySelect @back_city="back_city" ref="popupRef"></citySelect>
</template>

<script>
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect';
	export default{
		components: {
			citySelect
		},
		data() {
			return {

			}
		},
		onLoad() {
			
		},
		methods: {
			 back_city(e) { 
				 if (e !== 'no') { 
				   uni.setStorageSync('city', e)
				   // this.$refs.popupRef.close(); 
				   uni.navigateBack({
						delta: 1
				   })
				 } 
				 else { 
				   // this.$refs.popupRef.close(); 
				   uni.setStorageSync('city', '')
				   uni.navigateBack({
						delta: 1
				   })
				 } 
			 }
		}
	}
</script>

<style>
</style>
