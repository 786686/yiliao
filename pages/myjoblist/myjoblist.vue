<template>
	<view class="content">
		<view class="message-list">
			<view class="item" v-for="(item,index) in items" :key="index">
				<view class="item-top">
					<view class="item-time">{{item.createTime}}</view>
					<view class="item-people" @click="tou(item.id)">已有{{item.deliveryNum}}人投简历</view>
				</view>
				<view class="item-in">
					<view class="item-l">公司名称</view>
					<view class="item-r">{{item.company}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">职位名称</view>
					<view class="item-r">{{item.positionName}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">性别</view>
					<view class="item-r">{{item.sex == 1?"男":"女"}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">薪资范围</view>
					<view class="item-r">{{item.minPrice}}k-{{item.maxPrice}}k</view>
				</view>
				<view class="item-in">
					<view class="item-l">最低学历</view>
					<view class="item-r">{{item.education}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">联系电话</view>
					<view class="item-r">{{item.telephone}}</view>
				</view>
				<view class="btns">
					<view class="btn btn-white" @click="remove(item.id,index)">
						删除
					</view>
					<view class="btn" @click="edit(item.id)">
						修改
					</view>
					<view class="btn" @click="detail(item.id)">
						详情
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
		components:{
			empty
		},
		data() {
			return {
				items:[],
				
				timer: null,
				pageNumber: 1,
				hasData:true
			}
		},
		onLoad() {
		},
		onShow(){
			this.getList()
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
			tou(id){
				tools.jumpTo("/pages/intentionjob/intentionjob?id="+id)
			},
			detail(id){
				tools.jumpTo("/pages/jobdetail/jobdetail?id="+id)
			},
			edit(id){
				tools.jumpTo("/pages/releasejob/releasejob?id="+id)
			},
			remove(id,index){
				let that = this;
				let params = {
					id:id
				}
				tools.request("/api/job/delPosition.json", params,1,true).then(function(data) {
					tools.toast("删除成功");
					that.items.splice(index,1);
				})
			},
			getList(){
				let that = this;
				
				if(!that.hasData){
					return false;
				}
				uni.showNavigationBarLoading();
				let params = {
					pageSize: 10,
					pageNumber:this.pageNumber
				}
				tools.request("/api/job/myPositionList.json", params,1,true).then(function(data) {
					
					if (data.myPositionList.length == 0) {//没有数据
						that.hasData= false;
						uni.hideNavigationBarLoading();//关闭加载动画
						return;
					}
					that.items = that.items.concat(data.myPositionList);
					that.pageNumber++;//每触底一次 page +1
					uni.hideNavigationBarLoading();//关闭加载动画
				})
			}

		}
	}
</script>