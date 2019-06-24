<template>
	<div>{{text}}</div>
	
</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		methods: {
			editText(data){
//				console.log(data)
				this.text = data.textVal
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
		},
		components: {

		}

	}
</script>

<style scoped lang="scss">
</style>