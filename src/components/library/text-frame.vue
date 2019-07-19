<template>
	<div class="dragtext" :style="psMsg.textStyle" :class="psMsg.animateStyle" @click="changeInner(psMsg)" @click.right="rightEvent($event)">
		<div class="zrcontent" contenteditable="true" @input="changeText" v-cloak v-text="psMsg.defaultVal"></div>
	</div>
</template>

<script>
	export default {
		props: ['psMsg', 'textIndex'],
		data() {
			return {
				currentView: 'textBox',
				observer: null,
				recordOldValue: { // 记录下旧的宽高数据，避免重复触发回调函数
					width: '0',
					height: '0'
				}
			}
		},
		methods: {
			changeInner(event) {
				var _self = this;
				this.$emit('setText', event, 'textAttribute', _self.textIndex)
			},
			rightEvent($event){
				var _self = this;
				var left = $event.clientX - document.getElementById('editorPage').offsetLeft - document.getElementById('editorIndex').offsetLeft;
				var top = $event.clientY - document.getElementById('editorPage').offsetTop - document.getElementById('editorIndex').offsetTop;
				this.$emit('showRdrop',left+5,top+5,_self.textIndex,'text')
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
			let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			let element = document.getElementsByClassName('dragtext')[_self.textIndex]
			this.observer = new MutationObserver((mutationList) => {
				for(let mutation of mutationList) {
//					console.log(mutation)
					_self.psMsg.textStyle.top = mutation.target.style.top;
					_self.psMsg.textStyle.left = mutation.target.style.left
				}
			});
			this.observer.observe(element, {
				attributes: true,
				attributeFilter: ['style'],
				attributeOldValue: true
			})
		},
		components: {

		},
		beforeDestroyed() {
			if(this.observer) {
				this.observer.disconnect()
				this.observer.takeRecords()
				this.observer = null
			}
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
			border: 1px dashed rgba(0, 0, 0, 0.3) !important;
		}
	}
</style>