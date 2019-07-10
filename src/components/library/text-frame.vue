<template>
	<div class="dragtext" :style="psMsg.textStyle" :class="psMsg.animateStyle" @click="changeInner(psMsg)">
		<div class="zrcontent" contenteditable="true" @input="changeText" v-cloak v-text="psMsg.defaultVal"></div>
	</div>
</template>

<script>
	export default {
		props: ['psMsg','textIndex'],
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
				this.$emit('setText', event, 'textAttribute',_self.textIndex)
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
	.dragtext {
		position: absolute;
		top: 40%;
		left: calc(50% - 100px);
		border: 1px solid rgba(255, 255, 255, 0);
		height: auto;
		word-break: break-all;
		.zrcontent {
			height: 100%;
			border: 1px solid rgba(255, 255, 255, 0);
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.zrcontent:focus {
			outline: none;
			border: none;
		}
		.onafter {
			border: 1px solid rgba(0, 0, 0, 0.3) !important
		}
	}
</style>