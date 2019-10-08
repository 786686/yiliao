<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="index-swiper">
			<swiper-item v-for="(i,index) in imgList" :key="index">
				<view class="swiper-item">
					<image :src="i" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="medicine-detail">
			<view class="item-price"><text class="item-unit">¥</text>{{chooseSku.purchasePrice}}</view>
			<view class="other-price">
				<view>会员价：<text class="item-unit">¥</text>{{chooseSku.memberPrice}}</view>
				<view>puls会员价：<text class="item-unit">¥</text>{{chooseSku.plusPrice}}</view>
			</view>
			<view class="item-name">{{item.name}}</view>
			<view class="attr-list">
				<view class="item">
					<view class="item-l">单位：{{item.unit}}</view>
					<view class="item-r">销量：{{item.salesVolume}}</view>
				</view>
				<view class="item">
					<view class="item-l">商品编号：{{item.commodityCode}}</view>
					<view class="item-r">使用时间：{{item.useTime}}</view>
				</view>
				<view class="item">
					<view class="item-l">生产厂家：{{item.manufacturer}}</view>
					<view class="item-r">库存：{{chooseSku.stock}}</view>
				</view>

				<view class="item">批准文号：{{item.commodityCode}}</view>
			</view>
		</view>

		<view class="detail-con">
			<view class="tit">药品说明书</view>
			<view class="dettail-con-in">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
		</view>
		<view class="h100"></view>
		<view class="join-cart" @click="onChangeCartShowState">加入购物车</view>

		<view v-if="showAddTOCart">
			<view class="popup-wrapper" @click="onChangeCartShowState"></view>
			<view class="popup-main popup-bottom">
				<view class="img-pl">
					<image :src="imgList[0]" mode="widthFix" />
				</view>
				<view class="p12">
					<view class="close pull-right" @click="onChangeCartShowState">×</view>
					<view class="spec-info">
						<view class="spec-name">{{item.name}}</view>
						<view class="spec-dec">已选择：{{chooseSku.description}}</view>
						<view class="spec-price"><text class="spec-unit">¥</text>{{chooseSku.purchasePrice}}</view>
					</view>
					<view class="spec-list">
						<view class='spec-item' :class="{active: index== current}" v-for="(i,index) in item.drugSpecificationDTOList"
						 :key="index" @click="onSpecTab(index)">
							{{i.description}}
						</view>
					</view>
					<view class="mb12 mt12">
						<view class="flex-panel">
							<view class="wx-text-grey">剩余：{{chooseSku.stock}}个</view>
							<view class="text-right">
								<view class="stepper">
									<!-- 减号 -->
									<view @click="bindMinus('sub')">-</view>
									<!-- 数值 -->
									<input type="number" v-model="amount" />
									<!-- 加号 -->
									<view @click="bindMinus('add')">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="h100"></view>
				<view class="join-cart" @click="addToCart">加入购物车</view>
			</view>
		</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	import htmlParser from '@/common/html-parser';
	export default {
		data() {
			return {
				id: "",
				item: {},
				imgList: [],
				htmlNodes: [],
				showAddTOCart: false,
				chooseSku: {},
				amount: 1,
				current: 0
			}
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
				this.getDetail();
			}
		},
		methods: {
			onSpecTab(index) {
				this.current = index;
				this.chooseSku = this.item.drugSpecificationDTOList[index];
			},
			onChangeCartShowState: function() {
				this.showAddTOCart = !this.showAddTOCart;
			},
			addToCart() {
				uni.showModal({
					content: "该药物请到实体店购买哦",
					confirmText: "知道了",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {}
					}
				})
				return;
				let that = this;
				let params = {
					specificationId: "3",
					purchaseNum: "3",
				};
				tools.request("/api/drug/addShoppingCart.json", params, 1, true).then(function(data) {
					tools.toastJump("加入购物车成功","/pages/cart/cart");
				})
			},
			getDetail() {
				let that = this;
				let params = {
					id: that.id
				};

				tools.request("/api/drug/drugDetail.json", params).then(function(data) {
					that.item = data;
					that.imgList = that.item.images.split(';');
					
					let htmlString = that.item.drugInstructions.replace(/\\/g, "").replace(/article/g, "div").replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');;
					that.htmlNodes = htmlParser(htmlString);
					that.chooseSku = that.item.drugSpecificationDTOList[0];
				})
			},
			recommendDetail(id) {
				uni.navigateTo({
					url: "/pages/medicinedetail/medicinedetail?id=" + id
				})
			},
			// 加减
			bindMinus: function(type) {
				//减法
				if (type == "sub") {
					if (this.amount > 1) {
						this.amount--;
					} else {
						this.amount = 1;
					}
				} else {
					//加法
					this.amount++;
				}
			}
		}
	}
</script>


