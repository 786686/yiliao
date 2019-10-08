<template>
	<view class="content">
		<view class="received-msg">
			<image class="icon-address" src="../../static/logo.png" mode=""></image>
			<view class="received-msg-in">
				<view class="received-top">
					<view class="item-l">
						<view class="item-name">
							里空空
						</view>
						<view class="item-phone">
							13602739802
						</view>
					</view>
					<image src="../../static/a2_icon_more_g.png"></image>
				</view>
				<view class="received-address">
					详细地址详细地址详细地址详细地址详细地址详细地址
				</view>
			</view>
		</view>
		<view class="confirm-msg">
			<view class="goods-price-msg">
				<image src="../../static/logo.png" mode=""></image>
				<view class="goods-attr">
					<view class="item-top">
						<view class="item-name">
							Swisse 葡萄籽精华片 500g
						</view>
						<view class="item-company">
							上海皮皮鸭制药有限公司
						</view>
						<view class="item-standard">
							药品规格/单位
						</view>
					</view>
					<view class="price-msg">
						<view class="item-price">
							¥168.00
						</view>
						<view class="amount-inp">
							<view class="item-sub">-</view>
							<input type="text" value="1" />
							<view class="item-add">+</view>
						</view>
					</view>
				</view>
			</view>
			<view class="card-msg">
				购买者身份证号码：430422200010100000
			</view>
			<view class="goods-computed">
				<view class="item">
					<view class="item-l">商品总价</view>
					<view class="item-r">￥6990.00</view>
				</view>
				<view class="item">
					<view class="item-l">运费</view>
					<view class="item-r">￥6990.00</view>
				</view>
				<view class="item">
					<view class="item-l">会员支付金额</view>
					<view class="item-r">￥6990.00</view>
				</view>
				<view class="item">
					<view class="item-l">非会员支付金额</view>
					<view class="item-r">￥6990.00</view>
				</view>
				<view class="item">
					<view class="item-l">总计</view>
					<view class="item-r total-price">￥6990.00</view>
				</view>
			</view>
		</view>
		<view class="confirm-bottom">
			<view class="total-price">
				合计：<text class="item-price"><text class="item-unit">¥</text>168.00</text>
			</view>
			<view class="btn-submit">
				提交订单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	view{ line-height: 1;}
	.received-msg{
		margin: 40upx 25upx 30upx;
		box-shadow:0 1px 22upx 4upx rgba(210,210,210,0.4);
		border-radius:20upx;
		display: flex;
		padding: 39upx 46upx;
		.icon-address{ margin-top: 6upx; width: 32upx; height: 36upx; margin-right: 44upx;}
		.received-msg-in{ flex: 1;
			.received-top{ 
				margin-bottom: 12upx;;
				display: flex; align-items: center;
				justify-content: space-between;
				.item-l{ display: flex;align-items: center;}
			.item-name{ font-size: 40upx; color: #000; margin-right: 58upx;;}
			.item-phone{ font-size: 32upx; color: #333;}
			image{ width: 13upx; height: 24upx;}
			
			}
			.received-address{ font-size: 28upx; line-height: 36upx;}
			
		}
	}
</style>
