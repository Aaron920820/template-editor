<template>
	<div>图片操作</div>
</template>

<script>
	export default {
		data() {
			return {
				litext: ['大标题', '标题', '副标题', '小标题', '正文内容']
			}
		},
		methods: {
			editText(data){
				console.log(data)
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