<style lang="scss">
	view {
		line-height: 1;
	}

.dettail-con-in{
	image{ width: 100%;}
	img{ width: 100%;}
}
	.spec-info {
		margin-top: 30upx;
		margin-left: 250upx;
		line-height: 1.4;

		.spec-name {
			font-size: 36upx;
			color: 3333;
		}

		.spec-dec {
			font-size: 30upx;
			color: #999;
			margin: 25upx 0 20upx;
		}

		.spec-price {
			color: #ff613c;
			font-size: 30upx;
			font-weight: bold;

			.spec-unit {
				font-size: 32upx;
			}
		}
	}

	.spec-list {
		margin: 40upx 24upx;
		display: flex;
		font-size: 30upx;
		color: #333;

		.spec-item {
			border-radius: 6upx;
			margin: 0 24upx 16upx 0;
			padding: 16upx 28upx;
			background-color: #f7f7f7;
			&.active{
			background-color: #604EFF;
				color: #fff;
			}
		}
	}

	.pull-right {
		float: right;
	}

	.view_show {
		display: block;
	}

	.other-price {
		display: flex;
		justify-content: space-between;
		color: #000;
		font-weight: bold;
		margin-bottom: 21upx;
		font-size: 40upx;
	}


	.swiper-item {
		image {
			width: 100%;
			display: block;
		}
	}

	.medicine-detail {
		margin: 44upx 40upx;
		background-color: #fff;
		box-shadow: 9upx -2upx 29upx 3upx rgba(223, 226, 226, 0.4);
		border-radius: 20upx;
		padding: 40upx 40upx 40upx;

		.item-price {
			color: #000;
			font-weight: bold;
			margin-bottom: 21upx;
			font-size: 50upx;

			.item-unit {
				font-size: 40upx;
			}
		}

		.item-name {
			color: #333;
			font-size: 30upx;
			font-weight: bold;
			margin-bottom: 40upx;
		}

		.attr-list {
			.item {
				margin-bottom: 37upx;
				color: #999;
				font-size: 24upx;
				display: flex;

				.item-l {
					flex: 1;
				}

				.item-r {
					width: 197upx;
				}

				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	}

	.detail-con {
		.tit {
			font-size: 34upx;
			color: #333;
			font-weight: bold;
			margin-bottom: 36upx;
			line-height: 1;
		}

		margin: 31upx 40upx 44upx;
		background-color: #fff;
		box-shadow: 9upx -2upx 29upx 3upx rgba(223, 226, 226, 0.4);
		border-radius: 20upx;
		padding: 50upx 40upx;
		line-height: 46upx;
		font-size: 28upx;

		image {
			width: 100%;
		}
	}

	.h100 {
		height: 100upx;
	}

	.join-cart {
		z-index: 4;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100upx;
		text-align: center;
		font-size: 32upx;
		color: #fff;
		background-color: #604EFF;
		line-height: 100upx;
	}

	.popup-wrapper {
		background: rgba(0, 0, 0, 0.4);
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		position: fixed;
		overflow: auto;
		margin: 0;
		z-index: 3;
		animation: fadein 0.5s;
	}

	.popup-bottom {
		background-color: rgb(255, 255, 255);
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		box-shadow: rgba(0, 0, 0, 0.270588) 0px -4upx 40upx 0px;
		flex-direction: column;
		z-index: 200;
		animation: moveup 0.4s ease;
	}

	.img-pl {
		position: absolute;
		top: -30upx;
		left: 24upx;
		padding: 2upx;
		border-radius: 6upx;
		background: white;
		box-shadow: 0 2upx 12upx rgba(0, 0, 0, 0.07);
	}

	.img-pl image {
		border-radius: 4upx;
		width: 200upx;
		height: 200upx;
		display: block;
	}

	.close {
		width: 24px;
		height: 24px;
		margin-right: 10px;
		position: absolute;
		right: 0;
		top: 12px;
	}

	.pull-right {
		float: right;
	}

	.addcart-info {
		margin-left: 110px;
	}

	.flex-panel {
		padding: 0 24upx;
		display: flex;
		justify-content: space-between;
		font-size: 30upx;
		color: #999;
	}


	.stepper {
		width: 224upx;
		border: 1px solid #ccc;
		border-radius: 6upx;
		display: flex;
		margin-bottom: 40upx;
	}

	.stepper view {
		width: 70upx;
		line-height: 60upx;
		text-align: center;
		color: #333;
	}

	.stepper input {
		flex: 1;
		height: 60upx;
		float: left;
		margin: 0 auto;
		text-align: center;
		font-size: 30px;
		border-left: 1px solid #ccc;
		border-right: 1px solid #ccc;
		line-height: 60upx;
		color: #333;
		font-size: 30upx;
		font-family: -apple-system-font, "Microsoft YaHei";
	}
</style>
