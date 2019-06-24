<template>
	<div class="homePage">
		<div class="zr_header">
			<div class="leftDiv">
				<div class="s17"></div>
			</div>
			<div class="rightDiv">
				<button class="ui mini orange button">
				  <i class="eye icon"></i>预览
				</button>
				<button class="ui mini green button" @click="saveTemplate()">
				  <i class="save outline icon"></i>保存
				</button>
			</div>
		</div>
		<div id="zr_index" class="ui grid">
			<div class="one wide column">
				<div id="zr_menu" class="ui fluid tabular labeled icon vertical menu">
					<a class="item" @click="menuToggle(list)" :class="{active:list.type == currentView}" v-for="(list,index) in menu">
						<i class="ui icon" :class="list.iconClass"></i>{{list.name}}
					</a>
				</div>
			</div>
			<div id="sideBar" class="three wide stretched column">
				<div id="myConcent" class="ui segment">
					<keep-alive>
						<box :is="currentView" @transfer='getbackground' @addText='addText'></box>
					</keep-alive>
				</div>
			</div>
			<div id="editorIndex" class="thirteen wide column">
				<div id="editorPage" :style='backgroundCss'>
					<text-frame v-for="(item,index) in textBox" :key="index" :psMsg="item" @setText="setText"></text-frame>
					<picture-frame></picture-frame>
				</div>
			</div>
			<div id="rightBar" class="three wide column">
				<div style="background-color: rgb(62,84,115);text-align: center;color: white;">操作</div>
				<operation :is="operationView" ref='edit'></operation>
			</div>
		</div>
		<!--弹出框-->
		<div id="savemodal" class="ui basic modal">
			<div class="ui icon header">
				<i class="save icon"></i> 保存模板
			</div>
			<div class="content">
				<p>你确定保存此模板？</p>
			</div>
			<div class="actions">
				<div class="ui red basic cancel inverted button">
					<i class="remove icon"></i> 否
				</div>
				<div class="ui green ok inverted button">
					<i class="checkmark icon"></i> 是
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import templateBox from './menu-directory/template-box'
	import textBox from './menu-directory/text-box'
	import background from './menu-directory/background-box'
	import textFrame from './library/text-frame'
	import pictureFrame from './library/picture-frame'
	import textAttribute from './operation/text-attribute'
	import pictureAttribute from './operation/picture-attribute'
	export default {
		data() {
			return {
				menu: [{
						name: '背景',
						type: 'background',
						iconClass: 'th large'
					}, {
						name: '文字',
						type: 'textBox',
						iconClass: 'font'
					},
					{
						name: '素材',
						type: 'templateBox',
						iconClass: 'file image'
					}
				],
				currentView: 'background',
				backgroundCss: '',
				textBox: [],
				textId: 0,
				operationView:''
			}
		},
		methods: {
			menuToggle(lis) {
				this.currentView = lis.type
			},
			saveTemplate() {
				$('#savemodal').modal('show')
			},
			getbackground(data) {
				this.backgroundCss = data
			},
			addText(data, te) {
				var _self = this;
				_self.textId++;
				var item = {
					"textId": "text" + _self.textId,
					"textVal": te,
					"defaultVal":te,
					"Class": "",
					"textStyle": {
						"top": "50%",
						"left": "45%",
						"z-index": "1",
						"color": "",
						"font-size": data,
						"text-align": "",
						"writing-mode": "",
						"font-family": "",
						"letter-spacing": "",
						"background-color": "",
						"line-height": "1"
					}
				}
				_self.textBox.push(item);
			},
			setText(data,type){
				var _self = this;
				this.operationView = type;
				Vue.nextTick(function(){
					_self.$refs.edit.editText(data);
				})
			}
		},
		mounted() {
			var _self = this;
			document.onkeydown = function() {
				if(window.event && window.event.keyCode == 13) {
					window.event.returnValue = false;
				}
			}
		},
		components: {
			templateBox,
			textBox,
			background,
			textAttribute,
			pictureAttribute,
			'text-frame': textFrame,
			'picture-frame':pictureFrame
		}

	}
</script>
<style scoped lang="scss">
	$themeColor:#ffad70;
	.homePage {
		width: 100%;
		height: 100%;
		.zr_header {
			background: -webkit-linear-gradient(left bottom, rgb(10, 185, 201), rgb(92, 96, 173));
			background: -o-linear-gradient(left bottom, rgb(10, 185, 201), rgb(92, 96, 173));
			background: -moz-linear-gradient(left bottom, rgb(10, 185, 201), rgb(92, 96, 173));
			background: linear-gradient(left bottom, rgb(10, 185, 201), rgb(92, 96, 173));
			width: 100%;
			height: 38px;
			z-index: 3;
			line-height: 38px;
			position: fixed;
			.leftDiv {
				width: 60px;
				height: 100%;
				float: left;
				.s17 {
					background: linear-gradient(270deg, #03c0cc 0%, #0fb3c7 100%);
					width: 7px;
					height: 100%;
					float: right;
				}
			}
			.rightDiv {
				float: right;
				margin-right: 20px;
			}
		}
		#zr_index {
			width: 100%;
			height: calc(100% - 38px);
			.one.wide {
				width: 60px !important;
				position: fixed;
				top: 38px;
				height: 100%;
				padding: 0;
				z-index: 3;
				background-color: #262d38;
				#zr_menu {
					border-right: none;
					.item {
						color: white;
						font-size: 14px;
						transition: background-color .5s;
						border: none !important;
						height: 60px !important;
						font-size: 12px;
					}
					.item.active {
						color: $themeColor;
						border-radius: 0 !important;
						background-color: #3e5473;
					}
					.item:hover {
						color: $themeColor;
					}
				}
			}
			#sideBar {
				width: 300px !important;
				position: fixed;
				top: 38px;
				height: 100%;
				margin-left: 60px;
				padding: 0;
				border-radius: 0;
				z-index: 3;
				#myConcent {
					background-color: rgb(63,70,82);
					border: none;
					box-shadow: none;
					border-radius: 0 !important;
					padding: 0;
					height: 100%;
				}
			}
			#editorIndex {
				display: flex;
				align-items: center;
				margin-left: 360px;
				width: calc(100% - 660px + 2rem) !important;
				margin-top: 38px;
				height: 100%;
				min-width: 650px;
				min-height: 780px;
				background-color: rgb(239, 239, 239);
				#editorPage {
					width: 432px !important;
					height: 768px !important;
					background-color: white;
					overflow: hidden;
					user-select: none;
					position: relative;
					margin: 0 auto;
					outline: 2px #00c4cd solid;
					background-size: 100% 100% !important;
					background-repeat: no-repeat !important;
				}
			}
			#rightBar {
				width: 300px !important;
				position: fixed;
				top: 38px;
				height: 100%;
				right: 0;
				padding: 0;
				background: white;
				z-index: 2;
				border-left: 1px solid rgb(215, 215, 215);
			}
		}
	}
</style>