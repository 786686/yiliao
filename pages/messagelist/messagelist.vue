<template>
	<view class="content">
		<view class="message-list">
			<view class="item" v-for="(item,index) in items" :key="index">
				<view class="item-top">{{item.createTimeString}}</view>
				<view class="item-in">
					<view class="item-l">病情描述</view>
					<view class="item-r">{{item.description}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">处方药物</view>
					<view class="item-r">
						<image :src="type" mode="" v-for="(type,i) in item.images" :key="i" :data-src="type" @tap="previewImage"></image>
					</view>
				</view>
				<view class="btns">
					<view class="btn btn-white" @click="remove(item.id,index)">
						删除
					</view>
					<view class="btn" @click="detail(item.id)">
						查看详情
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
				items: [],
				imageList: [],
				timer: null,
				pageNumber: 1,
				hasData:true
			}
		},
		onLoad() {},
		onShow() {
			this.getList()
		},
		
		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getList();
		},
		onReachBottom: function() {
			console.log(12)
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
			previewImage: function(e) {
				console.log(e.target.dataset.src)
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			detail(id) {
				tools.jumpTo("/pages/messagedetail/messagedetail?id=" + id)
			},
			remove(id, index) {
				let that = this;
				let params = {
					id: id
				}
				tools.request("/api/my/delAdvisory.json", params, 1, true).then(function(data) {
					tools.toast("删除成功");
					that.items.splice(index, 1);
				})
			},
			getList() {
				let that = this;
				if(!that.hasData){
					return false;
				}
				uni.showNavigationBarLoading();
				let params = {
					pageSize: 10,
					pageNumber: this.pageNumber
				}
				tools.request("/api/my/advisoryList.json", params, 1, true).then(function(data) {
					for (let i in data.advisoryDTOList) {
						data.advisoryDTOList[i].images = data.advisoryDTOList[i].images.split(';');
						for (let j in data.advisoryDTOList[i].images) {
							that.imageList.push(data.advisoryDTOList[i].images[j])
						}
					}
					if (data.advisoryDTOList.length == 0) {//没有数据
						that.hasData= false;
						uni.hideNavigationBarLoading();//关闭加载动画
						return;
					}
					that.items = that.items.concat(data.advisoryDTOList);
					that.pageNumber++;//每触底一次 page +1
					uni.hideNavigationBarLoading();//关闭加载动画
				})
			}

		}
	}
</script>

<style lang="scss">

</style>
