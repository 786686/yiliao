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
				items:[]
			}
		},
		onLoad() {
		},
		onShow() {
			this.getList();
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
				let params = {
					pageSize: 10,
					pageNumber:1
				}
				tools.request("/api/my/treatmentRecordList.json", params,1,true).then(function(data) {
					that.items = data.treatmentRecordList;
					
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