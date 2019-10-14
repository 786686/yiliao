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
				id:""
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
		methods: {
			getList(){
				let that = this;
				let params = {
					pageSize: 10,
					pageNumber:1,
					positionId:this.id
				}
				tools.request("/api/job/findSubmitResume.json", params,1,true).then(function(data) {
					that.items = data;
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