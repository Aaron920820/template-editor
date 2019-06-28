<template>
	<div>
		<div class="ui secondary three item teal pointing menu" style="margin: 0;">
			<a class="item active">图片</a>
			<a class="item">动画</a>
			<a class="item">层级</a>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				litext: []
			}
		},
		methods: {
			editPicture(){
				var _self = this;
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.ui.menu .item').click(function(){
				$(this).siblings().removeClass('active')
				$(this).addClass('active')
			})
		},
		components: {

		}

	}
</script>

<style scoped lang="scss">
</style>