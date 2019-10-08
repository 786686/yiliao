<template>
	<view class="contain">
		<image src="../../static/ic_launcher.png"></image>
		<view class="uni-btn-v uni- uni-common-mt">
			<!-- <button type="primary" class="page-body-button" v-for="(value,key) in providerList" @click="tologin(value)" :key="key">{{value.name}}</button> -->
			<button v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
		</view>
	</view>
</template>
<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				providerList: [],
				canIUse:wx.canIUse('button.open-type.getUserInfo')
			}
		},
		onLoad() {
			uni.getProvider({
				service: 'oauth',
				success: (result) => {
					this.providerList = result.provider.map((value) => {
						let providerName = '';
						switch (value) {
							case 'weixin':
								providerName = '微信登录'
								break;
							case 'qq':
								providerName = 'QQ登录'
								break;
							case 'sinaweibo':
								providerName = '新浪微博登录'
								break;
							case 'xiaomi':
								providerName = '小米登录'
								break;
							case 'alipay':
								providerName = '支付宝登录'
								break;
							case 'baidu':
								providerName = '百度登录'
								break;
							case 'toutiao':
								providerName = '头条登录'
								break;
						}
						return {
							name: providerName,
							id: value
						}
					});

				},
				fail: (error) => {
					console.log('获取登录通道失败', error);
				}
			});
		},
		methods: {
			bindGetUserInfo (e) {
				if(e.detail.userInfo){		
					let that = this;
					console.log(e.detail.userInfo)
					uni.setStorageSync('nickName', e.detail.userInfo.nickName);
					uni.setStorageSync('avatarUrl', e.detail.userInfo.avatarUrl);
					setTimeout(()=>{
						that.tologin({id:'weixin'});
					},0)
				}	
			},
			tologin(provider) {
				console.log(provider)
				uni.login({
					provider: provider.id,
					// #ifdef MP-ALIPAY
					scopes: 'auth_user', //支付宝小程序需设置授权类型
					// #endif
					success: (res) => {
						console.log('login success:', res);
						console.log(provider)
						uni.getUserInfo({
							provider: provider.id,
							success: function(infoRes) {
								console.log(infoRes);
								uni.setStorageSync('nickName', infoRes.userInfo.nickName);
								uni.setStorageSync('avatarUrl', infoRes.userInfo.avatarUrl);
							},
							fail(error) {
								console.log(error)
							}
						});
						let params = {
							code: res.code
						}
						tools.request("/api/login/authLogin.json", params).then(function(data) {
							uni.setStorageSync('sessionId', data.sessionId);
							tools.toastJump("登录成功","/pages/bindphone/bindphone");
						})

					},
					fail: (err) => {
						console.log('login fail:', err);
					}
				});
			}
		}
	}
</script>

<style>
	.contain {
		padding-top: 100upx;
	}

	image {
		width: 192upx;
		height: 192upx;
		margin: 0 auto;
		display: block;
		border-radius: 50%;
	}

	button {
		margin: 100upx 50upx;
		background-color: #1AAD19;
		color: #ffffff;
	}
</style>
