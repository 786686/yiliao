<template>
	<view class="content">
		<view class="nav-join">
			<view class="item" :class="{cur: type == 1}" @click="nav(1)">喜爱医生</view>
			<view class="item" :class="{cur: type == 2}" @click="nav(2)">招聘职位</view>
			<view class="item" :class="{cur: type == 3}" @click="nav(3)">健康软文</view>
		</view>
		<view class="outpatientlist" v-show="type == 1">
			<view class="item" v-for="(item,index) in doctorList" @click="doctor(item.id)" :key="index">
				<image :src="item.avatar" mode="" class="icon-avatar"></image>
				<view class="item-msg">
					<view class="item-top">
						<view class="item-top-in">
							<view class="item-name">{{item.name}}</view>
							<view class="item-grade">{{item.doctorLevel}}</view>
						</view>
						<view class="item-status">
							<!-- <image src="../../static/a4_ic_love.png"></image> -->
							<image :src="item.ifCollection==1?'../../static/a4_ic_love_g.png':'../../static/a4_ic_love.png'" mode="" class="icon-collect"
							 @click="collect(item.id,1,item.ifCollection,index)"></image>
							{{item.ifCollection == 1?'已':''}}收藏
						</view>
					</view>
					<view class="item-hosipital">{{item.hospital}}/{{item.departmentString}}</view>
					<view class="item-amount">服务人次：{{item.servicesNum}}</view>
					<!-- <view class="item-hobby">擅长：骨科</view> -->
				</view>
			</view>
			<empty v-if="doctorList.length == 0"></empty>
		</view>
		<view class="job-list" v-show="type == 2">
			<view class="item" v-for="(item,index) in positionList" @click="position(item.id)" :key="index">
				<view class="item-top">
					<view class="item-name">{{item.positionName}}</view>
					<view class="item-pay">{{item.minPrice}}k-{{item.maxPrice}}6k</view>
				</view>
				<view class="item-tags">
					<view class="tag-item">{{item.address}}</view>
					<view class="tag-item">{{item.year}}年工作经验以上</view>
					<view class="tag-item">{{item.education}}</view>
				</view>
				<view class="item-company">{{item.company}}</view>
				<view class="item-phone">联系电话 {{item.telephone}}</view>
			</view>
			<empty v-if="positionList.length == 0"></empty>
		</view>
		<view class="recommend-list" v-show="type == 3">
			<view class="item" v-for="(item,index) in articleList" :key="index" @click="healthDetail(item.id)">
				<image :src="item.images" mode=""></image>
				<view class="item-in">
					<view class="item-in-in">
						<view class="item-name">{{item.title}}</view>
						<view class="item-dec">
							<view class="item-read">{{item.readingNum}}阅读</view>
							<view class="item-collect">{{item.collectionNum}}收藏</view>
						</view>
					</view>
					<view class="item-time">{{item.createTimeString}}</view>
				</view>
			</view>
			<empty v-if="articleList.length == 0"></empty>
		</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	import empty from '../empty/empty.vue';
	export default {
		components:{
			empty
		},
		data() {
			return {
				type: 1,
				doctorList: [],
				positionList: [],
				articleList: [],
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			collect(id,type,status,index) {
				let that = this;
				let params = {
					typeId: this.id,
					type: type,
					status: status == 1 ? 2 : 1
				};
				tools.request("/api/index/isCollection.json", params, 1, true).then(function(data) {
					if (status == 1) {
						tools.toast("已取消收藏");
					} else {
						tools.toast("已收藏");
					}
					if(type == 1){
						that.doctorList[index].ifCollection = that.doctorList[index].ifCollection == 1 ? 2 : 1;
					}
				})
			},
			doctor(id) {
				tools.jumpTo("/pages/doctor/doctor?id=" + id)
			},
			position(id) {
				tools.jumpTo("/pages/jobdetail/jobdetail?id=" + id)
			},
			healthDetail(id) {
				tools.jumpTo("/pages/health/health?id=" + id)
			},
			nav(type) {
				this.type = type;
				this.doctorList = [];
				this.positionList = [];
				this.articleList = [];
				this.getList();
			},

			getList() {
				let that = this;
				let params = {
					pageSize: 10,
					pageNumber: 1,
					type: this.type
				}
				tools.request("/api/my/myCollection.json", params, 1, true).then(function(data) {
					that.doctorList = data.doctorList;
					that.positionList = data.positionList;
					that.articleList = data.articleList;
				})
			}
		}
	}
</script>

<style lang="scss">
	.nav-join {
		display: flex;
		justify-content: space-between;
		padding: 40upx 50upx 40upx;
	}
</style>
