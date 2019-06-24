<template>
	<div class="dragpicture">
		<div class="content"></div>
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
			$('.dragpicture').l_zoom('free').l_drag();
			$(".content").click(function(){
			  $(this).siblings('.border_all').show()
			  $(this).addClass('onafter')
			});
			$(document).click(function(e){
			    var target = $(e.target);
			    if(target.closest(".content").length != 0) return;
			    $(".border_all").hide();
			    $('.content').removeClass('onafter')
			})
		},
		components: {

		}

	}
</script>

<style scoped="" lang="scss">
	.dragpicture {
		position: absolute;
		top: 40%;
		left: calc(50% - 100px);
		width: 200px;
		height: 100px;
		background-image: url(../../../static/backgroundImages/img.jpg);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		.content {
			width: 100%;
			height: 100%;
			border: 1px solid rgba(255,255,255,0);
			overflow:hidden;
		}
		.content:focus{
			outline: none;
			border: none;
		}
		.onafter{
			border:1px solid rgba(0,0,0,0.3) !important
		}
	}
</style>