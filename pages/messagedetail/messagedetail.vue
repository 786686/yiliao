<template>
	<view class="content">
		<view class="message-list">
			<view class="item">
				<view class="item-top">{{item.createTimeString}}</view>
				<view class="item-in">
					<view class="item-l">病情描述</view>
					<view class="item-r">{{item.description}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">处方药物</view>
					<view class="item-r">
						<image :src="i" :key="index" v-for="(i,index) in item.images" :data-src="i" @tap="previewImage"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="leavemsg">
			<view class="tit">留言</view>
			<view class="leavemsg-list">
				<view class="item" v-for="i in item.leaveMessage" :key="i">
					<view class="item-top">
						<view class="item-l">
							<image :src="i.avatar"></image>
							{{i.name}}
						</view>
						<view class="item-time">{{i.createTimeString}}</view>
					</view>
					<view class="item-con">
						{{i.description}}
					</view>
					<view class="item-pics">
						<image :src="msg" mode="" :key="index" v-for="(msg,index) in i.images" :data-src="msg" @tap="previewImage"></image>
					</view>
				</view>
			</view>
			<empty v-if="item.leaveMessage.length == 0"></empty>
		</view>
		<view class="btn-save" @click="apply">回复</view>
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
				imageList:[]
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
			}
		},
		onShow() {
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
			apply(){
				let that = this;
				tools.request("/api/index/judgeIsUpdateUserInfo.json", {},1,true).then(function(data) {
					if(data.isFill == 1){
						tools.jumpTo("/pages/leavemsg/leavemsg?id="+that.id+"&apply=true");
					}else{
						tools.toastJump("未填写个人信息", "/pages/personmsg/personmsg");
					}
				})
			},
			getDetail(){
				let that = this;
				let params = {
					pageSize: 10,
					pageNumber:1,
					id: this.id,
					
				}
				tools.request("/api/my/advisoryDetail.json", params,1,true).then(function(data) {
					data.images = data.images.split(';');
					for(let i in data.leaveMessage){
						data.leaveMessage[i].images = data.leaveMessage[i].images.split(';');
						for(let j in data.leaveMessage[i].images){
							that.imageList.push(data.leaveMessage[i].images[j])
						}
					}
					that.item = data;
					for(let i in data.images){
						that.imageList.push(data.images[i])
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.leavemsg{
		padding: 0 35upx;
		.tit{
			padding: 54upx 20upx 40upx; font-size: 36upx; font-weight: bold;
		}
		.item{
			box-shadow:11upx -3upx 27upx 2upx rgba(189,217,214,0.4);
			border-radius:20upx;
			margin-bottom: 30upx;
			padding: 45upx 46upx 15upx;
			.item-top{
				margin-bottom: 6upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item-l{
					display: flex; align-items: center;
					image{
						width: 40upx;
						height: 40upx;
						margin-right: 30upx;
					}
					font-size: 30upx; font-weight: bold;
				}
				.item-time{
					color: #999; font-size: 26upx;
				}
			}
			.item-con{
				line-height: 44upx; font-size: 28upx;
				margin-bottom: 30upx;
			}
			.item-pics{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				image{
					width: 160upx; height: 160upx; margin-right:40upx;margin-bottom: 40upx;
					&:nth-child(3n){
						margin-right: 0;
					}
				}
			}
		}
	}
</style>
