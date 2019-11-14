<template>
	<view class="content">
		<view class="message-list">
			<view class="item" v-for="(item,index) in items" :key="index">
				<view class="item-top">
					<view class="item-time">{{item.name}}
					<!-- <image :src="item.sexString=='1'?'../../static/a5_ic_m.png':'../../static/a5_ic_n.'" mode=""></image> -->
					<!-- {{item.sex == "1"?"男":"女"}} -->
					</view>
					<view class="">
						{{item.sex == "1"?"男":"女"}}
					</view>
					<view class="item-price">{{item.price}}</view>
				</view>
				<view class="item-in">
					<view class="item-r">{{item.year}}年工作经验</view>
				</view>
				<view class="item-in">
					<view class="item-l">{{item.education}}</view>
					<view class="item-r item-phone">联系电话：{{item.telephone}}</view>
				</view>
				<view class="item-in">
					<view class="item-r">{{item.skill}}</view>
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
		components:{
			empty
		},
		data() {
			return {
				items:[],
				id:"",
				
				
				timer: null,
				pageNumber: 1,
				hasData: true
			}
		},
		onLoad(options) {
			if(options.id){
				this.id = options.id;
			}
		},
		onShow() {
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
			getList(){
				let that = this;
				
				if(!that.hasData){
					return false;
				}
				uni.showNavigationBarLoading();
				let params = {
					pageSize: 10,
					pageNumber:this.pageNumber,
					positionId:this.id
				}
				tools.request("/api/job/findSubmitResume.json", params,1,true).then(function(data) {
					if (data.length == 0) {//没有数据
						that.hasData= false;
						uni.hideNavigationBarLoading();//关闭加载动画
						return;
					}
					that.items = that.items.concat(data);
					that.pageNumber++;//每触底一次 page +1
				})
			}
		}
	}
</script>
<style lang="scss">
	.item-top image{
		width: 22upx; height: 30upx;
	}
	.item-price{color: #604EFF;}
	.message-list .item .item-in .item-l { color: #333;}
	.message-list .item .item-in .item-r.item-phone{ justify-content: flex-end;}
</style>