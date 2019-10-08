<template>
	<view class="content">
		<view class="pay">
			<view class="item-top">需要支付<text class="item-price">¥168.00</text></view>
			<view class="tit">请选择支付方式</view>
			<view class="item-pay">
				<view class="item-l">微信</view>
				<label class="checkbox">
					<checkbox checked />
				</label>
			</view>
		</view>
		<view class="btn-save" @click="submit">
			提交
		</view>
	</view>
</template>
<style lang="scss">
	.pay{
		.item-top{
			padding: 0 25upx;
			font-size: 28upx;
			border-bottom: 1px solid #E6E6E6;
			line-height: 88upx;
			 }
		.item-price{ margin-left: 30upx; color: #DD3535}
		.tit{
			padding: 50upx 25upx 30upx;
			border-bottom: 1px solid #E6E6E6;
			font-size: 24upx; font-weight: bold;
		}
		.item-pay{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28upx;
			padding: 0 25upx; height: 88upx;
			border-bottom: 1px solid #E6E6E6;
		}
	}
	.inps{
		margin: 0 25upx;
		.item-name{ font-size: 34upx; font-weight: bold; color: #333; padding:50upx 15upx 10upx;}
		input{ padding: 30upx 17upx;}
		textarea{ padding: 30upx 17upx;}
		.item{border-bottom: 1px solid #E6E6E6;}
		.item-pay{ 
			.item-txt{ font-size: 30upx; color: #333; font-weight: bold;}
			display: flex; align-items: center;
			input{ flex: 1;}
		}
		.item-price{ margin-left: 30upx; color: #DD3535}
	}
</style>
<script>		
const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				telephone:"",
				name:"",
				address:""
			}
		},
		onLoad() {
		},
		methods: {
			submit(){
				let that = this;
				let params = {
					name: this.name,
					telephone: this.telephone,
					address: this.address,
					ifDefault: 1
				}
				tools.request("/api/my/addShippingAddress.json", params,1,true).then(function(data) {
					
				})
			}
		}
	}
</script>
