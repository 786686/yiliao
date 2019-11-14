<template>
	<view class="content">
		<view class="message-list">
			<view class="item" v-for="(item,index) in items" :key="index">
				<view class="item-top">{{item.createTimeString}}</view>
				<view class="item-in">
					<view class="item-l">所患病情</view>
					<view class="item-r">{{item.disease}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">就诊时间</view>
					<view class="item-r">{{item.treatmentTimeString}}</view>
				</view>
				<view class="item-in">
					<view class="item-l">患病类型</view>
					<view class="item-r">{{item.illness}}</view>
				</view>
				<!-- <view class="item-in">
					<view class="item-l">所患病情</view>
					<view class="item-r">{{item.doctorDescription}}</view>
				</view> -->
				<view class="btns">
					<view class="btn" @click="detail(item.id)">
						查看
					</view>
					<view class="btn" @click="edit(item.id)" v-if="item.type != 2">
						编辑
					</view>
					<view class="btn btn-white" @click="remove(item.id,index)">
						删除
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
				hasData: true
			}
		},
		onLoad() {
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
			detail(id){
				tools.jumpTo("/pages/historydetail/historydetail?id="+id)
			},
			edit(id){
				tools.jumpTo("/pages/historycheck/historycheck?id="+id)
			},
			
			remove(id,index){
				let that = this;
				let params = {
					id:id
				}
				tools.request("/api/my/delTreatmentRecord.json", params,1,true).then(function(data) {
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
				tools.request("/api/my/treatmentRecordList.json", params,1,true).then(function(data) {
					if (data.treatmentRecordList.length == 0) { //没有数据
						that.hasData = false;
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					}
					that.items = that.items.concat(data.treatmentRecordList);
					that.pageNumber++; //每触底一次 page +1
					uni.hideNavigationBarLoading(); //关闭加载动画
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>


<!-- <template>
	<view class="content">
		<view class="history">
			<view class="item">
				<view class="item-t">所患病情</view>
				<view class="item-b">所患病情</view>
			</view>
			<view class="item">
				<view class="item-t">就诊时间</view>
				<view class="item-b">就诊时间</view>
			</view>
			<view class="item">
				<view class="item-t">就诊医院</view>
				<view class="item-b">就诊医院</view>
			</view>
			<view class="item">
				<view class="item-t">就诊科室</view>
				<view class="item-b">就诊科室</view>
			</view>
			<view class="history-pics">
				<view class="tit">处方药物</view>
				<view class="list">
					<view class="item">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../static/logo.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../static/logo.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-add">+ 新增病史</view>
		<view class="btn-save">保存，完成登记</view>
	</view>
</template> -->