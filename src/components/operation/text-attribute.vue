<template>
	<div id="textSetPanel">
		<div class="ui secondary three item teal pointing menu" style="margin: 0;">
			<a class="item active">文本</a>
			<a class="item">动画</a>
			<a class="item">图层</a>
		</div>
		<div class="ui fluid accordion">
			<div class="title"><i class="dropdown icon"></i>文本设置</div>
			<div class="content">
				<div class="formSytle">
					<div class="item">
						样式
					</div>
					<div class="item">
						加粗
					</div>
					<div class="item">
						斜体
					</div>
					<div class="item">
						下划线
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
				$(this).siblings().removeClass('active')
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
					line-height: 38px;
					border-bottom:1px solid #e1e1e1;
					user-select:none;
					.item{
						width: 30px;
						height: 32px;
						display: inline-block;
						vertical-align: middle;
						line-height: 32px;
					}
					.item:nth-of-type(1){
						width: auto;
						font-size:12px;
						margin-right: 10px;
					}
					.item:hover:not(:first-child){
						background-color: rgb(236,236,236);
					}
				}
				.formSytle:last-child{
					border-bottom:none
				}
			}
		}
	}
</style>