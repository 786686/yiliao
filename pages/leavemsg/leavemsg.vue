<template>
	<view class="content">
		<view class="upload-msg">
			<view class="item">
				<view class="item-t">病情描述</view>
				<view class="item-b">
					<textarea placeholder="请输入病情描述" v-model="description" />
					<!-- <input type="text" placeholder="请输入病情描述" v-model="description" /> -->
					</view>
			</view>
			<view class="item-pics">
				<view class="tit">辅助照片</view>
				<view class="uni-uploader">
				    <view class="uni-uploader-body">
				        <view class="uni-uploader__files">
				            <block v-for="(image,index) in imageList" :key="index">
				                <view class="uni-uploader__file">
				                    <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
				                </view>
				            </block>
				            <view class="uni-uploader__input-box" v-if="imageList != 9">
				                <view class="uni-uploader__input" @tap="chooseImage"></view>
				            </view>
				        </view>
				    </view>
				</view>
			</view>
		</view>
		<view class="btn-save" @click="submit">
			保存
		</view>
	</view>
</template>

<script>
	const tools = require('@/common/tools.js');
	const server = require('@/common/server.js');
	
	// #ifdef APP-PLUS
	import permision from "@/common/permission.js"
	// #endif
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		data() {
			return {
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				countIndex: 8,
				imageList: [],
                count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				server:server.domain,
				description:"",
				diseaseImgList:[],
				doctorId:"",
				apply:false
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
			}
			if(options.apply){
				this.apply = true;
			}
			// this.doctorId = 1;
		},
		methods: {
			// {{base}}/api/my/replyAdvisory.json?id=1&description=12333&images=1213;&sessionId=c888b2cc12c3077eb7d8ee584a2aa175&parentId=18
			submit(){
				if(tools.isEmpty(this.description,"请输入病情描述")){return;}
				let that = this;
				if(this.apply){
					let params = { 
						parentId:that.id,
						description:this.description,
						images: this.diseaseImgList.toString().replace(new RegExp(",","g"),";"),
					};
					tools.request("/api/my/replyAdvisory.json", params,1,true).then(function(data) {
						tools.toastJumpBack("回复成功","/pages/messagedetail/messagedetail?id="+that.id);
					});
					return;
				}
				
				let params = { 
					doctorId:this.id,
					// parentId:0,
					description:this.description,
					images: this.diseaseImgList.toString().replace(new RegExp(",","g"),";"),
				};
				tools.request("/api/index/advisory.json", params,1,true).then(function(data) {
					tools.toastJumpBack("留言成功","/pages/doctor/doctor?id"+that.id);
				})
			},
			async checkPermission(code) {
			    let type = code ? code - 1 : this.sourceTypeIndex;
			    let status = permision.isIOS ? await permision.requestIOS(sourceType[type][0]) :
			        await permision.requestAndroid(type === 0 ? 'android.permission.CAMERA' :
			            'android.permission.READ_EXTERNAL_STORAGE');
			
			    if (status === null || status === 1) {
			        status = 1;
			    } else {
			        uni.showModal({
			            content: "没有开启权限",
			            confirmText: "设置",
			            success: function(res) {
			                if (res.confirm) {
			                    permision.gotoAppSetting();
			                }
			            }
			        })
			    }
			
			    return status;
			},
			isFullImg: function() {
			    return new Promise((res) => {
			        uni.showModal({
			            content: "已经有9张图片了,是否清空现有图片？",
			            success: (e) => {
			                if (e.confirm) {
			                    this.imageList = [];
			                    res(true);
			                } else {
			                    res(false)
			                }
			            },
			            fail: () => {
			                res(false)
			            }
			        })
			    })
			},
            previewImage: function(e) {
				console.log(e.target.dataset.src)
                var current = e.target.dataset.src
                uni.previewImage({
                    current: current,
                    urls: this.imageList
                })
            },
			chooseImage: async function() {
			    // #ifdef APP-PLUS
			    // TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
			    if (this.sourceTypeIndex !== 2) {
			        let status = await this.checkPermission();
			        if (status !== 1) {
			            return;
			        }
			    }
			    // #endif
			
			    if (this.imageList.length === 9) {
			        let isContinue = await this.isFullImg();
			        console.log("是否继续?", isContinue);
			        if (!isContinue) {
			            return;
			        }
			    }
				let that = this;
			    uni.chooseImage({
			        sourceType: sourceType[this.sourceTypeIndex],
			        sizeType: sizeType[this.sizeTypeIndex],
			        count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length :
			            this.count[this.countIndex],
			        success: (res) => {
						
							console.log(res)
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: that.server + '/api/common/uploadImage.json', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								//上传成功
								let response = JSON.parse(uploadFileRes.data);
								if (response.status === "2000000") {
									// response.data.url
									//加上那些没有http开头链接的
									that.diseaseImgList = that.diseaseImgList.concat(response.data.url);
									that.imageList = that.imageList.concat(res.tempFilePaths);
								}
							}
						});
			        },
			        fail: (err) => {
			            // #ifdef APP-PLUS
			            if (err['code'] && err.code !== 0 && that.sourceTypeIndex === 2) {
			                that.checkPermission(err.code);
			            }
			            // #endif
			        }
			    })
			},
		}
	}
</script>

<style lang="scss">
	
</style>
