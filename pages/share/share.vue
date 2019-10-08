<template>
	<view class="content">
		<view class="item-theme">联盟为中小门诊保驾护航</view>
		<view class="item-tips">长按识别小程序 了解更多详情</view>
		<view class="btn">
			<image src="../../static/logo.png"></image>名医汇门诊
		</view>
		<view class="item-dec">			
		
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
		/* align-items: center; */
		/* justify-content: center; */
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
