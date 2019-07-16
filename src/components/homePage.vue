<template>
	<div class="homePage">
		<!--头部-->
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
		<!--整个页面DIV-->
		<div id="zr_index" class="ui grid">
			<!--左侧导航1-->
			<div class="one wide column">
				<div id="zr_menu" class="ui fluid tabular labeled icon vertical menu">
					<a class="item" @click="menuToggle(list)" :class="{active:list.type == currentView}" v-for="(list,index) in menu">
						<i class="icon" :class="list.iconClass"></i>{{list.name}}
					</a>
				</div>
			</div>
			<!--左侧导航2-->
			<div id="sideBar" class="three wide stretched column">
				<div id="myConcent" class="ui segment">
					<keep-alive>
						<box :is="currentView" @transfer='getbackground' @addText='addText' @addPicture='addPicture'></box>
					</keep-alive>
				</div>
			</div>
			<!--编辑面板-->
			<div id="editorIndex" class="thirteen wide column">
				<div id="editorPage" :style='mainData.templateBackgroundImg'>
					<text-frame v-for="(item,index) in mainData.textbox" :key="index+item.textId" :psMsg="item" :textIndex="index" @setText="setText"></text-frame>
					<picture-frame v-for="(img,inx) in mainData.imgbox" :key="inx+img.imgId" :imgMsg="img" :PictureIndex="inx" @setPicture="setPicture"></picture-frame>
				</div>
			</div>
			<!--右侧操作栏-->
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
				<div class="ui green ok inverted button" @click="saveData()">
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
				mainData:{
					templateBackgroundImg:'',
					textbox:[],
					imgbox:[]
				},
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
				textId: 0,
				imgId: 0,
				boxShow:false,
				operationView: ''
			}
		},
		watch:{
//			mainData:'changeData'
		},
		methods: {
			changeData(val){
				var _self = this;
				console.log(val)
				_self.$store.state.allData = val
			},
			menuToggle(lis) {
				this.currentView = lis.type
			},
			saveTemplate() {

				$('#savemodal').modal('show')
			},
			getbackground(data) {
				this.mainData.templateBackgroundImg = data
			},
			addText(data, te) {
				var _self = this;
				_self.textId++;
				var item = {
					"textId": "text" + _self.textId,
					"textVal": te,
					"defaultVal": te,
					"animateStyle": "",
					"textStyle": {
						"top": "50%",
						"left": "45%",
						"z-index": $('.dragtext').length+$('.dragpicture').length+1,
						"color": "#000000",
						"font-size": data,
						"text-align": "",
						"writing-mode": "",
						"font-family": "",
						"letter-spacing": "",
						"line-height": "1"
					}
				}
				_self.mainData.textbox.push(item);
				_self.operationView = ''
			},
			addPicture(imgBase, width, height) {
				var _self = this;
				_self.imgId++;
				var item = {
					"imgId": "img" + _self.imgId,
					"imgsrc": imgBase,
					"animateStyle": "",
					"imgStyle": {
						"top": "10%",
						"left": "10%",
						"width": width * 2 + 'px',
						"height": height * 2 + 'px',
						"z-index": $('.dragtext').length+$('.dragpicture').length+1,
						"background-image": 'url(' + imgBase + ')'
					}
				}
				_self.mainData.imgbox.push(item);
			},
			setText(data, type,index) {
				var _self = this;
				this.operationView = type;
				Vue.nextTick(function() {
					_self.$refs.edit.editText(data,index);
				})
			},
			setPicture(data, type,index) {
				var _self = this;
				this.operationView = type;
				Vue.nextTick(function() {
					_self.$refs.edit.editPicture(data,index);
				})
			},
//			setStyle(data,index,type){
//				var _self = this;
//				var dataS = JSON.parse(JSON.stringify(data))
//				Vue.set(_self.textBox,index,dataS)
//				
//			},
			saveData() {
				var _self = this;
				var allData = JSON.parse(JSON.stringify(_self.mainData));
				var textBox = allData.textbox;
				var imgBox = allData.imgbox;
				for(var i = 0 ;i < textBox.length;i++){
					var changeObj = {};
					for(var k in textBox[i].textStyle){
						var reg = new RegExp("-")
						var change = k.replace(reg,"")
						var str = textBox[i].textStyle[k];
						if(str.length > 2){
							if(str.substring(str.length-2) == 'px'){
								textBox[i].textStyle[k] = Number(str.substring(0,str.length-2))/16 + 'rem'
							}else if(str.substring(str.length-3) == 'px)'){
								var rem = ' '+Number(str.substring(str.indexOf('-')+1,str.length-3))/16 + 'rem)'
								console.log(str.substring(0,str.indexOf('-')+1))
								textBox[i].textStyle[k] = String(str.substring(0,str.indexOf('-')+1) + rem)
							}
						}
						changeObj[change] = textBox[i].textStyle[k]
					}
					textBox[i].textStyle = changeObj
				}
				for(var i = 0 ;i < imgBox.length;i++){
					var changeObj = {};
					for(var k in imgBox[i].imgStyle){
						if(k !== 'background-image'){
							
							var reg = new RegExp("-")
							var change = k.replace(reg,"")
							var str = imgBox[i].imgStyle[k];
							if(str.length > 2){
								if(str.substring(str.length-2) == 'px'){
									imgBox[i].imgStyle[k] = Number(str.substring(0,str.length-2))/16 + 'rem'
								}else if(str.substring(str.length-3) == 'px)'){
									var rem = ' '+Number(str.substring(str.indexOf('-')+1,str.length-3))/16 + 'rem)'
									console.log(str.substring(0,str.indexOf('-')+1))
									imgBox[i].imgStyle[k] = String(str.substring(0,str.indexOf('-')+1) + rem)
								}
							}
							changeObj[change] = imgBox[i].imgStyle[k]
						}
					}
					imgBox[i].imgStyle = changeObj
				}
				console.log(allData)
				$.ajax({
					type: 'POST',
					url: "http://192.168.0.133:20009/api/bind/createfile_js",
					//					contentType: "application/json",
					data: JSON.stringify(allData),
					success: function(data) {
						console.log(data)
						window.open(data)
					},
					error: function() {
						console.log('请求失败')
					},
				});

			}
		},
		mounted() {
			var _self = this;
			_self.$store.state.allData = this.mainData
			document.onkeydown = function() {
				if(window.event && window.event.keyCode == 13) {
					window.event.returnValue = false;
				}
			}
			document.oncontextmenu = function() {　　
				return false;
			}
			$('#editorPage').click(function(e){
				var target = $(e.target);
				if(target.closest(".zrcontent").length != 0) return;
				$(".border_all").hide();
				$(".zrcontent").removeClass('onafter');
				_self.operationView = ''
			})
		},
		components: {
			templateBox,
			textBox,
			background,
			textAttribute,
			pictureAttribute,
			'text-frame': textFrame,
			'picture-frame': pictureFrame
		}

	}
</script>
<style scoped lang="scss">
	$themeColor:#ffad70;
	.homePage {
		width: 100%;
		height: 100%;
		.zr_header {
			background: -webkit-linear-gradient(left, rgb(10, 185, 201), rgb(92, 96, 173));
			/* Safari 5.1 - 6.0 */
			background: -o-linear-gradient(right, rgb(10, 185, 201), rgb(92, 96, 173));
			/* Opera 11.1 - 12.0 */
			background: -moz-linear-gradient(right, rgb(10, 185, 201), rgb(92, 96, 173));
			/* Firefox 3.6 - 15 */
			background: linear-gradient(to right, rgb(10, 185, 201), rgb(92, 96, 173));
			/* 标准的语法（必须放在最后） */
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
					background-color: rgb(63, 70, 82);
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
					width: 414px !important;
					height: 736px !important;
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