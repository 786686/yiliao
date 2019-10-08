<template>
	<view class="content">
		<div class="empty">
			<image src="../../static/empty_box.png"></image>
			空空如也
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.empty{
		padding-top: 50upx;
		image{ width: 220upx; height: 220upx; display: block; margin: 0 auto 50upx;}
		font-size: 30upx; color: #999; text-align: center;
		
		}
</style>
