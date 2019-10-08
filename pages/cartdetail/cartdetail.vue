<template>
	<view class="content">
		<view class="received-msg">
			<image src="../../static/logo.png" mode=""></image>
			<view class="received-msg-in">
				<view class="received-top">
					<view class="name">
						里空空
					</view>
					<view class="phone">
						13602739802
					</view>
					<image></image>
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
					<view class="name">
						Swisse 葡萄籽精华片 500g
					</view>
					<view class="company">
						上海皮皮鸭制药有限公司
					</view>
					<view class="standard">
						药品规格/单位
					</view>
					<view class="price-msg">
						<view class="price">
							¥168.00
						</view>
						<view class="amount-inp">
							<button type="primary">-</button>
							<input type="text" value="1" />
							<button type="primary">+</button>
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
				合计：¥168.00
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
	
</style>
