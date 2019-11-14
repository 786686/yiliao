<template>
	<view class="content">
		<view class="pop-setion-in">
			<view class="setion-list">
				<view class="list-item" v-for="(item,index) in typeList" :class="{cur: classificationId == item.id}" @click="type(item.id)" :key="index">{{item.name}}</view>
			</view>
			<view class="shop-list">
				<view class="item" v-for="(item,index) in goodsList" @click="detail(item.id)" :key="index">
					<image :src="item.images"></image>
					<view class="item-in">
						<view class="item-in-in">
							<view class="item-name">{{item.name}}</view>
							<!-- <view class="item-company">分类名称</view> -->
						</view>
						<view class="item-price"><text class="iten-unit">¥</text>{{item.retailPrice}}</view>
					</view>
				</view>
				<empty v-if="goodsList.length == 0"></empty>

			</view>
		</view>
	</view>
</template>

<script>
	import search from '../headsearch/headsearch.vue'
	const tools = require('../../common/tools.js');
	import empty from '../empty/empty.vue';
	export default {
		components: {
			search,
			empty
		},
		data() {
			return {
				typeList: [],
				classificationId: "",
				goodsList: [],

				timer: null,
				pageNumber: 1,
				hasData: true

			}
		},
		onLoad() {
			this.getTypeList()
		},
		
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getList();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			if (this.timer != null) {
				clearTimeout(this.timer);
			}
			let that = this;
			this.timer = setTimeout(function() {
				that.getList();
			}, 1000);
		},
		methods: {
			detail(id) {
				tools.jumpTo("/pages/medicinedetail/medicinedetail?id=" + id)
			},
			type(id) {
				this.classificationId = id;
				this.goodsList = [];
				this.pageNumber = 1;
				this.hasData = true;
				this.getList();
			},
			getTypeList() {
				let that = this;
				tools.request("/api/drug/classificationList.json", {}).then(function(data) {
					that.typeList = data.classificationList;
					that.classificationId = data.classificationList[0].id;
					that.getList();
				})
			},
			getList() {
				let that = this;
				if (!that.hasData) {
					return false;
				}
				uni.showNavigationBarLoading();

				let params = {
					classificationId: this.classificationId,
					pageSize: 10,
					pageNumber: this.pageNumber
				}
				tools.request("/api/drug/drugList.json", params).then(function(data) {
					if (data.drugList.length == 0) { //没有数据
						that.hasData = false;
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					}
					that.goodsList = that.goodsList.concat(data.drugList);
					that.pageNumber++; //每触底一次 page +1
					uni.hideNavigationBarLoading(); //关闭加载动画
				})
			},

		}
	}
</script>

<style lang="scss">
	.pop-setion-in {
		margin: 0 35upx;
	}

	.shop-list {
		// display: flex; flex-wrap: wrap;
		margin: 40upx 0 40upx 30upx;
		flex: 1;

		.item {
			margin-bottom: 40upx;
			font-size: 26upx;
			color: #333;
			display: flex;

			image {
				width: 200upx;
				height: 200upx;
				margin-right: 20upx;
			}

			.item-in {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.item-name {
					padding: 7upx 0 11upx;
					line-height: 38upx;
					font-size: 28upx;
					font-weight: bold;
					color: #333;
				}

				.item-company {
					font-size: 26upx;
					color: #333;
				}

				.item-price {
					color: #DD3535;
					font-weight: bold;
					font-size: 26upx;
					margin-bottom: 20upx;

					.item-unit {
						font-size: 22upx;
					}
				}
			}

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
