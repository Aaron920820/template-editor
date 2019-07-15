<template>
	<div id="textSetPanel">
		<div class="ui secondary three item teal pointing menu" style="margin: 0;">
			<a class="item active" @click="togglePage('textSet')">文本</a>
			<a class="item" @click="togglePage('animateSet')">动画</a>
			<a class="item" @click="togglePage('levelSet')">图层</a>
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
					<div v-for="(list,index) in level" class="item" :data-tooltip="list.tooltip" data-inverted="">
						<!--<icon :name="list.name" :w="list.size" :h="list.size"></icon>-->
						<img class="imgBox" :src="list.url"></img>
					</div>
				</div>
				<div class="formSytle">
					<div class="item">
						样式
					</div>
					<div class="item" data-tooltip="加粗" data-inverted="">
						<icon name="B-icon" :w="20" :h="20"></icon>
					</div>
					<div class="item" data-tooltip="倾斜" data-inverted="">
						<icon name="I-icon" :w="20" :h="20"></icon>
					</div>
					<div class="item" data-tooltip="下划线" data-inverted="">
						<icon name="U-icon" :w="20" :h="20"></icon>
					</div>
					<div class="item" data-tooltip="左对齐文本" data-inverted="">
						<icon name="text-left" :w="22" :h="22"></icon>
					</div>
					<div class="item" data-tooltip="居中对齐文本" data-inverted="">
						<icon name="text-center" :w="22" :h="22"></icon>
					</div>
					<div class="item" data-tooltip="右对齐文本" data-inverted="">
						<icon name="text-right" :w="22" :h="22"></icon>
					</div>
				</div>
				<div class="formSytle">
					<div class="item">
						颜色
					</div>
					<input type="color" id="colorChange" v-model="colorvalue" v-on:change="colorChange()">
				</div>
				<div class="fontSet">
					<div class="zritem">
						字体
					</div>
					<div style="font-size: 12px;">
						大小
						<div class="ui selection dropdown" id="fontSizeDrop" style="min-width: 30px;width: 80px;">
							<input type="hidden" name="gender" v-model="fontSizeVal">
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
			</div>
			<!--<div class="title active"><i class="dropdown icon"></i> What kinds of dogs are there? </div>
			<div class="content active">
				<p class="transition visible" style="display: block !important;">狗有许多品种，每个品种都有不同的大小及性格，饲主通常选择适合自己生活方式的品种当作自已的伙伴，其中最受欢迎的品种绝对是吉娃娃。</p>
			</div>
			<div class="title"><i class="dropdown icon"></i> How do you acquire a dog? </div>
			<div class="content">
				<p class="transition hidden">通常有三种方式可以取得一只狗狗，宠物店、私人饲主或是动物之家。 (请以领养代替购买)</p>
				<p class="transition hidden">你可以在动物之家内领养一只健康的小狗，比起在宠物店买，收容所中的宠物比较不容易有近亲交配出现的缺陷问题，而且领养一只小狗的费用远比你在宠物店中购买便宜得多。</p>
			</div>-->
		</div>
		<div id="animateSet" class="ui fluid accordion" v-show="setType == 'animateSet'">
			<div class="title active"><i class="dropdown icon"></i>动画设置</div>
			<div class="content active">
				<div class="animatino-list">
					<div class="animation-item" v-for="item in animateList">
						<div class="animation-icon" @click="setAnimate(item.className)" :style="item.bpStyle"></div>
						<div class="animation-name">{{item.text}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		props: [],
		data() {
			return {
				setType: 'textSet',
				receivedData: '',
				Tindex: '',
				colorvalue: '',
				fontSizeVal: '',
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
			editText(data, index) {
				var _self = this;
				this.receivedData = data;
				this.Tindex = index;
				this.colorvalue = this.receivedData.textStyle.color
				this.fontSizeVal = this.receivedData.textStyle['font-size']
				$('#fontSizeDrop').dropdown("set text", _self.receivedData.textStyle['font-size'])
			},
			togglePage(type) {
				this.setType = type
			},
			setAlign(inx) {
				var _self = this;
				var index = _self.Tindex;
				if(inx == 0) {
					this.receivedData.textStyle.left = '0px'
					document.getElementsByClassName('dragtext')[index].style.left = this.receivedData.textStyle.left
				} else if(inx == 1) {
					var height = document.getElementsByClassName('dragtext')[index].offsetHeight;
					this.receivedData.textStyle.top = 'calc(50% - ' + height / 2 + 'px)';
					document.getElementsByClassName('dragtext')[index].style.top = this.receivedData.textStyle.top
				} else if(inx == 2) {
					//					this.receivedData.textStyle['right'] = '0px'
					//					document.getElementsByClassName('dragtext')[index].style.right = this.receivedData.textStyle.right
					//					console.log(this.receivedData.textStyle)
					var width = document.getElementsByClassName('dragtext')[index].offsetWidth
					console.log(width)
					this.receivedData.textStyle.left = 'calc(100% - ' + width + 'px)';
					document.getElementsByClassName('dragtext')[index].style.left = this.receivedData.textStyle.left
				} else if(inx == 3) {
					this.receivedData.textStyle.top = '0px'
					document.getElementsByClassName('dragtext')[index].style.top = this.receivedData.textStyle.top
				}
//				this.$emit('setStyle', _self.receivedData, this.Tindex)
			},
			colorChange() {
				console.log(this.colorvalue)
				this.receivedData.textStyle.color = this.colorvalue
			},
			addSize() {
				var _self = this;
				var num = this.receivedData.textStyle['font-size'].substring(0, this.receivedData.textStyle['font-size'].length - 2);
				num++;
				this.receivedData.textStyle['font-size'] = num + 'px';
				$('#fontSizeDrop').dropdown("set text", _self.receivedData.textStyle['font-size'])
			},
			cutSize() {
				var _self = this;
				var num = this.receivedData.textStyle['font-size'].substring(0, this.receivedData.textStyle['font-size'].length - 2);
				if(num > 12) {

					num--;
				}
				this.receivedData.textStyle['font-size'] = num + 'px';
				$('#fontSizeDrop').dropdown("set text", _self.receivedData.textStyle['font-size']);
				//				var index = _self.Tindex;
				//				document.getElementsByClassName('dragtext')[index].className = '';
				//				document.getElementsByClassName('dragtext')[index].className = 'flash animated'
				//				this.receivedData.animateStyle = 'flash animated'
			},
			setAnimate(data) {
				var index = this.Tindex;
				this.receivedData.animateStyle = data;
				$('.dragtext').eq(index).addClass(data)
				setTimeout(function() {
//					document.getElementsByClassName('dragtext')[index].removeClass(data);
					$('.dragtext').eq(index).removeClass(data)
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
			$('.zrBox .item').not(":first").mousedown(function() {
				$(this).css({
					'background': '#00c4cd',
					'color': 'rgb(255,255,255)'
				})
				$(this).mouseup(function() {
					$(this).css({
						'background': '',
						'color': '#7d8893'
					})
				})
			})
			$('#fontSizeDrop').dropdown({
				onChange: function(value, text, $selectedItem) {
					console.log(value)
					_self.receivedData.textStyle['font-size'] = value
				}
			})
			$('.animation-icon').click(function() {
				$('.animation-icon').removeClass('animation-icon-click')
				$(this).addClass('animation-icon-click')
			})

		},
		components: {

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
				}
				.formSytle:last-child {
					border-bottom: none;
				}
				.fontSet {
					padding: 8px;
					border-bottom: 1px solid #e1e1e1 !important;
					user-select: none;
					.zritem {
						width: auto;
						font-size: 12px;
						margin-right: 10px;
						line-height: 32px;
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
					background-image: url(../../../static/backgroundImages/maka_anim_enter.png);
					background-size: 228px 348px;
				}
				.animation-icon-click {
					background-image: url(../../../static/backgroundImages/maka_anim_enter_seleted.png) !important;
				}
				.animation-icon:hover {
					background-image: url(../../../static/backgroundImages/maka_anim_enter_seleted.png);
				}
				.animation-name {
					font-size: 12px;
				}
			}
		}
	}
</style>