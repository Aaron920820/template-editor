<template>
	<div id="textBox">
		<ul class="zr_li">
			<li v-for="(list,index) in litext" v-text="list" @click="addText(index,list)"></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				litext: ['大标题', '标题', '副标题', '小标题', '正文内容']
			}
		},
		methods: {
			addText(index,te) {
				var _self = this;
				switch(index) {
					case 0:
						_self.$emit('addText','48px',te)
						break;
					case 1:
						_self.$emit('addText','30px',te)
						break;
					case 2:
						_self.$emit('addText','20px',te)
						break;
					case 3:
						_self.$emit('addText','18px',te)
						break;
					case 4:
						_self.$emit('addText','14px',te)
						
						
				}
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
	#textBox {
		.zr_li {
			list-style: none;
			margin: 0;
			padding: 15px 0;
			li {
				text-align: center;
				margin-bottom: 5px;
				color: white;
				user-select: none;
				border-top: solid 1px rgba(0, 0, 0, 0);
				border-bottom: solid 1px rgba(0, 0, 0, 0);
			}
			li:hover {
				background-color: rgb(49, 55, 63);
				border-top: solid 1px #ffad70;
				border-bottom: solid 1px #ffad70;
				cursor: pointer;
			}
		}
		.zr_li li:nth-of-type(1) {
			font-size: 48px;
			font-weight: 600;
			height: 56px;
			line-height: 56px;
		}
		.zr_li li:nth-of-type(2) {
			font-size: 30px;
			font-weight: 600;
			height: 38px;
			line-height: 38px;
		}
		.zr_li li:nth-of-type(3) {
			font-size: 20px;
			height: 28px;
			line-height: 28px;
		}
		.zr_li li:nth-of-type(4) {
			font-size: 18px;
			height: 26px;
			line-height: 26px;
		}
		.zr_li li:nth-of-type(5) {
			font-size: 14px;
			height: 22px;
			line-height: 22px;
		}
	}
</style>