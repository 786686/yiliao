<template>
	<view class="content">
		<view class="doctor">
			<view class="item">
				<image :src="item.avatar" mode="" class="icon-avatar"></image>
				<view class="item-in">
					<view class="item-name">
						{{item.name}}<image :src="item.sexString=='男'?'../../static/a5_ic_m.png':''" mode=""></image>
					</view>
					<view class="item-company">
						{{item.hospital}}
						<!-- /妇科 -->
					</view>
					<view class="item-attr">
						<view class="item-l">{{item.doctorLevel}}</view>
						<view class="item-m">服务人次：{{item.servicesNum}}</view>
						<view class="item-r">{{item.age}}岁</view>
					</view>
				</view>
				<view class="item-love">
					<image src="../../static/a4_ic_love_g.png" mode=""></image>
					{{item.attention}}
				</view>
			</view>

			<!-- <view class="item-msg">
				<view class="tit">擅长</view>
				<view class="item-msg-in">
					文本描述文本描述文本描述文本描述文本描述文本
				</view>
			</view>
			<view class="item-msg">
				<view class="tit">获得荣誉：</view>
				<view class="item-msg-in">
					文本描述文本描述文本描述文本描述文本描述文本
				</view>
			</view> -->
			<view class="item-msg">
				<view class="tit">简介：</view>
				<view class="item-msg-in">
					{{item.intro}}
				</view>
			</view>
			<!-- <view class="ask-condition">
				<image src="../../imagse/" mode=""></image>
				<view class="tit">询问病情</view>
				<view class="btn-ask">留言咨询</view>
			</view> -->
		</view>
			<view class="btn-save" @click="leaveMsg">留言咨询</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	const server = require('../../common/server.js');
	export default {
		data() {
			return {
				item: {},
				server: server.domain
			}
		},
		
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getDetail()
			}
			// this.id = 1;
			// this.getDetail()
		},
		methods: {
			leaveMsg(){
				
				if(uni.getStorageSync("sessionId") != "" && uni.getStorageSync("sessionId") != null){
					let that = this;
					tools.request("/api/index/judgeIsUpdateUserInfo.json", {},1,true).then(function(data) {
						if(data.isFill == 1){
							tools.jumpTo("/pages/leavemsg/leavemsg");
						}else{
							tools.toastJump("未填写个人信息", "/pages/personmsg/personmsg");
							
						}
					})
				}else{				
					uni.showModal({
						content: "需要登录才能留言咨询",
						confirmText: "去登录",
						success: function(res) {
							if (res.confirm) {
								
								tools.jumpTo("/pages/login/login");
							}
						}
					})
				}
			},
			getDetail() {
				let that = this;
				let params = {
					id: that.id
				};
				tools.request("/api/index/doctorsDetails.json", params).then(function(data) {
					that.item = data;
				})
			},
		}
	}
</script>

<style lang="scss">
	
	.doctor {
		background: url("../../static/a5_bg.png") no-repeat;
		background-size: 100% 583upx;

			.item-msg-in{
				line-height: 36upx;
			}

		.item {
			padding: 50upx 0 50upx 40upx;
			display: flex;

			.icon-avatar {
				width: 160upx;
				height: 160upx;
				margin-right: 30upx;
			}

			color: #fff;
			font-size: 26upx;

			.item-in {
				flex: 1;
			}
			.item-love {

				font-size: 26upx;
				color: #0DBAA8;
				background-color: #fff;
				border-top-left-radius: 32upx;
				border-bottom-left-radius: 32upx;
				padding-right: 36upx;
				height: 64upx;
				display: flex;
				align-items: center;

				image {
					width: 28upx;
					height: 23upx;
					margin: 0 10upx 0 27upx;
				}
			}

			.item-name {
				display: flex;
				align-items: center;

				image {
					margin-left: 17upx;
					width: 28upx;
					height: 28upx;
				}

				font-size: 40upx;
				font-weight: bold;
				margin: 10upx 0 47upx;
			}

			.item-company {
				margin-bottom: 15upx;
			}

			.item-attr {
				display: flex;
				justify-content: space-between;
			}
		}

		.item-msg {
			margin: 0 35upx;
			background-color: #fff;
			;
			box-shadow: 8upx 12upx 27upx 2upx rgba(189, 217, 214, 0.4);
			border-radius: 20upx;
			padding: 0 45upx 30upx;

			.tit {
				padding: 50upx 7upx 10upx;
				font-size: 30upx;
				font-weight: bold;
				color: #333;
			}

			line-height: 44upx;
			font-size: 28upx;
			color: #999;
		}
	}
</style>
