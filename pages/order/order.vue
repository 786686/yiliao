<template>
	<view class="content">
		<view class="nav-join">
			<view class="item" :class="{cur: type == 1}" @click="nav(1)">全部</view>
			<view class="item" :class="{cur: type == 2}" @click="nav(2)">待付款</view>
			<view class="item" :class="{cur: type == 3}" @click="nav(3)">待发货</view>
			<view class="item" :class="{cur: type == 4}" @click="nav(4)">待收货</view>
		</view>
		<view class="order-list">
			<!-- <view style="text-align: center; margin-top: 50upx">暂无数据</view> -->
			<!-- <view class="item">
				<view class="item-top">
					<view class="item-no">订单号：1312132123</view>
					<view class="item-stauts">代付款</view>
				</view>
				<view class="item-goods">
					<view class="item-good">
						<image src="../../static/logo.png" mode=""></image>
						<view class="item-attr">
							<view class="item-msg">
								<view class="item-name">
									Swisse 葡萄籽精华片 500g
								</view>
								<view class="item-company">
									上海皮皮鸭制药有限公司
								</view>
								<view class="item-amount">
									<view class="item-num">数量：200</view>
								</view>
							</view>
					
							<view class="item-price">
								零售价<view class="item-price-dec"><view class="item-unit">¥</view>168.00</view>
							</view>
						</view>
					</view>
					<view class="item-good">
						<image src="../../static/logo.png" mode=""></image>
						<view class="item-attr">
							<view class="item-msg">
								<view class="item-name">
									Swisse 葡萄籽精华片 500g
								</view>
								<view class="item-company">
									上海皮皮鸭制药有限公司
								</view>
								<view class="item-amount">
									<view class="item-num">数量：200</view>
								</view>
							</view>
					
							<view class="item-price">
								零售价<view class="item-price-dec"><view class="item-unit">¥</view>168.00</view>
							</view>
						</view>
					</view>
				</view>
				<view class="item-total">
					<text class="item-total-dec">共2件商品 总计¥</text>100.00
				</view>
				<view class="btns"> -->
					<!-- 待付款 -->
					<!-- <view class="btn">
						取消订单
					</view>
					<view class="btn">
						支付
					</view> -->
					
					<!-- 待发货 -->
					<!-- <view class="btn">
						提醒发货
					</view> -->
				
					<!-- 待收货 -->
					<!-- <view class="btn">
						查看物流
					</view>
					<view class="btn">
						确认收货
					</view> -->
					
					<!-- 交易完成 -->
					<!-- <view class="btn">
						查看物流
					</view> -->
				<!-- </view>
			</view>
		</view> -->
		<empty v-if="items.length == 0"></empty>
	</view>
	</view>
</template>

<style lang="scss">
	.order-list{
		.item{
			
				box-shadow:-7upx 11upx 34upx 6upx rgba(210,210,210,0.4);
				border-radius:20upx;
			padding: 0 40upx 53upx;
		margin: 0 25upx 30upx;
			.item-top{
				display: flex;
				justify-content: space-between;
				padding: 52upx 0 29upx;
				align-items: center;
				border-bottom: 1px solid #E6E6E6;
				font-size: 30upx;
				.item-no{font-weight: bolder;}
				.item-stauts{ font-weight: bold;color: #604EFF;}
			}
			.item-total{
				margin: 40upx 0 30upx;
				font-size: 30upx; display: flex;
				justify-content: flex-end;
				align-items: baseline;
				 color: #333; font-weight: bold;
				.item-total-dec{ font-size: 24upx; font-weight: normal;}
			}
			.item-goods{
				
				padding: 40upx 0;
				border-bottom: 1px solid #E6E6E6;
				.item-good{
					margin-bottom: 30upx;
					display: flex;
					image{
						width: 216upx; height: 216upx; margin-right: 40upx;
					}
					.item-attr{
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.item-num{ font-size: 22upx; color: #999;}
						.item-msg{
							color: #333;
							.item-name{padding: 6upx 0 10upx;font-size: 28upx; line-height: 38upx;
							font-size: 28upx; line-height: 38upx;
							}
							.item-company{
								font-size: 26upx; margin-bottom: 20upx;
							}
						}
						
							
					}
					
					
					&:last-child{margin-bottom: 0;}
					
					.item-price{
						
						display: flex; align-items: center;
						margin-bottom: 18upx;font-size: 20upx;
						
						.item-price-dec{ font-weight: bold; display: flex; align-items: center; margin-left: 17upx; font-size: 26upx; color: #DD3535;
						.item-unit{ font-size: 22upx;color: #DD3535;}
						}
					}
				}
				
				}
		}	
	}
	.nav-join{ 
		display: flex;  justify-content: space-between;
		padding:  40upx 50upx 40upx;
	}
	
</style>

<script>
	import empty from '../empty/empty.vue';
	export default {
		components:{
			empty
		},
		data() {
			return {
				type:1,
				items:[]
			}
		},
		onLoad(options) {
			if(options.type){
				this.type = options.type;
			}
		},
		methods: {
			nav(type){
				this.type = type;
			},
		}
	}
</script>