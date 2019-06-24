<template>
	<div class="dragtext">
		<div class="image content"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentView: 'textBox'
			}
		},
		methods: {
			init() {

			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.dragtext').l_zoom('free').l_drag();
			$(".content").click(function(){
			  $(this).siblings('.border_all').show()
//			  $(this).addClass('onafter')
			});
		},
		components: {

		}

	}
</script>

<style scoped="" lang="scss">
	.dragtext {
		position: absolute;
		top: 40%;
		left: calc(50% - 100px);
		width: 200px;
		height: 50px;
		.image {
			width: 100%;
			background-image: url(../../../dist/static/backgroundImages/img.jpg);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			height: 100%;
			
		}
	}
</style>