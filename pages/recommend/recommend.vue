<template>
	<view class="content">
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
	import empty from '../empty/empty.vue';
	export default {
		components: {
			empty
		},
		data() {
			return {
				healthList: [],

				timer: null,
				pageNumber: 1,
				hasData: true


			}
		},
		onLoad() {
			this.getHealthList();
		},

		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getHealthList();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			if (this.timer != null) {
				clearTimeout(this.timer);
			}
			let that = this;
			this.timer = setTimeout(function() {
				that.getHealthList();
			}, 1000);
		},
		methods: {
			getHealthList() {
				let that = this;



				if (!that.hasData) {
					return false;
				}
				uni.showNavigationBarLoading();


				let params = {
					pageSize: 10,
					pageNumber: 1
				}
				tools.request("/api/index/articleRecommend.json", params).then(function(data) {

					if (data.articleDTOList.length == 0) { //没有数据
						that.hasData = false;
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					}
					that.healthList = that.healthList.concat(data.articleDTOList);
					that.pageNumber++; //每触底一次 page +1
					uni.hideNavigationBarLoading(); //关闭加载动画

				})
			},
			healthDetail(id) {
				tools.jumpTo("/pages/health/health?id=" + id)
			}
		}
	}
</script>

<style lang="scss">
	.swiper-item {
		flex: 1;
	}
</style>
