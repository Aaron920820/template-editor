<template>
	<div id="textSetPanel">
		<div class="ui secondary two item teal pointing menu" style="margin: 0;">
			<a class="item active" @click="togglePage('textSet')">图片</a>
			<a class="item" @click="togglePage('animateSet')">动画</a>
			<!--<a class="item" @click="togglePage('levelSet')">图层</a>-->
		</div>
		<div id="textSet" class="ui fluid accordion" v-show="setType == 'textSet'">
			<div class="title active"><i class="dropdown icon"></i>图片设置</div>
			<div class="content active">
				<div class="formSytle zrBox" id="alignBox">
					<div class="item itemTitle">
						对齐
					</div>
					<div @click="setAlign(index)" v-for="(list,index) in align" class="item" :data-tooltip="list.tooltip" data-inverted="">
						<icon :name="list.name" :w="list.size" :h="list.size"></icon>
					</div>
				</div>
				<div class="formSytle zrBox" id="levelBox">
					<div class="item itemTitle">
						图层
					</div>
					<div v-for="(list,index) in level" @click="setLevel(index)" class="item" :data-tooltip="list.tooltip" data-inverted="">
						<!--<icon :name="list.name" :w="list.size" :h="list.size"></icon>-->
						<img class="imgBox" draggable="false" :src="list.url"></img>
					</div>
				</div>
				<div class="fontSet" style="padding-bottom: 16px;">
					<div class="item">
						<span>透明</span>
						<re-gan v-if="receivedData !== ''" :sliderVal='parseInt(100-this.receivedData.imgStyle.opacity*100)' :max="'100'" :unit="'%'" @reganway='changeOP'></re-gan>
					</div>
					<div class="item">
						<span>圆角</span>
						<re-gan v-if="receivedData !== ''" :sliderVal='receivedData.imgStyle["border-radius"].replace(/%/, "")' :max="'50'" :unit="'%'" @reganway='changeRadius'></re-gan>
					</div>
					<div class="item">
						<span>旋转</span>
						<re-gan v-if="receivedData !== ''" :sliderVal='receivedData.imgStyle.transform.replace(/[^0-9]/ig, "")' :max="'360'" :unit="'°'" @reganway='changeRange'></re-gan>
					</div>
					<div class="item">
						<span>阴影</span>
						<re-gan v-if="receivedData !== ''" :sliderVal='parseInt(receivedData.imgStyle["box-shadow"].replace(/black 0px 0px /,""))' :max="'50'" :unit="'px'" @reganway='changeShadow'></re-gan>
					</div>
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
	import Regan from '../common-item/regan';
	export default {
		props: ['boxShow'],
		data() {
			return {
				setType: 'textSet',
				receivedData: '',
				Tindex: '',
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
				},  {
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
				}]
			}
		},
		methods: {
			editPicture(data, index) {
				var _self = this;
				this.receivedData = data;
				this.Tindex = index
			},
			togglePage(type) {
				this.setType = type
			},
			setAlign(inx) {
				var _self = this;
				var index = _self.Tindex;
				var height = document.getElementsByClassName('dragpicture')[index].offsetHeight;
				var width = document.getElementsByClassName('dragpicture')[index].offsetWidth;
				if(inx == 0) {
					this.receivedData.imgStyle.left = '0px'
				} else if(inx == 1) {
					this.receivedData.imgStyle.left = 'calc(50% - ' + width / 2 + 'px)';
				} else if(inx == 2) {
					this.receivedData.imgStyle.left = 'calc(100% - ' + width + 'px)';
				} else if(inx == 3) {
					this.receivedData.imgStyle.top = '0px'
				}else if(inx == 4){
					this.receivedData.imgStyle.top = 'calc(50% - ' + height / 2 + 'px)';
					this.receivedData.imgStyle.left = 'calc(50% - ' + width/2 + 'px)';
				}else if(inx == 5){
					this.receivedData.imgStyle.top = 'calc(100% - ' + height + 'px)';
				}
				document.getElementsByClassName('dragpicture')[index].style.top = this.receivedData.imgStyle.top;
				document.getElementsByClassName('dragpicture')[index].style.left = this.receivedData.imgStyle.left
			},
			changeOP(data){
				var _self = this;
				var index = _self.Tindex;
				var y = data/100;
				this.receivedData.imgStyle.opacity = (1-data/100).toFixed(2)
				document.getElementsByClassName('dragpicture')[index].style.opacity = 1-data/100
			},
			changeRadius(data){
				var _self = this;
				var index = _self.Tindex;
				this.receivedData.imgStyle['border-radius'] = data+'%';
				document.getElementsByClassName('dragpicture')[index].style['border-radius'] = data+'%';
			},
			changeRange(data){
				var _self = this;
				var index = _self.Tindex;
				_self.receivedData.imgStyle['transform'] = 'rotate(' + data + 'deg)';
				document.getElementsByClassName('dragpicture')[index].style.transform = 'rotate(' + data + 'deg)'
			},
			changeShadow(data){
				var _self = this;
				var index = _self.Tindex;
				this.receivedData.imgStyle['box-shadow'] = 'black 0px 0px '+data+'px';
				document.getElementsByClassName('dragpicture')[index].style['box-shadow'] = 'black 0px 0px '+data+'px';
			},
			setLevel(inx) {
				var _self = this;
				var newIndex = _self.receivedData.imgStyle['z-index'];
				var total = $('.dragtext').length+$('.dragpicture').length;
				console.log(newIndex,total)
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
					_self.receivedData.imgStyle['z-index'] = newIndex + 1
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
					_self.receivedData.imgStyle['z-index'] = newIndex - 1
				} else if(inx == 2) {
					for(var i = 0; i < _self.$store.state.allData.imgbox.length; i++) {
						if(newIndex < _self.$store.state.allData.imgbox[i].imgStyle['z-index']) {
							_self.$store.state.allData.imgbox[i].imgStyle['z-index'] = _self.$store.state.allData.imgbox[i].imgStyle['z-index']-1
						}
					}
					for(var i = 0; i < _self.$store.state.allData.textbox.length; i++) {
						if(newIndex < _self.$store.state.allData.textbox[i].textStyle['z-index']) {
							_self.$store.state.allData.textbox[i].textStyle['z-index'] = _self.$store.state.allData.textbox[i].textStyle['z-index']-1
						}
					}
					_self.receivedData.imgStyle['z-index'] = total
				} else if(inx == 3) {
					for(var i = 0; i < _self.$store.state.allData.imgbox.length; i++) {
						if(newIndex > _self.$store.state.allData.imgbox[i].imgStyle['z-index']) {
							_self.$store.state.allData.imgbox[i].imgStyle['z-index'] = _self.$store.state.allData.imgbox[i].imgStyle['z-index']+1
						}
					}
					for(var i = 0; i < _self.$store.state.allData.textbox.length; i++) {
						if(newIndex > _self.$store.state.allData.textbox[i].textStyle['z-index']) {
							_self.$store.state.allData.textbox[i].textStyle['z-index'] = _self.$store.state.allData.textbox[i].textStyle['z-index']+1
						}
					}
					_self.receivedData.imgStyle['z-index'] = 1
				}
			},
			setAnimate(data) {
				var index = this.Tindex;
				this.receivedData.animateStyle = data;
				$('.dragpicture').eq(index).addClass(data)
				setTimeout(function() {
//					document.getElementsByClassName('dragpicture')[index].removeClass(data);
					$('.dragpicture').eq(index).removeClass(data)
				}, 1000);
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			$('.ui.menu .item').click(function() {
				$(this).siblings('.item').removeClass('active')
				$(this).addClass('active')
			})
			$('.ui.accordion').accordion();
			$('.zrBox .item').not(".itemTitle").mousedown(function() {
				$(this).addClass('itemActive')
			})
			$(document).mouseup(function() {
				$('.zrBox .item').not(".itemTitle").removeClass('itemActive')
			})
			$('.animation-icon').css('background-image', 'url('+require("../../../static/backgroundImages/animBackground.png")+')')

		},
		components: {
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
						cursor: pointer
					}
					.itemActive {
						background: #ffad70 !important;
						color: rgb(255, 255, 255) !important
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
					.item{
						margin-top: 10px;
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
					/*background-image: url(../../../static/backgroundImages/animBackground.png);*/
					background-size: 228px 348px;
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