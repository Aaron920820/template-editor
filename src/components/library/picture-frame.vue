<template>
	<div class="dragpicture" :Id='imgMsg.imgId' :class="imgMsg.animateStyle" :style="imgMsg.imgStyle" @click="setImg(imgMsg)">
		<div class="zrcontent"></div>
	</div>
</template>

<script>
	export default {
		props:['imgMsg','PictureIndex'],
		data() {
			return {
				currentView: 'textBox'
			}
		},
		methods: {
			setImg(data) {
				var _self = this;
				this.$emit('setPicture',data,'pictureAttribute',_self.PictureIndex)
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.dragpicture').l_zoom('free').l_drag();
			$(".border_all").hide();
			$(".zrcontent").removeClass('onafter')
			$(".zrcontent").mousedown(function() {
				$(".border_all").hide();
				$(this).siblings('.border_all').show()
				$(".zrcontent").removeClass('onafter')
				$(this).addClass('onafter')
			});
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
		.zrcontent {
			width: 100%;
			height: 100%;
			border: 1px solid rgba(255,255,255,0);
			overflow:hidden;
		}
		.zrcontent:focus{
			outline: none;
			border: none;
		}
		.onafter{
			border:1px solid rgba(0,0,0,0.3) !important
		}
	}
</style>