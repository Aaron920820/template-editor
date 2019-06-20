<template>
	<div id="imageSelect">
		<div class="bgi-pack">
			<div id="zr_case" class="case">
				<div class="ui three cards">
					<div class="card" v-for="item in imgesCard">
						<div class="image">
							<img :src="item.img">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="ui button primary" @click="upload()" style="position: fixed;width: 200px;margin-left:50px;bottom: 20px;">
			<i class="ui icon cloud upload"></i> 上传图片
		</div>
		<input type="file" name="" accept="image/*" id="zr_upload" style="display: none;" @change="uploadAfter($event)" />
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imgesCard: []
			}
		},
		methods: {
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
	#imageSelect {
		height: 100%;
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
						.image {
							border-radius: 0;
							img {
								border-radius: 0;
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
	}
</style>