<template>
	<div id="textSetPanel">
		<div class="ui secondary two item teal pointing menu" style="margin: 0;">
			<a class="item active" @click="togglePage('textSet')">文本</a>
			<a class="item" @click="togglePage('animateSet')">动画</a>
			<!--<a class="item" @click="togglePage('levelSet')">图层</a>-->
		</div>
		<div id="textSet" class="ui fluid accordion" v-show="setType == 'textSet'">
			<div class="title active"><i class="dropdown icon"></i>文本设置</div>
			<div class="content active">
				<div class="formSytle zrBox" id="alignBox">
					<div class="item">
						对齐
					</div>
					<div @click="setAlign(index)" v-for="(list,index) in align" class="item" :data-tooltip="list.tooltip" data-inverted="">
						<icon :name="list.name" :w="list.size" :h="list.size"></icon>
					</div>
				</div>
				<div class="formSytle zrBox" id="levelBox">
					<div class="item">
						图层
					</div>
					<div v-for="(list,index) in level" @click="setLevel(index)" class="item" :data-tooltip="list.tooltip" data-inverted="">
						<!--<icon :name="list.name" :w="list.size" :h="list.size"></icon>-->
						<img class="imgBox" :src="list.url"></img>
					</div>
				</div>
				<div class="formSytle" v-if="receivedData !== ''">
					<div class="item">
						样式
					</div>
					<div class="item" :class="{'itemActive':receivedData.textStyle['font-weight'] == 600}" @click="fontblod" data-tooltip="加粗" data-inverted="">
						<icon name="B-icon" :w="20" :h="20"></icon>
					</div>
					<div class="item" :class="{'itemActive':receivedData.textStyle['font-style'] == 'italic'}" @click="fontItalic" data-tooltip="倾斜" data-inverted="">
						<icon name="I-icon" :w="20" :h="20"></icon>
					</div>
					<div class="item" :class="{'itemActive':receivedData.textStyle['text-decoration'] == 'underline'}" @click="fontDecoration" data-tooltip="下划线" data-inverted="">
						<icon name="U-icon" :w="20" :h="20"></icon>
					</div>
					<div class="item" :class="{'itemActive':receivedData.textStyle['text-align'] == 'left'}" @click="textAlign('left')" data-tooltip="左对齐文本" data-inverted="">
						<icon name="text-left" :w="22" :h="22"></icon>
					</div>
					<div class="item" :class="{'itemActive':receivedData.textStyle['text-align'] == 'center'}" @click="textAlign('center')" data-tooltip="居中对齐文本" data-inverted="">
						<icon name="text-center" :w="22" :h="22"></icon>
					</div>
					<div class="item" :class="{'itemActive':receivedData.textStyle['text-align'] == 'right'}" @click="textAlign('right')" data-tooltip="右对齐文本" data-inverted="">
						<icon name="text-right" :w="22" :h="22"></icon>
					</div>
				</div>
				<div class="formSytle" style="border-bottom: none !important;">
					<div class="item">
						颜色
					</div>
					<div id="picker" @click="colorChange">
						<chrome-picker id="chromePicker" v-show='pickerShow' v-model="colors" @input="updateValue"></chrome-picker>
					</div>
				</div>
				<div class="fontSet">
					<div style="font-size: 12px;">
						大小
						<div class="ui selection dropdown" id="fontSizeDrop" style="min-width: 30px;width: 80px;margin-left: 14px;">
							<input type="hidden" name="gender">
							<i class="dropdown icon" style="line-height: 0.8;"></i>
							<div class="default text">大小</div>
							<div class="menu">
								<div class="item" :data-value="list" v-for="list in fontsizeList" v-text="list"></div>
							</div>
						</div>
						<div class="ui mini basic icon buttons">
							<button class="ui button" @click="addSize"><i class="plus icon"></i></button>
							<button class="ui button" @click="cutSize"><i class="minus icon"></i></button>
						</div>
					</div>
				</div>
				<div class="fontSet">
					<div style="font-size: 12px;">
						行距
						<div class="ui selection dropdown" id="lineHeightDrop" style="min-width: 30px;width: 80px;margin-left: 14px;">
							<input type="hidden" name="gender">
							<i class="dropdown icon" style="line-height: 0.8;"></i>
							<div class="default text">行距</div>
							<div class="menu">
								<div class="item" :data-value="list.val" v-for="list in lineHeightList" v-text="list.text"></div>
							</div>
						</div>
						<div class="ui mini basic icon buttons">
							<button class="ui button" @click="addLineHeight"><i class="plus icon"></i></button>
							<button class="ui button" @click="cutLineHeight"><i class="minus icon"></i></button>
						</div>
					</div>
				</div>
				<div class="fontSet" style="padding-bottom: 16px;">
					<span>旋转</span>
					<re-gan v-if="receivedData !== ''" :sliderVal='sliderVal' :max="'360'" :type="'transform'" @reganway='changeRange'></re-gan>
				</div>
			</div>
		</div>
		<div id="animateSet" class="ui fluid accordion" v-show="setType == 'animateSet'">
			<div class="title active"><i class="dropdown icon"></i>动画设置</div>
			<div class="content active">
				<div class="animatino-list">
					<div class="animation-item" v-for="item in animateList">
						<div class="animation-icon" :class="{'animation-icon-click':item.className == receivedData.animateStyle}" @click="setAnimate(item.className)" :style="item.bpStyle"></div>
						
						<div class="animation-name">{{item.text}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { Chrome } from 'vue-color'
	import Regan from '../common-item/regan'
	export default {
		props: [],
		data() {
			return {
				setType: 'textSet',
				receivedData: '',
				Tindex: '',
				sliderVal: '0',
				pickerShow: false,
				colors: '#000000',
				align: [{
					tooltip: "左对齐",
					name: "left",
					size: "22"
				}, {
					tooltip: "居中对齐",
					name: "center",
					size: "22"
				}, {
					tooltip: "右对齐",
					name: "right",
					size: "22"
				}, {
					tooltip: "顶部对齐",
					name: "top",
					size: "22"
				}, {
					tooltip: "水平居中对齐",
					name: "czjz",
					size: "22"
				}, {
					tooltip: "底部对齐",
					name: "bottom",
					size: "22"
				}],
				level: [{
					tooltip: "上一层",
					url: require('../../../static/backgroundImages/upLevel.png')
				}, {
					tooltip: "下一层",
					url: require('../../../static/backgroundImages/downLevel.png')
				}, {
					tooltip: "置顶",
					url: require('../../../static/backgroundImages/topLevel.png')
				}, {
					tooltip: "置底",
					url: require('../../../static/backgroundImages/bottomLevel.png')
				}],
				fontsizeList: ['12px', '13px', '14px', '16px', '18px', '20px', '22px', '26px', '28px', '32px', '36px', '48px'],
				lineHeightList: [{
					text: '0.5倍',
					val: '0.5'
				}, {
					text: '1倍',
					val: '1'
				}, {
					text: '1.2倍',
					val: '1.2'
				}, {
					text: '1.5倍',
					val: '1.5'
				}, {
					text: '1.8倍',
					val: '1.8'
				}, {
					text: '2倍',
					val: '2'
				}, {
					text: '2.5倍',
					val: '2.5'
				}, {
					text: '3倍',
					val: '3'
				}, {
					text: '3.5倍',
					val: '3.5'
				}, {
					text: '4倍',
					val: '4'
				}],
				animateList: [{
						text: '淡入',
						className: 'fadeIn animated',
						bpStyle: 'background-position: -60px 0px'
					}, {
						text: '从左滚入',
						className: 'rotateInDownLeft animated',
						bpStyle: 'background-position: -120px 0px'
					}, {
						text: '从右滚入',
						className: 'rotateInDownRight animated',
						bpStyle: 'background-position: -180px 0px'
					}, {
						text: '放大',
						className: 'zoomIn animated',
						bpStyle: 'background-position: 0px -60px'
					}, {
						text: '下落放大',
						className: 'zoomInDown animated',
						bpStyle: 'background-position: -60px -60px'
					}, {
						text: '弹性放大',
						className: 'bounceIn animated',
						bpStyle: 'background-position: -120px -60px'
					}, {
						text: '向右飞入',
						className: 'fadeInLeftBig animated',
						bpStyle: 'background-position: 0px -120px'
					}, {
						text: '向左飞入',
						className: 'fadeInRightBig animated',
						bpStyle: 'background-position: -60px -120px'
					}, {
						text: '向上飞入',
						className: 'fadeInUpBig animated',
						bpStyle: 'background-position: -120px -120px'
					}, {
						text: '向下飞入',
						className: 'fadeInDownBig animated',
						bpStyle: 'background-position: -180px -120px'
					}, {
						text: '旋转出现',
						className: 'rotateIn animated',
						bpStyle: 'background-position: 0px -180px'
					}, {
						text: '左右翻转',
						className: 'flipInY animated',
						bpStyle: 'background-position: -60px -180px'
					}, {
						text: '上下翻转',
						className: 'flipInX animated',
						bpStyle: 'background-position: -120px -180px'
					}, {
						text: '刹车',
						className: 'lightSpeedIn animated',
						bpStyle: 'background-position: -180px -180px'
					}, {
						text: '向右滑入',
						className: 'bounceInLeft animated',
						bpStyle: 'background-position: 0px -240px'
					}, {
						text: '向左滑入',
						className: 'bounceInRight animated',
						bpStyle: 'background-position: -60px -240px'
					}, {
						text: '向上滑入',
						className: 'bounceInUp animated',
						bpStyle: 'background-position: -120px -240px'
					}, {
						text: '向下滑入',
						className: 'bounceInDown animated',
						bpStyle: 'background-position: -180px -240px'
					}
					//				,{
					//					text: '向右展开',
					//					className: 'spread animated',
					//					bpStyle: 'background-position: 0px -300px'
					//				}, {
					//					text: '向左展开',
					//					className: 'flash animated',
					//					bpStyle: 'background-position: -60px -300px'
					//				}, {
					//					text: '向上展开',
					//					className: 'flash animated',
					//					bpStyle: 'background-position: -120px -300px'
					//				}, {
					//					text: '向下展开',
					//					className: 'flash animated',
					//					bpStyle: 'background-position: -180px -300px'
					//				}
				]
			}
		},

		methods: {
			//初始化进入操作页面
			editText(data, index) {
				var _self = this;
				this.receivedData = data;
				this.Tindex = index;
				this.colors = this.receivedData.textStyle.color;
				this.sliderVal = this.receivedData.textStyle.transform.replace(/[^0-9]/ig, "");
				$('#fontSizeDrop').dropdown("set text", _self.receivedData.textStyle['font-size'])
				$('#lineHeightDrop').dropdown("set text", _self.receivedData.textStyle['line-height'] + '倍')
				$('#picker').css('background', _self.receivedData.textStyle.color)
			},
			togglePage(type) {
				this.setType = type
			},
			//文本对齐
			setAlign(inx) {
				var _self = this;
				var index = _self.Tindex;
				var height = document.getElementsByClassName('dragtext')[index].offsetHeight;
				var width = document.getElementsByClassName('dragtext')[index].offsetWidth;
				if(inx == 0) {
					this.receivedData.textStyle.left = '0px'
				} else if(inx == 1) {
					this.receivedData.textStyle.left = 'calc(50% - ' + width / 2 + 'px)';
				} else if(inx == 2) {
					this.receivedData.textStyle.left = 'calc(100% - ' + width + 'px)';
				} else if(inx == 3) {
					this.receivedData.textStyle.top = '0px'
				} else if(inx == 4) {
					this.receivedData.textStyle.top = 'calc(50% - ' + height / 2 + 'px)';
					this.receivedData.textStyle.left = 'calc(50% - ' + width / 2 + 'px)';
				} else if(inx == 5) {
					this.receivedData.textStyle.top = 'calc(100% - ' + height + 'px)';
				}
				document.getElementsByClassName('dragtext')[index].style.top = this.receivedData.textStyle.top;
				document.getElementsByClassName('dragtext')[index].style.left = this.receivedData.textStyle.left
			},
			//加粗
			fontblod() {
				var index = this.Tindex;
				if(this.receivedData.textStyle['font-weight'] == 600) {
					this.receivedData.textStyle['font-weight'] = 500;
				} else {
					this.receivedData.textStyle['font-weight'] = 600;
				}
				document.getElementsByClassName('dragtext')[index].style['font-weight'] = this.receivedData.textStyle['font-weight']

			},
			//斜体
			fontItalic() {
				var index = this.Tindex;
				if(this.receivedData.textStyle['font-style'] == 'italic') {
					this.receivedData.textStyle['font-style'] = 'normal';
				} else {
					this.receivedData.textStyle['font-style'] = 'italic';
				}
				document.getElementsByClassName('dragtext')[index].style['font-style'] = this.receivedData.textStyle['font-style']
			},
			//下划线
			fontDecoration() {
				var index = this.Tindex;
				console.log(this.receivedData.textStyle['text-decoration'])
				if(this.receivedData.textStyle['text-decoration'] == 'underline') {
					this.receivedData.textStyle['text-decoration'] = 'none';
				} else {
					this.receivedData.textStyle['text-decoration'] = 'underline';
				}
				document.getElementsByClassName('dragtext')[index].style['text-decoration'] = this.receivedData.textStyle['text-decoration']
			},
			textAlign(type) {
				var index = this.Tindex;
				this.receivedData.textStyle['text-align'] = type;
				document.getElementsByClassName('dragtext')[index].style['text-align'] = this.receivedData.textStyle['text-align']
			},
			//改变颜色
			updateValue() {
				var _self = this;
				_self.receivedData.textStyle.color = _self.colors.hex8;
				$('#picker').css('background', _self.receivedData.textStyle.color)
			},
			colorChange() {
				this.pickerShow = true
			},
			//增加字体大小
			addSize() {
				var _self = this;
				var num = this.receivedData.textStyle['font-size'].substring(0, this.receivedData.textStyle['font-size'].length - 2);
				num++;
				this.receivedData.textStyle['font-size'] = num + 'px';
				$('#fontSizeDrop').dropdown("set text", _self.receivedData.textStyle['font-size'])
			},
			//减小字体大小
			cutSize() {
				var _self = this;
				var num = this.receivedData.textStyle['font-size'].substring(0, this.receivedData.textStyle['font-size'].length - 2);
				if(num > 12) {
					num--;
					this.receivedData.textStyle['font-size'] = num + 'px';
					$('#fontSizeDrop').dropdown("set text", _self.receivedData.textStyle['font-size']);
				};
			},
			//增加行距
			addLineHeight() {
				var _self = this;
				var num = this.receivedData.textStyle['line-height'];
				var newNum = Number(num) + 0.1;
				this.receivedData.textStyle['line-height'] = newNum.toFixed(1);
				$('#lineHeightDrop').dropdown("set text", _self.receivedData.textStyle['line-height'] + '倍');

			},
			changeRange(data){
				var _self = this;
				_self.sliderVal = data;
				_self.receivedData.textStyle['transform'] = 'rotate(' + data + 'deg)';
				document.getElementsByClassName('dragtext')[_self.Tindex].style.transform = 'rotate(' + data + 'deg)'
			},
			cutLineHeight() {
				var _self = this;
				var newNum;
				var num = this.receivedData.textStyle['line-height'];
				if(num > 0.5) {
					var s = Number(num) - 0.1;
					newNum = s.toFixed(1)
					this.receivedData.textStyle['line-height'] = newNum;
					$('#lineHeightDrop').dropdown("set text", _self.receivedData.textStyle['line-height'] + '倍');
				};
			},
			//设置动画
			setAnimate(data) {
				var index = this.Tindex;
				this.receivedData.animateStyle = data;
				$('.dragtext').eq(index).addClass(data)
				setTimeout(function() {
					//					document.getElementsByClassName('dragtext')[index].removeClass(data);
					$('.dragtext').eq(index).removeClass(data)
				}, 1000);
			},
			setLevel(inx) {
				var _self = this;
				var newIndex = _self.receivedData.textStyle['z-index'];
				var total = $('.dragtext').length + $('.dragpicture').length;
				console.log(newIndex, total)
				if(inx == 0 && newIndex < total) {
					for(var i = 0; i < _self.$store.state.allData.imgbox.length; i++) {
						if(newIndex + 1 == _self.$store.state.allData.imgbox[i].imgStyle['z-index']) {
							_self.$store.state.allData.imgbox[i].imgStyle['z-index'] = newIndex
						}
					}
					for(var i = 0; i < _self.$store.state.allData.textbox.length; i++) {
						if(newIndex + 1 == _self.$store.state.allData.textbox[i].textStyle['z-index']) {
							_self.$store.state.allData.textbox[i].textStyle['z-index'] = newIndex
						}
					}
					_self.receivedData.textStyle['z-index'] = newIndex + 1
				} else if(inx == 1 && newIndex > 1) {
					for(var i = 0; i < _self.$store.state.allData.imgbox.length; i++) {
						if(newIndex - 1 == _self.$store.state.allData.imgbox[i].imgStyle['z-index']) {
							_self.$store.state.allData.imgbox[i].imgStyle['z-index'] = newIndex
						}
					}
					for(var i = 0; i < _self.$store.state.allData.textbox.length; i++) {
						if(newIndex - 1 == _self.$store.state.allData.textbox[i].textStyle['z-index']) {
							_self.$store.state.allData.textbox[i].textStyle['z-index'] = newIndex
						}
					}
					_self.receivedData.textStyle['z-index'] = newIndex - 1
				} else if(inx == 2) {
					for(var i = 0; i < _self.$store.state.allData.imgbox.length; i++) {
						if(newIndex < _self.$store.state.allData.imgbox[i].imgStyle['z-index']) {
							_self.$store.state.allData.imgbox[i].imgStyle['z-index'] = _self.$store.state.allData.imgbox[i].imgStyle['z-index'] - 1
						}
					}
					for(var i = 0; i < _self.$store.state.allData.textbox.length; i++) {
						if(newIndex < _self.$store.state.allData.textbox[i].textStyle['z-index']) {
							_self.$store.state.allData.textbox[i].textStyle['z-index'] = _self.$store.state.allData.textbox[i].textStyle['z-index'] - 1
						}
					}
					_self.receivedData.textStyle['z-index'] = total
				} else if(inx == 3) {
					for(var i = 0; i < _self.$store.state.allData.imgbox.length; i++) {
						if(newIndex > _self.$store.state.allData.imgbox[i].imgStyle['z-index']) {
							_self.$store.state.allData.imgbox[i].imgStyle['z-index'] = _self.$store.state.allData.imgbox[i].imgStyle['z-index'] + 1
						}
					}
					for(var i = 0; i < _self.$store.state.allData.textbox.length; i++) {
						if(newIndex > _self.$store.state.allData.textbox[i].textStyle['z-index']) {
							_self.$store.state.allData.textbox[i].textStyle['z-index'] = _self.$store.state.allData.textbox[i].textStyle['z-index'] + 1
						}
					}
					_self.receivedData.textStyle['z-index'] = 1
				}
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.ui.menu .item').click(function() {
				$(this).siblings('.item').removeClass('active')
				$(this).addClass('active')
			});
			$('.ui.accordion').accordion();
			$('.zrBox .item').not(":first").mousedown(function() {
				$(this).addClass('itemActive')
				$(this).mouseup(function() {
					$(this).removeClass('itemActive')
				})
			});
			//semantic-ui下拉框回调函数
			$('#fontSizeDrop').dropdown({
				onChange: function(value, text, $selectedItem) {
					_self.receivedData.textStyle['font-size'] = value
				}
			});
			$('#lineHeightDrop').dropdown({
				onChange: function(value, text, $selectedItem) {
					_self.receivedData.textStyle['line-height'] = value
				}
			});
			//点击颜色选择器以外关闭
			$(document).click(function(event) {
				var target = $(event.target);
				if(target.closest("#chromePicker").length !== 0 || target.closest("#picker").length !== 0) return;
				_self.pickerShow = false
			});
//			$('.animation-icon').css('background-image', 'url(' + require("../../../static/backgroundImages/animBackground.png") + ')');
//			var slider = document.getElementById('slider');
//			slider.addEventListener('input', function(e) {
//				_self.sliderVal = e.target.value
//				var x = e.target.value - 30
//				$('#sliderDiv').css('width', x / 2 + 'px')
//				_self.receivedData.textStyle['transform'] = 'rotate(' + e.target.value + 'deg)'
//				//		        console.log(_self.receivedData.textStyle)
//				document.getElementsByClassName('dragtext')[_self.Tindex].style.transform = 'rotate(' + e.target.value + 'deg)'
//			});
		},
		components: {
			'chrome-picker': Chrome,
			're-gan':Regan
		}

	}
