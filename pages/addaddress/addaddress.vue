<template>
	<view class="content">
		<view class="inps">
			<view class="item">
				<view class="item-name">姓名</view>
				<input type="text" v-model="name" placeholder="请输入姓名">
			</view>
			<view class="item">
				<view class="item-name">手机号码</view>
				<input type="number" v-model="telephone" placeholder="请输入手机号码">
			</view>
			<view class="item">
				<view class="item-name">地址</view>
				<input type="text" v-model="address" placeholder="请输入地址">
			</view>
		</view>
		<view class="btn-save" @click="submit">
			提交
		</view>
	</view>
</template>
<style lang="scss">
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
				
				if(tools.isEmpty(this.name,"请输入就诊医院")){return;}
				if(tools.isEmpty(this.telephone,"请输入手机号码")){return;}
				if(tools.isEmpty(this.address,"请输入地址")){return;}
				
				
				let that = this;
				let params = {
					name: this.name,
					telephone: this.telephone,
					address: this.address,
					ifDefault: 1
				}
				tools.request("/api/my/addShippingAddress.json", params,1,true).then(function(data) {
					tools.toastJump("添加成功", "/pages/addresslist/addresslist");
				})
			}
		}
	}
</script>
