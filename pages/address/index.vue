<template>
	<citySelect @back_city="back_city" ref="popupRef"></citySelect>
</template>

<script>
	import citySelect from '@/components/linzq-citySelect/linzq-citySelect';
	import city from '@/components/city.js'
	export default{
		components: {
			citySelect
		},
		data() {
			return {
				region: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			 back_city(e) { 
				 if (e !== 'no') { 
				   this.region = e.cityName 
				   // this.$refs.popupRef.close(); 
				   uni.navigateBack({
				   	
				   })
				 } 
				 else { 
				   // this.$refs.popupRef.close(); 
				   uni.navigateBack({
				   	
				   })
				 } 
			 }
		}
	}
</script>

<style>
</style>
