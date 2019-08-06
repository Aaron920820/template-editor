<template>
	<ul class="rDropdown">
		<li @click="removeItem">删除</li>
	</ul>
</template>

<script>
	export default {
		props: ['pTop', 'pLeft','removeType','removeIndex'],
		data() {
			return {
				list: ''
			}
		},
		methods: {
			//删除功能
			removeItem(){
				var _self = this;
				this.$store.state.allData[this.removeType].splice(this.removeIndex,1)
				console.log(this.$store.state.allData)
				this.$emit('remove',false)
			}
		},
		watch: {
			pTop(val) {
				$('.rDropdown').css({
					top: val
				})
			},
			pLeft(val) {
				$('.rDropdown').css({
					left: val
				})
			}
		},
		mounted() {
			var _self = this;
			$('.rDropdown').css({
				top: _self.pTop,
				left: _self.pLeft
			})
		}
	}
</script>
<style scoped lang="scss">
	.rDropdown {
		background-color: rgb(255, 255, 255);
		box-shadow: 0 2px 5px rgba(0, 0, 0, .5);
		border-radius: 3px;
		position: absolute;
		width: 100px;
		padding: 0;
		opacity: .9;
		margin: 0;
		z-index: 1000;
		li {
			list-style: none;
			width: 100%;
			height: 32px;
			line-height: 22px;
			text-align: center;
			padding: 5px 0;
		}
		li:hover {
			background-color: #ffd5c4;
			cursor: pointer;
		}
	}
</style>