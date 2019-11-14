<template>
	<view class="content my-page">
		<view class="my-top">
			<view class="my-top-in">
				<image :src="avatar" mode="" class="icon-avatar"></image>
				<view class="item-name" @click="login">{{name}}</view>
				<!-- <view class="item-member" @click="member">
					{{item.isMember == 1?'':'开通'}}会员
					<view class="white-arrow" v-if="item.isMember != 1"></view>
				</view> -->
			</view>
			<!-- <view class="my-order">
				<view class="tit">
					我的订单
					<view class="item-more" @click="allorder(1)">查看全部订单 ></view>
				</view>
				<view class="status-list">
					<view class="item" @click="cart">
						<image src="../../static/user_order_ic_01.png"></image>
						购物车
					</view>
					<view class="item" @click="allorder(2)">
						<image src="../../static/user_order_ic_2.png"></image>
						待付款
					</view>
					<view class="item" @click="allorder(3)">
						<image src="../../static/user_order_ic_3.png"></image>
						待发货
					</view>
					<view class="item" @click="allorder(4)">
						<image src="../../static/user_order_ic_4.png"></image>
						待收货
					</view>
				</view>
			</view> -->
		</view>

		<!-- <view class="set-module">
			<view class="status-list">
				<view class="item" @click="personmsg">
					个人信息
				</view>
				<view class="item" @click="job">
					我的简历
				</view>
				<view class="item" @click="historylist">
					历史就诊记录
				</view>
			</view>
		</view>
		
		
		
		
		<view class="set-module">
			<view class="status-list">
				<view class="item" @click="messagelist">
					留言咨询列表
				</view>
				<view class="item" @click="joblist">
					我发布的招聘
				</view>
				<view class="item" @click="collect">
					我的收藏
				</view>
			</view>
		</view>
		
		<view class="set-module">
			<view class="status-list">
				<view class="item" @click="join">
					加盟联保
				</view>
				<view class="item" @click="feedback">
					意见反馈
				</view>
				<view class="item" @click="link">
					联系我们
				</view>
			</view>
		</view> -->


		<view class="my-list">
			<view class="item" @click="personmsg">
				<view class="item-l">个人信息</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="job" v-if="showModle">
				<view class="item-l">我的简历</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
			<!-- <view class="item" @click="address">
				<view class="item-l">我的收货地址</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view> -->
			<view class="item" @click="historylist">
				<view class="item-l">历史就诊记录</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="my-list">
			<view class="item" @click="messagelist">
				<view class="item-l">留言咨询列表</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
			<!-- <view class="item" @click="historycheck">
				<view class="item-l">新增病例</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view> -->
			<view class="item" @click="joblist" v-if="showModle">
				<view class="item-l">我发布的招聘</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="collect">
				<view class="item-l">我的收藏</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="join">
				<view class="item-l">加盟联保</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="my-list">
			<view class="item" @click="feedback">
				<view class="item-l">意见反馈</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
			<view class="item" @click="callPhone(telephone)">
				<view class="item-l">联系我们</view>
				<view class="item-r">
					<image src="../../static/a2_icon_more_g.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				showModle:false,
				name: "",
				avatar: "../../static/defaultavatar.png",
				item: {},
				telephone: ""
			}
		},
		onLoad() {
			this.getPhone();
		},
		onShow() {
			//不放在onLoad是因为如果是从个人中心去登录的话，再回到个人中心的时候它不会执行这代码块了，因为它只执行一次
			if (uni.getStorageSync('nickName') == "" || uni.getStorageSync('nickName') == null) {
				this.name = "请登录";
			} else {
				this.name = uni.getStorageSync('nickName');
			}
			if (uni.getStorageSync('avatarUrl') == "" || uni.getStorageSync('avatarUrl') == null) {
				this.avatar = "../../static/defaultavatar.png"
			} else {
				this.avatar = uni.getStorageSync('avatarUrl');
			}
			this.getMember();
			this.getShow();
		},
		methods: {
			callPhone(phone) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
					// 成功回调
					success: (res) => {
						// console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						// console.log('调用失败!')
					}
				});
			},
			getPhone() {
				let that = this;
				let params = {
					type: 2
				};
				tools.request("/api/my/contactInfo.json", params, 1, true).then(function(data) {
					that.telephone = data.content;
				})
			},
			getShow(){
				let that = this;
				tools.request("/api/common/isShow.json", {}).then(function(data) {
					if (data.isShow == 1) {
						that.showModle = true;
					} else {
						that.showModle = false;
					}
				})
			},
			login() {
				if (tools.toLogin()) {
					return;
				}
			},
			personmsg() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/personmsg/personmsg");
			},
			job() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/myjob/myjob?edit=true");
			},
			feedback() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/feedback/feedback");
			},
			join() {
				tools.jumpTo("/pages/joinmsg/joinmsg");
			},
			link() {
				tools.jumpTo("/pages/link/link");
			},
			collect() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/collect/collect");
			},
			joblist() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/myjoblist/myjoblist");
			},
			historycheck() {
				if (tools.toLogin()) {
					return;
				}
				let that = this;
				tools.request("/api/index/judgeIsUpdateUserInfo.json", {}, 1, true).then(function(data) {
					if (data.isFill == 1) {
						tools.jumpTo("/pages/historycheck/historycheck");
					} else {
						tools.toastJump("未填写个人信息", "/pages/personmsg/personmsg");
					}
				})
			},
			historylist() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/historylist/historylist");
			},
			messagelist() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/messagelist/messagelist");
			},
			cart() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/cart/cart");
			},
			allorder(type) {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/order/order?type=" + type);
			},
			member() {
				if (tools.toLogin()) {
					return;
				}
				if (this.item.isMember == 1) {
					return;
				} //已经会会员；
				tools.jumpTo("/pages/member/member");
			},
			address() {
				if (tools.toLogin()) {
					return;
				}
				tools.jumpTo("/pages/addresslist/addresslist");
			},
			getMember() {
				if (!tools.isLogin()) {
					return;
				}
				let that = this;
				let params = {};
				tools.request("/api/my/judgeIsMember.json", params, 1, true).then(function(data) {
					that.item = data;
				})
			}
		}
	}
</script>
<style lang="scss">
	.my-page{ padding-bottom: 10upx;}
	.my-top {
		// background-image: url("../../static/d_bg.png") no-repeat;
		background: url("../../static/d_bg.png") no-repeat;
		background-size: 100% 400upx;
	}

	.my-list {
		
		box-shadow:7rpx 4rpx 20rpx 6rpx rgba(200, 200,200,0.5);
		// margin-top: 190upx;
		margin: 35upx 20upx;
		padding: 0 54upx;
		border-radius: 20upx;
		.item {
			display: flex;
			justify-content: space-between;
			padding: 32.5upx 0;
			align-items: center;
			font-size: 30upx;
			font-weight: bold;

			image {
				width: 14upx;
				height: 24upx;

			}

			&.item-border {
				border-bottom: 1px solid #E6E6E6;
			}
		}
	}
</style>
