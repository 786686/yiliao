<template>
	<view class="content">
		<view class="message-list">
			<view class="item">
				<view class="item-top">{{item.createTime}}</view>
				<view class="item-in">
					<view class="item-l">所患病情</view>
					<view class="item-r">{{item.disease}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">就诊时间</view>
					<view class="item-r">{{item.treatmentTime}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">患病类型</view>
					<view class="item-r">{{item.typeIllnessString}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">就诊医院</view>
					<view class="item-r">{{item.hospital}}</view>
				</view>
				<view class="item-in" v-if="item.type == 2">
					<view class="item-l">医生描述</view>
					<view class="item-r">{{item.doctorDescription}}</view>
				</view>
				
				<view class="item-in">
					<view class="item-l">病例照片</view>
					<view class="item-r">
						<image mode="" v-for="(image,index) in item.diseaseImage" :key="index" :src="image" :data-src="image" @tap="previewImage"></image>
						<!-- <view class="uni-uploader">
						    <view class="uni-uploader-body">
						        <view class="uni-uploader__files">
						            <block v-for="(image,index) in item.diseaseImage" :key="index">
						                <view class="uni-uploader__file">
						                    <image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
						                </view>
						            </block>
						        </view>
						    </view>
						</view> -->
					</view>
				</view>
				
				<view class="item-in" v-if="item.type == 2">
					<view class="item-l">医生上传</view>
					<view class="item-r">
						<image mode="" v-for="(image,index) in item.doctorImages" :key="index" :src="image" :data-src="image" @tap="previewImage"></image>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	import empty from '../empty/empty.vue';
	export default {
		components:{
			empty
		},
		data() {
			return {
				item:{},
				id:"",
				imageList:[]
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
			}
			console.log("onload")
		},
		onShow() {
			console.log("onshow")
			this.getDetail();
		},
		
		methods: { 
            previewImage: function(e) {
				console.log(e.target.dataset.src)
                var current = e.target.dataset.src
                uni.previewImage({
                    current: current,
                    urls: this.imageList
                })
            },
			getDetail(){
				let that = this;
				let params = {
					id:that.id
				}
				tools.request("/api/my/treatmentRecordDetails.json", params,1,true).then(function(data) {
					that.item = data;
					that.item.diseaseImage = that.item.diseaseImage.split(';')
					that.item.doctorImages = that.item.doctorImages.split(';')
					
					for(let i in that.item.diseaseImage){
						that.imageList.push(that.item.diseaseImage[i])
					}
					for(let i in that.item.doctorImages){
						that.imageList.push(that.item.doctorImages[i])
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>


<!-- <template>
	<view class="content">
		<view class="history">
			<view class="item">
				<view class="item-t">所患病情</view>
				<view class="item-b">所患病情</view>
			</view>
			<view class="item">
				<view class="item-t">就诊时间</view>
				<view class="item-b">就诊时间</view>
			</view>
			<view class="item">
				<view class="item-t">就诊医院</view>
				<view class="item-b">就诊医院</view>
			</view>
			<view class="item">
				<view class="item-t">就诊科室</view>
				<view class="item-b">就诊科室</view>
			</view>
			<view class="history-pics">
				<view class="tit">处方药物</view>
				<view class="list">
					<view class="item">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../static/logo.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-add">+ 新增病史</view>
		<view class="btn-save">保存，完成登记</view>
	</view>
</template> -->