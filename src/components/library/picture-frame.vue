<template>
	<div class="dragpicture" :Id='imgMsg.imgId' :class="imgMsg.animateStyle" :style="imgMsg.imgStyle" @click="setImg(imgMsg)" @click.right="rightEvent($event)">
		<div class="zrcontent"></div>
	</div>
</template>

<script>
	export default {
		props:['imgMsg','PictureIndex'],
		data() {
			return {
				currentView: 'textBox',
				observer:null
			}
		},
		methods: {
			setImg(data) {
				var _self = this;
				this.$emit('setPicture',data,'pictureAttribute',_self.PictureIndex)
			},
			rightEvent($event){
				var _self = this;
				var left = $event.clientX - document.getElementById('editorPage').offsetLeft - document.getElementById('editorIndex').offsetLeft;
				var top = $event.clientY - document.getElementById('editorPage').offsetTop - document.getElementById('editorIndex').offsetTop;
				this.$emit('showRdrop',left+5,top+5,_self.PictureIndex,'imgbox')
			},
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.dragpicture').l_zoom('free').l_drag(true);
			$(".border_all").hide();
			$(".zrcontent").removeClass('onafter')
			$(".zrcontent").mousedown(function() {
				$(".border_all").hide();
				$(this).siblings('.border_all').show()
				$(".zrcontent").removeClass('onafter')
				$(this).addClass('onafter')
			});
			let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			let element = document.getElementsByClassName('dragpicture')[_self.PictureIndex]
			this.observer = new MutationObserver((mutationList) => {
				for(let mutation of mutationList) {
//					console.log(mutation)
					_self.imgMsg.imgStyle.top = mutation.target.style.top;
					_self.imgMsg.imgStyle.left = mutation.target.style.left;
					_self.imgMsg.imgStyle.width = mutation.target.style.width;
					_self.imgMsg.imgStyle.height = mutation.target.style.height;
					_self.imgMsg.imgStyle.transform = mutation.target.style.transform
				}
			});
			this.observer.observe(element, {
				attributes: true,
				attributeFilter: ['style'],
				attributeOldValue: true
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
		.zrcontent {
			width: 100%;
			height: 100%;
			outline: 1px solid rgba(255,255,255,0);
			overflow:hidden;
		}
		.zrcontent:focus{
			/*outline: none;
			border: none;*/
		}
		.onafter{
			outline:1px dashed rgba(0,0,0,0.3) !important
		}
	}
</style>