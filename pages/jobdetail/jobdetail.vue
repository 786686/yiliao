<template>
	<view class="content">
		<view class="job-item">
			<view class="btn-collect" @click="collect">
				<image :src="item.ifCollection==1?'../../static/c_ic_box_love_s.png':'../../static/c_ic_box_love.png'" mode=""></image>收藏该职位
			</view>
			<view class="item-top">
				<view class="item-name">{{item.positionName}}</view>
				<view class="item-pay">{{item.minPrice}}k-{{item.maxPrice}}k</view>
			</view>
			<view class="item-company">{{item.company}}</view>
			<view class="item-tags">
				<view class="tag-item">{{item.year}}年工作经验以上</view>
				<view class="tag-item">{{item.education}}</view>
			</view>
			<view class="item-phone">
				<image src="../../static/c_ic_li.png"></image>{{item.telephone}}
			</view>
			<view class="item-address">
				<image src="../../static/c_ic_phone.png"></image>
				<view class="item-address-in">
					{{item.address}}
				</view>
			</view>
			<view class="item-con">
				<view class="tit">工作内容</view>
				<view class="item-con-in">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				item: {},
				id: '',
				loginBool:false
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getDetail()
			}
				
			if(uni.getStorageSync("sessionId") != "" && uni.getStorageSync("sessionId") != null){
				this.loginBool = true;
			}
		},
		methods: {
			collect() {
				if (!this.loginBool) {
					uni.showModal({
						content: "需要登录才能收藏该推文，\n是否去登录",
						confirmText: "去登录",
						confirmColor: "#DD3535",
						cancelColor: "#999",
						success: function(res) {
							if (res.confirm) {
								tools.jumpTo("/pages/login/login")
							}
						}
					})
					return;
				}
				let that = this;
				let params = {
					typeId: this.id,
					type: 2,
					status: that.item.ifCollection == 1 ? 2 : 1
				};
				tools.request("/api/index/isCollection.json", params, 1, true).then(function(data) {
					if (that.item.ifCollection == 1) {
						tools.toast("已取消收藏");
					} else {
						tools.toast("已收藏");
					}
					
					that.item.ifCollection = that.item.ifCollection == 1 ? 2 : 1;
				})
			},
			getDetail() {
				let that = this;
				let params = {
					id: this.id
				};
				if(tools.isLogin()){
					params.sessionId = uni.getStorageSync("sessionId")
				}
				tools.request("/api/job/positionDetails.json", params).then(function(data) {
					that.item = data;
				})
			},

		}
	}
</script>

<style lang="scss">
	.job-item {
		position: relative;

		.btn-collect {
			background-color: #11C5A6;
			box-shadow: -1px 9upx 22upx 3upx rgba(17, 197, 166, 0.3);
			border-radius: 10upx;

			image {
				width: 34upx;
				height: 28upx;
				margin-right: 20upx;
			}

			position: absolute;
			left: 0;
			right: 0;
			margin: 0 auto;
			top: -44upx;
			width: 340upx;
			height: 88upx;
			line-height: 88upx;
			color: #fff;
			font-size: 30upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		padding: 103upx 40upx 50upx;
		background-color: #fff;
		box-shadow:1px 6upx 22upx 3upx rgba(218, 218, 218, 0.4);
		border-radius: 20upx;
		margin: 95upx 40upx 40upx;

		.item-top {
			margin-bottom: 20upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.item-name {
			font-size: 40upx;
			color: #333;
			font-weight: bold;
		}

		.item-pay {
			font-size: 34upx;
			color: #604EFF;
		}

		.item-company {
			margin-bottom: 27upx;
		}

		color: #666;
		font-size: 28upx;

		.item-tags {
			display: flex;
			flex-wrap: wrap;

			.tag-item {
				margin-bottom: 43upx;
				border-radius: 10upx;
				font-size: 24upx;
				color: #666;
				background-color: #F7F7F7;
				padding: 0 23upx;
				height: 50upx;
				line-height: 50upx;
				margin-right: 20upx;

				&:last-child {
					margin-right: 0;
				}
			}

		}

		.item-phone {
			margin-bottom: 24upx;
			font-size: 26upx;
			color: #333;
			display: flex;
			align-items: center;

			image {
				width: 24upx;
				height: 24upx;
				margin-right: 22upx;
			}
		}

		.item-address {
			display: flex;

			.item-address-in {
				flex: 1;
				line-height: 40upx;
			}

			margin-bottom: 62upx;

			image {
				width: 24upx;
				height: 24upx;
				margin: 8upx 24upx 0 1upx;
			}

			font-size: 26upx;
			color: #333;
			line-height: 40upx;
		}

		.item-con {
			.tit {
				line-height: 1;
				color: #333;
				font-weight: bold;
				font-size: 30upx;
				margin-bottom: 17upx;
			}

			.item-con-in {
				line-height: 50upx;
				font-size: 26upx;
				color: #666;
			}
		}
	}
</style>
