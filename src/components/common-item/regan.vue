<template>
	<div class="zr_regan">
		<div id="sliderDiv"></div>
		<input id='slider' type='range' @input="listener($event)" min='0' :max='max' step='0' :value='sliderVal' />
		<input v-if="type == 'transform'" id="numSelect" :value="sliderVal" @input="numRange($event)" min="0" type="number" />
	</div>
</template>

<script>
	export default {
		props: ['max', 'sliderVal','type'],
		data() {
			return {
				
			}
		},
		methods: {
			listener(e){
				var _self = this;
//				var x = e.target.value - 30;
//				$('#sliderDiv').css('width', x / 2 + 'px');
				this.$emit('reganway', e.target.value)
			},
			numRange(e) {
				var _self = this;
				if(Number(e.target.value) <= _self.max){
//					var x = e.target.value - 30;
//					$('#sliderDiv').css('width', x / 2 + 'px');
					this.$emit('reganway', e.target.value)
				}else{
					e.target.value = _self.max
				}
			}
		},
		mounted() {
//			var x = this.sliderVal - 30;
//			$('#sliderDiv').css('width', x / 2 + 'px');
		}
	}
</script>

<style scoped lang="scss">
	.zr_regan {
		margin-top: 10px;
		position: relative;
		#sliderDiv {
			position: absolute;
			top: 12px;
			height: 2px;
			z-index: 2;
			width: 0px;
			background: #ffad70;
		}
		input[type=range] {
			-webkit-appearance: none;
			width: 180px;
		}
		input[type=range]::-webkit-slider-thumb {
			-webkit-appearance: none;
		}
		/*设置滑动条的样式*/
		input[type=range]::-webkit-slider-runnable-track {
			height: 2px;
			background: #cacaca;
		}
		input[type=range]::-moz-range-track {
			height: 2px;
			background: #cacaca;
		}
		/*去除获取焦点时的边框*/
		input[type=range]:focus {
			outline: none;
		}
		/*设置滑块样式*/
		input[type=range]::-webkit-slider-thumb {
			-webkit-appearance: none;
			height: 15px;
			width: 15px;
			background: #fff;
			margin-top: -7px;
			border: 1px solid #465455;
			border-radius: 50%;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .5);
			cursor: pointer;
		}
		input[type=range]::-moz-range-thumb {
			-webkit-appearance: none;
			height: 15px;
			width: 15px;
			background: #fff;
			margin-top: -7px;
			border: 1px solid #465455;
			border-radius: 50%;
			box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .5);
			cursor: pointer;
			z-index: 666;
		}
		/*IE下*/
		input[type=range] {
			-webkit-appearance: none;
			width: 180px;
			background: #509EFE;
		}
		/*设置IE下滑动条的样式*/
		input[type=range]::-ms-track {
			height: 8px;
			border-color: transparent;
			/*去除原有边框*/
			color: transparent;
			/*去除轨道内的竖线*/
			background: #E6EFFB;
		}
		/*设置IE下滑块样式*/
		input[type=range]::-ms-thumb {
			height: 8px;
			width: 35px;
			background: #61A5FF;
		}
		input[type=range]:focus::-ms-fill-lower {
			background: #E6EFFB;
			border: none;
		}
		input[type=range]:focus::-ms-fill-upper {
			background: #E6EFFB;
			border: none;
		}
		#numSelect {
			float: right;
			width: 60px;
			height: 26px;
			border: 1px solid #e1e1e1;
			border-radius: 3px;
			text-align: center;
		}
	}
</style>