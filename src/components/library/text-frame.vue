<template>
	<div class="dragtext">
		<div @focusin="changeInner($event)" @blur="onBlur($event)" ref="abc" class="content" contenteditable="true">2222</div>
		<div class="zoom_right"></div>
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

			},
			changeInner(event){
				var _self = this;
			},
			onBlur(event){
				
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.dragtext').l_zoom('free').l_drag();
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
	.dragtext {
		position: absolute;
		top: 40%;
		left: calc(50% - 100px);
		width: 200px;
		height: auto;
		
		.content {
			height: 100%;
			text-align: center;
			overflow:hidden;
		    text-overflow:ellipsis;
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