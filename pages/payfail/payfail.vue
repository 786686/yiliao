<template>
	<view class="content">
		<view class="pay-status">
			<image src="../../static/d5_ic_04.png" mode=""></image>
			付款失败
		</view>
		<view class="pay-btns">
			<view class="btn-item">
				重新支付
			</view>
		</view>
	</view>
</template>
<style lang="scss">
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
