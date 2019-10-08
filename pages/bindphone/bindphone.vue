<template>
	<view class="content">
		<view @click="toIndex" class="to-index">跳过，直接进入首页</view>
		<view class="bind-inp">
			<input type="text" v-model="phone" placeholder="请输入手机号码">
			<view class="btn-code" @click="getCode">获取短信验证码</view>
		</view>
		<view class="bind-inp">
			<input type="text" placeholder="请输入验证码" v-model="code">
		</view>
		<view class="btn-save" @click="submit">提交</view>
	</view>
</template>

<style lang="scss">
	.btn-code{
		border-radius: 10upx;
		padding: 0 10upx; height: 64upx; margin-left: 30upx;
		line-height: 60upx; text-align: center; font-size: 30upx; 
		border: 2upx solid #604EFF; 
		background-color: #fFF; color: #604EFF;
	}
	.to-index{ font-size: 30upx; margin-right: 35upx; padding: 20upx 0; color: #604EFF; text-align: right;}
	.bind-inp{
		font-size: 30upx;
		margin: 0 35upx;
		height: 96upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #e6e6e6;
		input{ font-size: 30upx;}
	}
</style>
<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				phone: "",
				code: ""
			}
		},
		methods: {
			toIndex(){
				tools.jumpToTab("/pages/index/index")
			},
			getCode() {
				if(tools.isEmpty(this.phone,"请输入手机号")){return;}

				let params = {
					sessionId: uni.getStorageSync("sessionId"),
					phone: this.phone
				};
				tools.request("/api/login/getBindingCode.json", params).then(function(data) {
					console.log(data)
					uni.showToast({
						title: '已发送手机验证码',
						icon: 'none'
					})
				})
			},
			submit() {
				if(tools.isEmpty(this.phone,"请输入手机号")){return;}
				if(tools.isEmpty(this.code,"请输入验证码")){return;}
				let params = {
					sessionId: uni.getStorageSync("sessionId"),
					phone: this.phone,
					code: this.code
				};
				tools.request("/api/login/bindingPhone.json", params).then(function(data) {
					console.log(data)
					uni.switchTab({
						url: "/pages/index/index"
					})
				})
			}
		}
	}
</script>
