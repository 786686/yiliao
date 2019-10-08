<template>
	<view class="content">
		<search></search>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="index-swiper">
			<swiper-item v-for="(item,index) in bannerList" :key="index">
				<view class="swiper-item">
					<image :src="item" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="index-second-nav">
			<view class="item" @click="check">
				<image src="../../static/home_icon_1.png" mode=""></image>患者登记
			</view>
			<view class="item" @click="outpatient">
				<image src="../../static/home_icon_2.png" mode=""></image>诊治门诊
			</view>
		</view>
		<view class="index-medicine">
			<view class="tit">药物推荐</view>
			<view class="medicine-list">
				<view class="item" v-for="(item,index) in recommendList" :key="index" @click="recommendDetail(item.id)">
					<view class="item-in">
						<image :src="item.images" mode=""></image>
						<view class="item-name">{{item.name}}</view>
						<!-- <view class="item-standard">{{item.standard}}</view> -->
						<view class="item-price"><text class="item-unit">¥</text>{{item.retailPrice}}</view>
					</view>
				</view>
				<view class="item item-more" @click="more">
					<view class="item-in">
						<image src="../../static/home_ic_more.png"></image>
						<view class="item-more-txt">查看更多</view>
					</view>
				</view>
			</view>
		</view>
		<view class="index-recommend">
			<view class="tit">健康推荐</view>
			<view class="recommend-list">
				<view class="item" v-for="(item,index) in healthList" :key="index" @click="healthDetail(item.id)">
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
				<empty v-if="healthList.length == 0"></empty>
			</view>
		</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	const server = require('../../common/server.js');
    import search from '../headsearch/headsearch.vue';	
	import empty from '../empty/empty.vue';
	export default {
		components:{
			search,
			empty
		},
		data() {
			return {
				bannerList:[],
				recommendList: [],
				healthList:[],
				server:server.domain
			}
		},
		onLoad() {
			this.getBanner();
			this.getRecommendList();
			this.getHealthList();
		},
		methods: {
			check(){
				if(tools.toLogin()){ return;}
				let that = this;
				tools.request("/api/index/judgeIsUpdateUserInfo.json", {},1,true).then(function(data) {
					if(data.isFill == 1){
						//新增病例
						tools.jumpTo("/pages/historycheck/historycheck")
					}else{
						tools.jumpTo("/pages/personmsg/personmsg")
					}
				})
			},
			outpatient(){
				tools.jumpTo("/pages/outpatientlist/outpatientlist")
			},
			focus(){
				tools.jumpTo("/pages/search/search");
			},
			// 
			more(){
				tools.jumpToTab("/pages/shop/shop")
			},
			getBanner(){
				let that = this;
				tools.request("/api/index/getCarouselImage.json", {}).then(function(data) {
					that.bannerList = data.images.split(";");
				})
			},
			getRecommendList(){
				let that = this;
				tools.request("/api/index/drugRecommend.json", {}).then(function(data) {
					console.log(data)
					that.recommendList = data.drugDTOList;
				})
			},
			getHealthList(){
				let that = this;
				let params = {
					pageSize: 10,
					pageNumber:1
				}
				tools.request("/api/index/articleRecommend.json", params).then(function(data) {
					console.log(data)
					that.healthList = data.articleDTOList;
				})
			},
			recommendDetail(id){
				tools.jumpTo("/pages/medicinedetail/medicinedetail?id="+id)
			},
			healthDetail(id){
				tools.jumpTo("/pages/health/health?id="+id)
			}
		}
	}
</script>

<style lang="scss">
	.swiper-item {
	    flex: 1;
	}
</style>