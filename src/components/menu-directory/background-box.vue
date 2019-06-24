<template>
	<div id="backgroundBox" style="height: 100%;">
		<div class="colorBoard">
			<div class="color-picker picker"><input type="text" style="display: none;">
				<div class="sp-replacer sp-light" :style="useBgc">
					<div class="sp-preview">
						<div class="sp-preview-inner"></div>
					</div>
				</div>
			</div>
			<div class="board">
				<div class="colorItem" v-for="list in selectBgc" :style="list" @click="closebgc(list)"></div>
			</div>
		</div>
		<div class="splitline"></div>
		<!--<div id="tabular">
			<div class="itemContent" @click="toggleItem(list,index)" v-for="(list,index) in itemContent" :class="{avtice:list.type == contentView}">{{list.name}}</div>
		</div>-->
		<div class="bgi-pack">
			<div id="zr_case" class="case">
				<div class="ui three cards">
					<div class="card" v-for="(item,index) in imgesCard">
						<div class="image">
							<img :src="item.img" @click="changeBackground(item.img)">
							<div class="removeIcon">
								<i style="color: white;" class="times circle icon" @click="removeImg(index)"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--<div id="zr_case2" class="case" v-show="contentView == 'sale'">
				222
			</div>
			<div id="zr_case3" class="case" v-show="contentView == 'lines'">
				333
			</div>-->
		</div>
		<div class="ui button primary" v-show="contentView == 'mine'" @click="upload()" style="position: fixed;width: 200px;margin-left:50px;bottom: 20px;">
			<i class="ui icon cloud upload"></i> 上传图片
		</div>
		<input type="file" name="" accept="image/*" id="zr_upload" style="display: none;" @change="uploadAfter($event)" />

	</div>
</template>

<script>
	export default {
		data() {
			return {
				itemContent: [{
					name: '我的',
					type: 'mine',
				}, {
					name: '推荐',
					type: 'sale'
				}, {
					name: '纹理',
					type: 'lines'
				}],
				contentView: 'mine',
				useBgc: 'background: rgb(255, 255, 255)',
				selectBgc: ['background: rgb(255, 255, 255)', 'background: rgb(30, 206, 211)', 'background: rgb(18, 135, 170)',
					'background: rgb(0, 182, 240)', 'background:rgb(94, 200, 243)', 'background: rgb(168, 0, 195)', 'background: rgb(224, 0, 177)',
					'background: rgb(255, 0, 126)', 'background: rgb(255, 89, 169)', 'background: rgb(255, 85, 109)', 'background: rgb(0, 234, 198)',
					'background: rgb(0, 202, 182)', 'background: rgb(0, 157, 105)', 'background: rgb(0, 177, 61)', 'background: rgb(84, 224, 22)', 'background: rgb(172, 225, 136)',
					'background: rgb(240, 252, 115)', 'background: rgb(248, 230, 0)', 'background: rgb(226, 181, 0)', 'background: rgb(216, 100, 0)', 'background: rgb(255, 114, 0)',
					'background: rgb(255, 38, 0)', 'background: rgb(243, 0, 28)', 'background: rgb(84, 84, 85)', 'background: rgb(41, 30, 30)', 'background: rgb(0, 0, 0)'
				],
				imgesCard: []
			}
		},
		methods: {
			closebgc(data) {
				this.useBgc = data;
				this.$emit('transfer',this.useBgc)
			},
			toggleItem(lis, idx) {
				this.contentView = lis.type
			},
			upload() {
				$('#zr_upload').click()
			},
			uploadAfter(event) {
				console.log(event)
//				console.log(event.target.value)
//				var url = {
//					'img': event.target.value
//				};
//				this.imgesCard.push(url)
			},
			changeBackground(base){
				var item = 'background: url('+base+')'
				this.$emit('transfer',item)
			},
			removeImg(index){
				this.imgesCard.splice(index,1)
			}
		},
		created() {

		},
		mounted() {
			var _self = this;
			var eleFile = document.querySelector('#zr_upload');
			eleFile.addEventListener('change', function() {
				var file = this.files[0];
				// 确认选择的文件是图片                
				if(file.type.indexOf("image") == 0) {
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function(e) {
						// 图片base64化
						var newUrl = this.result;
						var url = {
							'img': newUrl
						};
						_self.imgesCard.push(url)
					};
				}
			});
		},
		components: {

		}

	}
</script>

<style scoped lang="scss">
	.colorBoard {
		margin-top: 20px;
		user-select: none;
		.color-picker {
			display: inline-block;
			margin: 0px 18px;
			vertical-align: top;
			overflow: hidden;
			width: 30px;
			height: 30px;
			.sp-replacer {
				margin: 0;
				padding: 0;
				border: 1px solid #000;
				border-radius: 2px;
				overflow: hidden;
				cursor: pointer;
				display: inline-block;
				color: #333;
				vertical-align: middle;
				.sp-preview {
					margin: 0;
					box-shadow: inset 0px 1px 2px 0px rgba(0, 0, 0, 0.5);
					width: 28px;
					height: 28px;
					border: none;
					background-image: none;
					position: relative;
					float: left;
					z-index: 0;
				}
			}
		}
		.board {
			vertical-align: top;
			display: inline-block;
			width: 210px;
			min-height: 80px;
			user-select: none;
			.colorItem {
				width: 21px;
				height: 21px;
				display: inline-block;
				border: 1px solid #313131;
				box-sizing: border-box;
				margin: 0 0.5%;
				/*margin-bottom: 0;*/
			}
			.colorItem:hover {
				cursor: pointer;
				border: 1px solid rgba(255, 255, 255, 0.5);
				box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.5);
			}
		}
	}
	
	.splitline {
		margin: 16px 16px 0 16px;
		width: calc(100% - 32px);
		height: 1px;
		background-color: black;
	}
	
	#tabular {
		margin: 0px 16px;
		width: calc(100% - 32px);
		display: flex;
		height: 50px;
		border-bottom: 1px solid rgb(0, 0, 0);
		user-select: none;
		.itemContent {
			color: white;
			flex: 1;
			text-align: center;
			line-height: 50px;
			border-bottom: 2px solid rgba(0, 0, 0, 0);
			transition: all 0.5s;
		}
		.itemContent.avtice {
			border-bottom: 2px solid #ffad70 !important;
		}
		.itemContent:hover {
			border-bottom: 2px solid rgba(255, 173, 112, 0.3);
			cursor: pointer;
		}
	}
	
	.bgi-pack {
		width: 100%;
		padding: 16px;
		padding-bottom: 30px;
		overflow-x: hidden;
		overflow-y: auto;
		user-select: none;
		max-height: calc(100% - 50px - 17px - 95px - 92px);
		.case {
			width: 100%;
			padding-bottom: 10px;
		}
		#zr_case {
			.cards {
				.card {
					border-radius: 0;
					background: none;
					box-shadow: none;
					position: relative;
					.image {
						border-radius: 0;
						img {
							border-radius: 0;
						}
						.removeIcon{
							position: absolute;
							top: -9px;
							right: -12px;
							i:hover{
								color:aqua !important
							}
						}
					}
					.image:hover {
						box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
						cursor: pointer;
					}
				}
			}
		}
	}
</style>