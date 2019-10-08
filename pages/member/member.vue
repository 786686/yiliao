<template>
	<view class="content">
		<view class="my-top">
			<view class="my-top-in">
				<image :src="avatar" mode="" class="icon-avatar"></image>
				<view class="item-name">{{name}}</view>
			</view>
		</view>
		<view class="member-con">
			<view class="tit">会员特权</view>
			<view class="member-con-in">
				{{item.content}}
			</view>
		</view>
		<view class="btn-save" @click="submit">开通会员</view>
	</view>
</template>

<style lang="scss">
	@import '../../common/index.scss';
	.member-con{
		box-shadow:7upx 6upx 47upx 7upx rgba(166,166,166,0.22);
		border-radius:20upx;
		background-color: #fff;
		// margin: 140upx 35upx 68upx;
		margin: 35upx 35upx 68upx;
		padding: 40upx 40upx 66upx;
		.tit{ 
			margin-bottom: 34upx; font-size: 40upx; font-weight: bold; color: #333;
		}
		.member-con-in{ line-height: 50upx; font-size: 30upx; color: #666;
		
		}
		}
</style>

<script>
	export default {
		data() {
			return {
				item:{},
				name:"",
				avatar:""
			}
		},
		onLoad() {
			this.name = uni.getStorageSync('nickName');
			this.avatar = uni.getStorageSync('avatarUrl');
			this.getDetail();
		},
		methods: {
			submit(){
				let that = this;
				let params = { 
				};
				tools.request("/api/my/joinMembership.json",params,1,true).then(function(data) {
					tools.toastJumpTab("恭喜你，开通成功！","/pages/my/my");
				})
			},
			getDetail(){
				let that = this;
				let params = { 
					type:3
				};
				tools.request("/api/my/contactInfo.json", params).then(function(data) {
					that.item = data;
				})
			},
		}
	}
</script>



		<!-- <view class="price-list">
			<view class="item">
				<view class="item-time">3个月</view>
				<view class="item-price"><text class="unit">¥</text>69</view>
				<view class="item-dec">省21元</view>
				<view class="item-coupon">首月30</view>
			</view>
			<view class="item">
				<view class="item-time">6个月</view>
				<view class="item-price"><text class="unit">¥</text>69</view>
				<view class="item-dec">省60元</view>
				<view class="item-coupon">折合20/月</view>
			</view>
			<view class="item">
				<view class="item-time">12个月</view>
				<view class="item-price"><text class="unit">¥</text>69</view>
				<view class="item-dec">省181元</view>
				<view class="item-coupon">折合15/月</view>
			</view>
		</view> -->