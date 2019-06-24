<template>
	<div class="dragpicture" :style="psMsg.textStyle" @click="changeInner(psMsg)">
		<div @blur="onBlur($event)" class="content" contenteditable="true" @input="changeText" v-cloak v-text="psMsg.defaultVal"></div>
	</div>
</template>

<script>
	export default {
		props:['psMsg'],
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
				this.$emit('setText',event,'textAttribute')
			},
			onBlur(event){
				
			},
			changeText($event){
				this.psMsg['textVal'] = $event.target.innerText
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
		border: 1px solid rgba(255,255,255,0);
		height: auto;
		word-break:break-all;
		.content {
			height: 100%;
			border: 1px solid rgba(255,255,255,0);
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