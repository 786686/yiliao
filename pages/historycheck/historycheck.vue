<template>
	<view class="content">
		<view class="upload-msg">
			<view class="item">
				<view class="item-t">就诊医院</view>
				<view class="item-b"><input type="text" placeholder="请输入就诊医院" v-model="hospital" /></view>
			</view>
			<view class="item">
				<view class="item-t">就诊时间</view>
				<view class="item-b">
					<picker mode="date" :value="date" @change="bindTimeChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="item-t">患病类型</view>
				<view class="item-b">
					<picker @change="bindTypeChange" :value="index" :range="typeNameList">
						<view class="uni-input">{{typeList[index].name}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="item-t">所患病情</view>
				<view class="item-b"><textarea placeholder="请输入所患病情" v-model="disease" /></view>
			</view>
			<view class="item-pics">
				<view class="tit">病例照片</view>
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
			const date = this.getDate();
			return {
				date,
				index: 0,
				typeList:[],
				typeNameList:[],
				typeId:0,
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				countIndex: 8,
				imageList: [],
                count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				server:server.domain,
				hospital:"",
				disease:"",
				diseaseImgList:[],
				id:""
			}
		},
		onLoad(options) {
			this.getTypeList();
			if(options.id){
				this.id = options.id;
				this.getDetail()
			}
		},
		methods: {
			async getDetail(){
				let that = this;
				let params = { 
					id:this.id
				};
				await tools.request("/api/my/treatmentRecordDetails.json", params,1,true).then(function(data) {
					that.item = data;
					that.date = that.item.treatmentTime.substr(0,10);
					that.hospital = that.item.hospital;
					that.disease = that.item.disease;
					that.diseaseImgList = that.item.diseaseImage.split(";");
					that.imageList = that.item.diseaseImage.split(";");
					
					if(that.typeNameList.indexOf(that.item.typeIllnessString) != -1){
						that.index = that.typeNameList.indexOf(that.item.typeIllnessString);
					}
					
					that.typeList.map( (item,i) => {
						if(i == that.index){
							that.typeId = that.typeList[i].id
						}
					})
				})
			},
			submit(){
				if(tools.isEmpty(this.hospital,"请输入就诊医院")){return;}
				if(tools.isEmpty(this.disease,"请输入所患病情")){return;}
				let that = this;
				let params = { 
					hospital:this.hospital,
					treatmentTimeString: this.date,
					disease:this.disease,
					diseaseImage: this.diseaseImgList.toString().replace(new RegExp(",","g"),";"),
					typeIllnessId:this.typeId,
				};
				//编辑
				if(that.id != ""){
					params.id = that.id;
					tools.request("/api/my/editTreatmentRecord.json", params,1,true).then(function(data) {
						tools.toastJumpBack("编辑病例成功", "/pages/historylist/historylist");
					})
					return;
				}
				tools.request("/api/my/addTreatmentRecord.json", params,1,true).then(function(data) {
					tools.toastJumpTab("添加病例成功", "/pages/index/index");
				});
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
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			async getTypeList(){
				let that = this;
				let params = {};
				await tools.request("/api/my/typeIllnessList.json", params).then(function(data) {
					that.typeList = data.typeIllnessDTOList;
					
					that.typeList.map( item => {
						that.typeNameList.push(item.name);
					})
					if(that.typeList.length > 0){
						that.typeId = that.typeList[0].id
					}
				})
			},
			bindTypeChange(event){
				this.index = event.detail.value
				this.typeId = this.typeList[this.index].id;
			},
			bindTimeChange(event){
				this.date = event.detail.value;
			}
		}
	}
</script>

<style lang="scss">
	
</style>