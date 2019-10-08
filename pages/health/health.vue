<template>
	<view class="content">
		<view class="detail">
			<view class="tit">{{item.title}}</view>
			<view class="item-time">{{item.createTimeString}}</view>
			<view class="detail-msg">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
		</view>
		<image :src="collectStatus==1?'../../static/a4_ic_love_g.png':'../../static/a4_ic_love.png'" mode="" class="icon-collect" @click="collect"></image>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				id: "",
				loginBool:false,
				item:{},
				collectStatus:2,
				strings:"",
				htmlNodes:[]
			}
		},
		onLoad(options) {
			if(uni.getStorageSync("sessionId") != "" && uni.getStorageSync("sessionId") != null){
				this.loginBool = true;
			}
			if(options.id){
				this.id = options.id;
				this.getDetail()
			}
		},
		methods: {
			collect(){
				if(!this.loginBool){
					uni.showModal({
						content:"需要登录才能收藏该推文，\n是否去登录",
						confirmText:"去登录",
						confirmColor:"#DD3535",
						cancelColor:"#999",
						success:function(res){
							if (res.confirm) {
								uni.navigateTo({
									url:"/pages/login/login"
								})
							} 
						}
					})
					return;
				}
				let that = this;
				let params = { 
					typeId:this.id,
					type:3,
					status:this.collectStatus==1 ? 2 : 1
				};
				tools.request("/api/index/isCollection.json", params,1,true).then(function(data) {
					if(that.collectStatus==1){
						tools.toast("取消收藏");
					}else{
						tools.toast("已收藏");
					}
					that.collectStatus = that.collectStatus==1 ? 2 : 1;
				})
			},
			getDetail(){
				let that = this;
				let params = { 
					id:this.id
				};
				tools.request("/api/index/articleDetail.json", params,1,this.loginBool).then(function(data) {
					that.item = data;
					// that.strings = data.content;
					
					let htmlString = data.content.replace(/\\/g, "").replace(/article/g, "div").replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');;
					that.htmlNodes = htmlParser(htmlString);
					
					
					that.collectStatus = data.ifCollection;
					console.log(that.collectStatus)
				});
			}
		}
	}
</script>

<style lang="scss">
	.detail{ 
		width: 100%;
		padding: 42upx 42upx;
		.tit{ 
			margin-bottom: 16upx; 
			line-height: 42upx; 
			color: #333; 
			font-size: 34upx; font-weight: bold;
		}
		.item-time{ font-size: 30upx; color: #999; margin-bottom: 30upx;}
		.detail-msg{
			image{ width: 100%;}
			img{ width: 100%;}
			line-height: 50upx; font-size: 30upx; color: #666;
			image.icon-collect{
				// width: 34upx; height: 28upx; display: block; margin: 50upx auto;
			}
			
			image.icon-collect{
				position: fixed;
				margin: 0 auto;
				bottom: 30upx;
				left: 0; right: 0; 
				width: 102upx; height: 84upx;
			}
		}
	}	
	
		.icon-collect{
			position: fixed;
			margin: 0 auto;
			bottom: 30upx;
			left: 0; right: 0; 
			width: 102upx; height: 84upx;
		}
</style>