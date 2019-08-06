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
				observer: null
			}
		},
		methods: {
			changeInner(event) {
				var _self = this;
				this.$emit('setText', event, 'textAttribute', _self.textIndex)
			},
			//右键获取鼠标位置，显示删除按钮
			rightEvent($event){
				var _self = this;
				var left = $event.clientX - document.getElementById('editorPage').offsetLeft - document.getElementById('editorIndex').offsetLeft;
				var top = $event.clientY - document.getElementById('editorPage').offsetTop - document.getElementById('editorIndex').offsetTop;
				this.$emit('showRdrop',left+5,top+5,_self.textIndex,'textbox')
			},
			changeText($event) {
				var doc = document.getElementsByClassName('dragtext')[this.textIndex].innerHTML;
//				var newStr = doc.substring(1,doc.length-1);
				function convert(literal) {
				    var result = literal.substring(1, literal.length - 1);
				    result = result.replace(/'/g, '\'');
				    return "'" + result + "'";
				}
				this.psMsg.textVal = convert(doc);
//				this.psMsg.textVal = this.psMsg.textVal.substring(1,this.psMsg.textVal.length-1)
			}
		},
		mounted() {
			var _self = this;
			//使元素可拖拽拉伸
			$('.dragtext').l_zoom('free').l_drag(true);
			//元素拉伸边框初始化隐藏
			$(".border_all").hide();
			$(".zrcontent").removeClass('onafter')

			$(".zrcontent").mousedown(function() {
				$(".border_all").hide();
				$(this).siblings('.border_all').show()
				$(".zrcontent").removeClass('onafter')
				$(this).addClass('onafter')
			});
			//实时监听元素定位位置
			let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			let element = document.getElementsByClassName('dragtext')[_self.textIndex]
			this.observer = new MutationObserver((mutationList) => {
				for(let mutation of mutationList) {
//					console.log(mutation)
					_self.psMsg.textStyle.top = mutation.target.style.top;
					_self.psMsg.textStyle.left = mutation.target.style.left;
					_self.psMsg.textStyle.width = mutation.target.style.width;
					_self.psMsg.textStyle.transform = mutation.target.style.transform
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
			padding: 10px 0px;
			outline: 1px solid rgba(255, 255, 255, 0);
			overflow: hidden;
		}
		.zrcontent:focus {
			outline: none;
			border: none;
		}
		.onafter {
			outline: 1px dashed rgba(0, 0, 0, 0.3) !important;
		}
	}
</style>