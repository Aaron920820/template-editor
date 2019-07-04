<template>
	<div id="textSetPanel">
		<div class="ui secondary three item teal pointing menu" style="margin: 0;">
			<a class="item active">文本</a>
			<a class="item">动画</a>
			<a class="item">图层</a>
		</div>
		<div class="ui fluid accordion">
			<div class="title active"><i class="dropdown icon"></i>文本设置</div>
			<div class="content">
				<div class="formSytle">
					<div class="item">
						对齐
					</div>
					<div class="item" data-tooltip="左对齐" data-inverted="">
						<icon name="left" :w="22" :h="22"></icon>
					</div>
					<div class="item" data-tooltip="居中对齐" data-inverted="">
						<icon name="center" :w="22" :h="22"></icon>
					</div>
					<div class="item" data-tooltip="右对齐" data-inverted="">
						<icon name="right" :w="22" :h="22"></icon>
					</div>
					<div class="item" data-tooltip="顶部对齐" data-inverted="">
						<icon name="top" :w="22" :h="22"></icon>
					</div>
					<div class="item" data-tooltip="水平居中对齐" data-inverted="">
						<icon name="czjz" :w="22" :h="22"></icon>
					</div>
					<div class="item" data-tooltip="底部对齐" data-inverted="">
						<icon name="bottom" :w="22" :h="22"></icon>
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
		data() {
			return {
				text: ''
			}
		},
		methods: {
			editText(data) {
				this.text = data.textVal
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
		},
		components: {

		}

	}
</script>

<style scoped lang="scss">
	#textSetPanel{
		.ui.accordion{
			.title{
				background-color: rgb(252,252,252);
				border-top: 1px solid #e1e1e1;
			}
			.content{
				border-top: 1px solid #e1e1e1;
				padding: 0px 5px;
				.formSytle{
					padding: 0 8px;
					height: 32px;
					border-bottom:1px solid #e1e1e1 !important;
					user-select:none;
					.item{
						width: 30px;
						height: 32px;
						display: inline-block;
						vertical-align: middle;
						line-height: 2;
						text-align: center;
					}
					.item:not(:first-child){
						color: #7d8893;
					}
					.item:nth-of-type(1){
						width: auto;
						font-size:12px;
						margin-right: 10px;
						line-height: 32px;
					}
					.item:hover:not(:first-child){
						background-color: rgb(236,236,236);
					}
				}
				.formSytle:last-child{
					border-bottom:none;
					
					
				}
			}
		}
	}
</style>