<template>
	<view class="content">
		<view class="message-list">
			<view class="item" v-for="(item,index) in items" :key="index">
				<view class="item-top">
					<view class="item-time">{{item.createTime}}</view>
				<view class="item-people">已有{{item.deliveryNum}}人投简历</view>
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
	const server = require('../../common/server.js');
	import empty from '../empty/empty.vue';
	export default {
		components:{
			empty
		},
		data() {
			return {
				items:[],
				server:server.domain
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
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
				let params = {
					pageSize: 10,
					pageNumber:1
				}
				tools.request("/api/job/myPositionList.json", params,1,true).then(function(data) {
					that.items = data.myPositionList;
				})
			}

		}
	}
</script>