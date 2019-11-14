<template>
	<view class="content">
		<view class="doctor">
			<view class="item">
				<view class="item-in">
					<view class="item-name">
						{{item.name}}
					</view>
					<view class="item-company">
						{{item.address}}
					</view>
					<view class="item-attr">
						<view class="item-m">服务人次：{{item.servicesNum}}</view>
					</view>
				</view>
				<!-- <view class="item-love">
					<image src="../../static/a4_ic_love_g.png" mode=""></image>
					{{item.attention}}
				</view> -->
			</view>
			<view class="item-msg">
				<view class="tit">简介：</view>
				<view class="item-msg-in">
					{{item.intro}}
				</view>
			</view>
		</view>
		<view class="doctor-list">
			<view class="item" v-for="i in hospitalDoctorDTO" @click="detail(i.id)" :key="i">
				<image :src="i.avatar" mode="" class="icon-avatar"></image>
				<view class="item-in">
					<view class="item-name">
						{{i.name}}
						<image :src="i.sexString=='男'?'../../static/a5_ic_m.png':''" mode=""></image>
					</view>
					<view class="item-attr">
						<view class="item-l">{{i.doctorLevel}}</view>
						<view class="item-m">服务人次：{{i.servicesNum}}</view>
						<view class="item-r">{{i.age}}岁</view>
					</view>
				</view>
				<view class="item-love">
					<image src="../../static/a4_ic_love_g.png" mode=""></image>
					{{i.attention}}
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
				hospitalDoctorDTO: [],
				timer: null,
				pageNumber: 1,
				hasData: true
			}
		},

		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getDetail()
			}
		},
		
		
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getDetail();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			if (this.timer != null) {
				clearTimeout(this.timer);
			}
			let that = this;
			this.timer = setTimeout(function() {
				that.getDetail();
			}, 1000);
		},
		methods: {
			detail(id) {
				tools.jumpTo("/pages/doctor/doctor?id=" + id)
			},

			getDetail() {

				let that = this;
				if (!that.hasData) {
					return false;
				}
				uni.showNavigationBarLoading();

				let params = {
					id: that.id,
					pageSize: 10,
					pageNumber: this.pageNumber
				};
				tools.request("/api/index/hospitalDetail.json", params).then(function(data) {
					that.item = data;

					if (that.item.hospitalDoctorDTO.length == 0) { //没有数据
						that.hasData = false;
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					}
					that.hospitalDoctorDTO = that.hospitalDoctorDTO.concat(that.item.hospitalDoctorDTO);
					that.pageNumber++; //每触底一次 page +1
					uni.hideNavigationBarLoading(); //关闭加载动画



				})
			},
		}
	}
</script>

<style lang="scss">
	.doctor {
		background: url("../../static/a5_bg.png") no-repeat;
		background-size: 100% 583upx;

		.item-msg-in {
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

			color:#fff;
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

	.doctor-list {
		margin-top: 60upx;

		.item {
			margin: 0 35upx 30upx;
			background-color: #fff;
			box-shadow: 1px 4upx 19upx 2upx rgba(214, 214, 214, 0.3);
			border-radius: 20upx;
			padding: 50upx 0 50upx 40upx;
			display: flex;

			.icon-avatar {
				width: 160upx;
				height: 160upx;
				margin-right: 30upx;
			}

			color: #333;
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
