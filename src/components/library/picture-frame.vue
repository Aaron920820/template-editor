<template>
	<div class="dragpicture" :Id='imgMsg.imgId' :class="imgMsg.animateStyle" :style="imgMsg.imgStyle" @click="setImg()">
		<div class="content"></div>
	</div>
</template>

<script>
	export default {
		props:['imgMsg'],
		data() {
			return {
				currentView: 'textBox'
			}
		},
		methods: {
			setImg(data) {
				this.$emit('setPicture',data,'pictureAttribute')
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.dragpicture').l_zoom('free').l_drag();
			$(".border_all").hide();
			$(".content").removeClass('onafter')
			
			$(".content").mousedown(function() {
				$(".border_all").hide();
				$(this).siblings('.border_all').show()
				$(".content").removeClass('onafter')
				$(this).addClass('onafter')
			});
			$('#editorPage').click(function(e){
				var target = $(e.target);
				if(target.closest(".content").length != 0) return;
				$(".border_all").hide();
				$(".content").removeClass('onafter');
			})
//			$('.dragpicture').css('background-image','url('+_self.imgMsg.imgsrc+')')
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