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
						<image :src="type" mode="" v-for="(type,i) in item.images" :key="i"></image>
					</view>
				</view>
				<view class="btns">
					<view class="btn btn-white" @click="remove(item.id)">
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
				tools.jumpTo("/pages/messagedetail/messagedetail?id="+id)
			},
			remove(id){
				let that = this;
				let params = {
					id:id
				}
				tools.request("/api/my/delAdvisory.json", params,1,true).then(function(data) {
					tools.toastJumpTab("删除成功","/pages/my/my");
				})
			},
			getList(){
				let that = this;
				let params = {
					pageSize: 10,
					pageNumber:1
				}
				tools.request("/api/my/advisoryList.json", params,1,true).then(function(data) {
					console.log(data)
					
					for(let i in data.advisoryDTOList){
						data.advisoryDTOList[i].images = data.advisoryDTOList[i].images.split(';');
					}
					
					that.items = data.advisoryDTOList;
				})
			}

		}
	}
</script>

<style lang="scss">
	
</style>
