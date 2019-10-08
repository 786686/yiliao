<template>
	<view class="content">
		<view class="order-top">
			<view class="item-status">待付款</view>
			<view class="item-time">剩2小时59分自动关闭</view>
		</view>
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
						</view>
					</view>
					<!-- <view class="price-msg">
						<view class="item-price">
							<view class="item-l"><text class="item-price-dec">供货价</text>¥168.00</view>
							<view class="item-r"><text class="item-price-dec">puls会员价</text>¥168.00</view>							
						</view>
						<view class="item-price">
							<view class="item-l"><text class="item-price-dec">会员价</text>¥168.00</view>
						</view>
					</view> -->
				</view>
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
					<view class="item-l">优惠金额</view>
					<view class="item-r">￥6990.00</view>
				</view>
				<!-- 待定不知道要不要展示出来 -->
				<!-- <view class="item">
					<view class="item-l">puls会员支付金额</view>
					<view class="item-r">￥6990.00</view>
				</view>
				<view class="item">
					<view class="item-l">会员支付金额</view>
					<view class="item-r">￥6990.00</view>
				</view>
				<view class="item">
					<view class="item-l">非会员支付金额</view>
					<view class="item-r">￥6990.00</view>
				</view> -->
				<view class="item">
					<view class="item-l">总计</view>
					<view class="item-r total-price">￥6990.00</view>
				</view>
			</view>
		</view>
		<view class="order-bottom">
			<view class="tit">订单信息</view>
			<view class="item-msg">
				<view class="item-dec">订单号</view>
				<view class="item-data">88888<view class="btn-copy">复制</view></view>
			</view>
			<view class="item-msg">
				<view class="item-dec">创建时间</view>
				<view class="item-data">2020-12-31 23:23:59</view>
			</view>
			<view class="btns">
				<!-- 待付款 -->
				<view class="btn">
					取消订单
				</view>
				<view class="btn">
					支付
				</view>
				
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
			</view>
		</view>
	</view>
</template>

<style lang="scss">
	view{ line-height: 1;}
	.order-bottom{
		padding: 25upx;
		.tit{
			margin-bottom: 30upx;
			padding-left: 30upx;font-size: 30upx; font-weight: bold; position: relative;
			&:after{
				position: absolute;
				content:""; width: 8upx; height: 30upx; left: 0; top: 0; bottom: 0; margin: auto 0; background-color: #604EFF;
			}
		}
		.item-msg{
			margin-bottom: 20upx;
			display: flex;
			align-items: center;
			.item-dec{
				font-size: 28upx;
				width: 150upx; color: #999;
			}
			.item-data{
				font-size: 28upx;
				color: #333;
				flex: 1;
				display: flex;
				justify-content: space-between; 
				align-items: center;
				.btn-copy{
					padding: 10upx 20upx; border-radius: 8upx;border: 1px solid #e6e6e6;
				}
			}
		}
	}
	
	
	.order-top{
		padding: 39upx 46upx;
		font-size: 30upx;
		// height: 76upx;
		background-color: #fff;
		margin: 25upx 25upx 30upx;
		box-shadow:0 1px 22upx 4upx rgba(210,210,210,0.4);
		.item-status,.item-time{ line-height: 40upx;}
		}
	
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
	
	.confirm-bottom{
		background-color: #fff;
		position: fixed; bottom: 0; left: 0; right: 0; height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.total-price{ margin-left: 40upx; font-size: 24upx; color: #333;}
	
	.item-price{ font-size: 26upx; font-weight: bold; color: #DD3535;}
	.item-unit{ font-size: 22upx;}
	.btn-submit{ width: 218upx; color: #fff; background-color: #604EFF; text-align: center; line-height: 100upx; font-size: 32upx;}
	}
</style>

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