</script>

<style scoped lang="scss">
	#textSetPanel {
		#textSet {
			.title {
				background-color: rgb(252, 252, 252);
				border-top: 1px solid #e1e1e1;
			}
			.content {
				border-top: 1px solid #e1e1e1;
				padding: 0px 5px;
				.formSytle {
					padding: 0 8px;
					border-bottom: 1px solid #e1e1e1 !important;
					user-select: none;
					.item {
						width: 30px;
						height: 32px;
						display: inline-block;
						vertical-align: middle;
						line-height: 2;
						text-align: center;
					}
					.item:not(:first-child) {
						color: #7d8893;
					}
					.item:nth-of-type(1) {
						width: auto;
						font-size: 12px;
						margin-right: 10px;
						line-height: 32px;
					}
					.item:hover:not(:first-child) {
						background-color: rgb(236, 236, 236);
					}
					.itemActive {
						background: #00c4cd !important;
						color: rgb(255, 255, 255) !important
					}
					#picker {
						position: relative;
						width: 30px;
						height: 30px;
						background-color: #000000;
						#chromePicker {
							position: absolute;
							top: 35px;
							z-index: 888;
						}
					}
					#picker:hover {
						cursor: pointer;
						box-shadow: #fff 0px 0px 1px 1px inset;
					}
				}
				.formSytle:last-child {
					border-bottom: none;
				}
				.fontSet {
					padding: 8px;
					border-bottom: 1px solid #e1e1e1 !important;
					user-select: none;
					span{
						font-size: 12px;
					}
				}
			}
			#levelBox {
				.imgBox {
					height: 32px;
					width: 30px;
					padding: 7px;
				}
			}
			#colorChange {
				width: 23px;
				margin-left: 3px;
				margin-top: 4px;
			}
		}
		#animateSet {
			.title {
				background-color: rgb(252, 252, 252);
				border-top: 1px solid #e1e1e1;
			}
			.animatino-list {
				width: 100%;
				.animation-item {
					display: inline-block;
					width: 24%;
					height: 68px;
					text-align: center;
					margin-bottom: 5px;
				}
				.animation-icon {
					width: 48px;
					height: 48px;
					cursor: pointer;
					margin: 0 auto;
					background-size: 228px 348px;
					background-image: url(../../assets/animBackground.png);
					
				}
				.animation-icon-click {
					background-image: url(../../../static/backgroundImages/maka_anim_enter_seleted.png) !important;
				}
				.animation-icon:hover {
					background-image: url(../../../static/backgroundImages/maka_anim_enter_seleted.png) !important;
				}
				.animation-name {
					font-size: 12px;
				}
			}
		}
	}
</style>