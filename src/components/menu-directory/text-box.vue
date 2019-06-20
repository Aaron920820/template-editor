<template>
	<div id="textBox">
		<ul class="zr_li">
			<li>大标题</li>
			<li>标题</li>
			<li>副标题</li>
			<li>小标题</li>
			<li>正文内容</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				currentView: 'textBox'
			}
		},
		methods: {
			init() {

			}
		},
		created() {

		},
		mounted() {
			var _self = this;
		},
		components: {
			
		}

	}
</script>

<style scoped lang="scss">
	#textBox{
		.zr_li{
			list-style: none;
			margin: 0;
			padding: 15px 0;
			li{
				text-align: center;
				margin-bottom: 5px;
				color: white;
				user-select:none;
				border-top: solid 1px rgba(0,0,0,0);
				border-bottom: solid 1px rgba(0,0,0,0);
			}
			li:hover{
				background-color: rgb(63,70,82);
				border-top: solid 1px #ffad70;
				border-bottom: solid 1px #ffad70;
				cursor: pointer;
			}
		}
		.zr_li li:nth-of-type(1){
			font-size: 48px;
			font-weight: 600;
			height: 56px;
			line-height: 56px;
		}
		.zr_li li:nth-of-type(2){
			font-size: 30px;
			font-weight: 600;
			height: 38px;
			line-height: 38px;
		}
		.zr_li li:nth-of-type(3){
			font-size: 20px;
			height: 28px;
			line-height: 28px;
		}
		.zr_li li:nth-of-type(4){
			font-size: 18px;
			height: 26px;
			line-height: 26px;
		}
		.zr_li li:nth-of-type(5){
			font-size: 14px;
			height: 22px;
			line-height: 22px;
		}
	}
</style>