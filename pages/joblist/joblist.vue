<template>
	<view class="content">
		<view class="btn-save" @click="release" v-if="showModle">
			+ 发布招聘
		</view>
		<view class="nav-join">
			<view class="item" :class="{cur: type == 1}" @click="nav(1)">推荐</view>
			<view class="item" :class="{cur: type == 2}" @click="nav(2)">最新</view>
		</view>
		<view class="job-list">
			<view class="item" v-for="(item,index) in items" @click="detail(item.id,index)" :key="index">
				<view class="item-top">
					<view class="item-name">{{item.positionName}}</view>
					<view class="item-people">
						已有{{item.deliveryNum}}人投简历
					</view>
					<view class="item-pay">{{item.minPrice}}k-{{item.maxPrice}}k</view>
				</view>
				<view class="item-tags">
					<view class="tag-item">{{item.address}}</view>
					<view class="tag-item">{{item.year}}年工作经验以上</view>
					<view class="tag-item">{{item.education}}</view>
				</view>
				<view class="item-company">{{item.company}}</view>
				<view class="item-phone">联系电话 {{item.telephone}}</view>
				<view class="btns">
					<view class="btn" @click.stop="tou(item.id,index)">
						投简历
					</view>
				</view>
			</view>
			<empty v-if="items.length == 0"></empty>
		</view>
	</view>
</template>
<script>
	const tools = require('../../common/tools.js');
	import empty from '../empty/empty.vue';
	export default {
		components: {
			empty
		},
		data() {
			return {
				items: [

				],
				type: 1,
				showModle: false,
				timer: null,
				pageNumber: 1,
				hasData:true
			}
		},
		onLoad() {},
		onShow() {
			this.getShow();
			this.getList();
		},
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getList();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			if (this.timer != null) {
				clearTimeout(this.timer);
			}
			let that = this;
			this.timer = setTimeout(function() {
				that.getList();
			}, 1000);
		},
		methods: {
			getShow() {
				let that = this;
				tools.request("/api/common/isShow.json", {}).then(function(data) {
					if (data.isShow == 1) {
						that.showModle = true;
					} else {
						that.showModle = false;
					}
				})
			},
			tou(id, index) {
				if (tools.isLogin()) {
					let that = this;
					let params = {
						positionId: id
					}
					tools.request("/api/job/submitResume.json", params, 1, true).then(function(data) {
						that.items[index].deliveryNum++;
						uni.showModal({
							content: "简历已投放成功，请保持手机通信流畅！",
							confirmText: "确定",
							cancelText: "取消",
							cancelColor: "#999",
							confirmColor: "#007AFF",
							success: function(res) {
								if (res.confirm) {
									// tools.jumpTo("/pages/login/login");
								}
							}
						})
					})
				} else {
					uni.showModal({
						content: "需要登录才能投简历",
						confirmText: "去登录",
						success: function(res) {
							if (res.confirm) {
								tools.jumpTo("/pages/login/login");
							}
						}
					})
				}
			},
			detail(id) {
				tools.jumpTo("/pages/jobdetail/jobdetail?id=" + id)
			},
			nav(type) {
				this.type = type;
				this.items = [];
				this.pageNumber = 1;
				this.hasData = true;
				this.getList();
			},
			getList() {
				let that = this;
				if(!that.hasData){
					return false;
				}
				uni.showNavigationBarLoading();
				let params = {
					pageSize: 10,
					pageNumber: this.pageNumber,
					type: this.type
				}
				if (tools.isLogin()) {
					params.sessionId = uni.getStorageSync("sessionId")
				}
				tools.request("/api/job/positionList.json", params).then(function(data) {
					if (data.positionList.length == 0) {//没有数据
						that.hasData= false;
						uni.hideNavigationBarLoading();//关闭加载动画
						return;
					}
					that.items = that.items.concat(data.positionList);
					that.pageNumber++;//每触底一次 page +1
					uni.hideNavigationBarLoading();//关闭加载动画
				})
			},
			release() {
				if (uni.getStorageSync("sessionId") != "" && uni.getStorageSync("sessionId") != null) {
					let that = this;
					tools.request("/api/index/judgeIsUpdateUserInfo.json", {}, 1, true).then(function(data) {
						if (data.isFill == 1) {
							tools.jumpTo("/pages/releasejob/releasejob");
						} else {
							tools.toastJump("未填写个人信息", "/pages/personmsg/personmsg");
						}
					})
				} else {
					uni.showModal({
						content: "需要登录才能发布招聘",
						confirmText: "去登录",
						success: function(res) {
							if (res.confirm) {
								tools.jumpTo("/pages/login/login");
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.btns {
		margin-top: 15upx;
	}
</style>
