<template>
	<view class="content">
		<view class="list">
			<view class="item">
				<image src="../../static/logo.png"></image>
				<view class="item-in">
					<view class="name">分类名称</view>
					<view class="attr">
						<view class="attr-in">库存：200</view>
						<view class="attr-in">180片/瓶</view>
					</view>
					<view class="price-out">
						<view class="price"><text class="price-dec">会员价</text></view>
						<view class="origin-price">
							<view class="sale-price">
								<text class="price-dec">零售价</text>￥168.00
							</view>
							<view class="sale-price">
								<text class="price-dec">零售价</text>￥168.00
							</view>
						</view>
					</view>
				</view>
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
	.content {
		display: flex;
		flex-direction: column;
	}
</style>