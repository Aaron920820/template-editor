<template>
	<div class="dragtext" :style="psMsg.textStyle" :class="psMsg.Class" @click="changeInner(psMsg)">
		<div class="content" contenteditable="true" @input="changeText" v-cloak v-text="psMsg.defaultVal"></div>
	</div>
</template>

<script>
	export default {
		props: ['psMsg'],
		data() {
			return {
				currentView: 'textBox'
			}
		},
		methods: {
			init() {

			},
			changeInner(event) {
				var _self = this;
				_self.psMsg.active = true;
				this.$emit('setText', event, 'textAttribute')
			},
			changeText($event) {
				this.psMsg['textVal'] = $event.target.innerText
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.dragtext').l_zoom('free').l_drag();
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
		border: 1px solid rgba(255, 255, 255, 0);
		height: auto;
		word-break: break-all;
		.content {
			height: 100%;
			border: 1px solid rgba(255, 255, 255, 0);
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.content:focus {
			outline: none;
			border: none;
		}
		.onafter {
			border: 1px solid rgba(0, 0, 0, 0.3) !important
		}
	}
</style>