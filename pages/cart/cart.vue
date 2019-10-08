<template>
	<view class="content">
		<view class="card-list">
			<!-- <view class="item" v-for="(item,index) in cartList" :key="index"> -->
			<!-- <view class="item">
				<label class="checkbox">
					<checkbox checked />
				</label>
				<view class="goods-price-msg">
					<image src="../../static/logo.png" mode=""></image>
					<view class="goods-attr">
						<view class="item-top">
							<view class="item-name">
								Swisse 葡萄籽精华片 500g
							</view>
							<view class="item-standard">
								药品规格/单位
							</view>
						</view>
						<view class="item-bottom">
							<view class="other-price">
								<view class="item-price"><text class="item-price-dec">供货价</text>¥168.00</view>
								<view class="item-price"><text class="item-price-dec">puls会员价</text>¥168.00</view>
							</view>
							<view class="price-msg">
								<view class="item-price">
									<text class="item-price-dec">会员价</text>¥168.00
								</view>
								<view class="amount-inp">
									<view class="item-sub">-</view>
									<input type="text" value="1" />
									<view class="item-add">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="item">
				<label class="checkbox">
					<checkbox checked />
				</label>
				<view class="goods-price-msg">
					<image src="../../static/logo.png" mode=""></image>
					<view class="goods-attr">
						<view class="item-top">
							<view class="item-name">
								Swisse 葡萄籽精华片 500g
							</view>
							<view class="item-standard">
								药品规格/单位
							</view>
						</view>
						<view class="item-bottom">
							<view class="other-price">
								<view class="item-price"><text class="item-price-dec">供货价</text>¥168.00</view>
								<view class="item-price"><text class="item-price-dec">puls会员价</text>¥168.00</view>
							</view>
							<view class="price-msg">
								<view class="item-price">
									<text class="item-price-dec">会员价</text>¥168.00
								</view>
								<view class="amount-inp">
									<view class="item-sub">-</view>
									<input type="text" value="1" />
									<view class="item-add">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view> -->
			<empty v-if="cartList.length == 0"></empty>
			
		</view>
		<view class="confirm-bottom">
			<view class="item-l">
				<label class="checkbox">
					<checkbox value="" />
				</label>
				全部
			</view>
			<view class="item-r">
				<view class="total-price">
					<text class="item-price-dec">合计：</text><text class="item-unit">¥</text>0.00
				</view>
				<view class="btn-submit">
					结算（0）
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	.card-list{
		padding: 40upx 0;
		.item{
			margin-bottom: 42upx;
			display: flex;
			padding-right: 52upx;
			.goods-price-msg{ border-bottom: 0; flex: 1; padding-bottom: 0; 
			margin-bottom: 0;
			image{ margin-right: 30upx;}
			}
			.checkbox{
				width: 106upx;
				text-align: center;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
<script>
	const tools = require('../../common/tools.js');
	import empty from '../empty/empty.vue';
	export default {
		components:{
			empty
		},
		data() {
			return {
				cartList: []
			}
		},
		onLoad() {
			// this.getList();
		},
		methods: {
			getList(){
				let that = this;
				let params = {
					pageSize: 10,
					pageNumber: 1
				}
				tools.request("/api/drug/myCart.json", params,1,true).then(function(data) {
					that.cartList = data.myCartList;
				})
			}
		}
	}
</script>




				<!-- <image src="../../static/logo.png" mode=""></image>
				<view class="item-attr">
					<view class="item-top">
						<view class="name">
							{{item.description}}
						</view>
						<view class="company">
							上海皮皮鸭制药有限公司
						</view>
						<view class="standard">
							药品规格/单位
						</view>
						<view class="item-price">
							<view class="item-price"><text class="item-price-dec">供货价</text>¥{{item.purchasePrice}}</view>
							<view class="item-price"><text class="item-price-dec">puls会员价</text>¥{{item.plusPrice}}</view>
						</view>
					</view>
					<view class="item-bottom">
						<view class="mem-price">
							<text class="item-price-dec">会员价</text>¥{{item.memberPrice}}
						</view>
						<view class="amount-inp">
							<button type="primary">-</button>
							<input type="text" v-model="item.purchaseNum" />
							<button type="primary">+</button>
						</view>
					</view>
				</view> -->