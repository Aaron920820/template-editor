<template>
	<div id="textSetPanel">
		<div class="ui secondary three item teal pointing menu">
			<a class="item active">Home </a>
			<a class="item">Messages </a>
			<a class="item">好友 </a>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				text: ''
			}
		},
		methods: {
			editText(data) {
				this.text = data.textVal
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