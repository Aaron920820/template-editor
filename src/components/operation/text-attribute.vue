<template>
	<div id="textSetPanel">
		<div class="ui secondary three item teal pointing menu" style="margin: 0;">
			<a class="item active">文本</a>
			<a class="item">动画</a>
			<a class="item">图层</a>
		</div>
		<div class="ui fluid accordion">
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
						<div class="imgBox" style="background-image: url('http://res.maka.im/cdn/makal/release/66d2cb33e5299d433fe27e69a6cdb6fb.png');background-size: 100% 100%;">
							
						</div>
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
	</div>

</template>

<script>
	export default {
		props:['boxShow'],
		data() {
			return {
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
					name: "cbpag-wbbtu",
					size: "22"
				}, {
					tooltip: "下一层",
					name: "downlevel",
					size: "22"
				}, {
					tooltip: "置顶",
					name: "toplevel",
					size: "22"
				}, {
					tooltip: "置底",
					name: "bottomlevel",
					size: "22"
				}]
			}
		},
		methods: {
			editText(data, index) {
				this.receivedData = data;
				this.Tindex = index;
			},
			setAlign(inx) {
				var _self = this;
				var index = _self.Tindex
				if(inx == 0) {
					this.receivedData.textStyle.left = '0px'
					document.getElementsByClassName('dragtext')[index].style.left = this.receivedData.textStyle.left
				} else if(inx == 1) {
					var height = document.getElementsByClassName('dragtext')[index].offsetHeight;
					this.receivedData.textStyle.top = 'calc(50% - ' + height/2 + 'px)';
					document.getElementsByClassName('dragtext')[index].style.top = this.receivedData.textStyle.top
				}else if(inx == 2){
//					this.receivedData.textStyle['right'] = '0px'
//					document.getElementsByClassName('dragtext')[index].style.right = this.receivedData.textStyle.right
//					console.log(this.receivedData.textStyle)
					var width = document.getElementsByClassName('dragtext')[index].offsetWidth
					console.log(width)
					this.receivedData.textStyle.left = 'calc(100% - ' + width + 'px)';
					document.getElementsByClassName('dragtext')[index].style.left = this.receivedData.textStyle.left
				}else if(inx == 3){
					this.receivedData.textStyle.top = '0px'
					document.getElementsByClassName('dragtext')[index].style.top = this.receivedData.textStyle.top
				}
				this.$emit('setStyle', _self.receivedData, this.Tindex)
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
		},
		components: {

		}

	}
</script>

<style scoped lang="scss">
	#textSetPanel {
		.ui.accordion {
			.title {
				background-color: rgb(252, 252, 252);
				border-top: 1px solid #e1e1e1;
			}
			.content {
				border-top: 1px solid #e1e1e1;
				padding: 0px 5px;
				.formSytle {
					padding: 0 8px;
					height: 32px;
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
			}
		}
	}
</style>