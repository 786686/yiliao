<template>
	<view class="content">
		<view class="address-list">
			<!-- <view class="item">
				<image class="icon-address" src="../../static/a2_ic_g.png" mode=""></image>
				<view class="item-msg-in">
					<view class="item-top">
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
					<view class="item-address">
						详细地址详细地址详细地址详细地址详细地址详细地址
					</view>
				</view>
			</view> -->
			<empty v-if="items.length == 0"></empty>
		</view>
	</view>
</template>

<style lang="scss">
	.address-list {
		.item {
			margin: 40upx 25upx 30upx;
			box-shadow: 0 1px 22upx 4upx rgba(210, 210, 210, 0.4);
			border-radius: 20upx;
			display: flex;
			padding: 39upx 46upx;

			.icon-address {
				margin-top: 6upx;
				width: 32upx;
				height: 36upx;
				margin-right: 44upx;
			}

			.item-msg-in {
				flex: 1;

				.item-top {
					margin-bottom: 12upx;
					;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.item-l {
						display: flex;
						align-items: center;
					}

					.item-name {
						font-size: 40upx;
						color: #000;
						margin-right: 58upx;
						;
					}

					.item-phone {
						font-size: 32upx;
						color: #333;
					}

					image {
						width: 13upx;
						height: 24upx;
					}

				}

				.item-address {
					font-size: 28upx;
					line-height: 36upx;
				}

			}

		}
	}
</style>
<script>
	import empty from '../empty/empty.vue';
	export default {
		components: {
			empty
		},
		data() {
			return {
				items: []
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>
