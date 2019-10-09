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
				components:{
					empty
				},
		data() {
			return {
				items:[],
				imageList:[],
			}
		},
		onLoad() {
		},
		onShow() {
			this.getList()
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
			detail(id){
				tools.jumpTo("/pages/messagedetail/messagedetail?id="+id)
			},
			remove(id,index){
				let that = this;
				let params = {
					id:id
				}
				tools.request("/api/my/delAdvisory.json", params,1,true).then(function(data) {
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
				tools.request("/api/my/advisoryList.json", params,1,true).then(function(data) {
					for(let i in data.advisoryDTOList){
						data.advisoryDTOList[i].images = data.advisoryDTOList[i].images.split(';');
						for(let j in data.advisoryDTOList[i].images){
							that.imageList.push(data.advisoryDTOList[i].images[j])
						}
					}
					that.items = data.advisoryDTOList;
				})
			}

		}
	}
</script>

<style lang="scss">
	
</style>
