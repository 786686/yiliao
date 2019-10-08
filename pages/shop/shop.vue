<template>
	<view class="content">
			<view class="pop-setion-in">
				<view class="setion-list">
					<view class="list-item" v-for="item in typeList" :class="{cur: classificationId == item.id}" @click="type(item.id)">{{item.name}}</view>
				</view>
				<view class="shop-list">
					<view class="item" v-for="item in goodsList" @click="detail(item.id)">
						<image :src="item.images"></image>
						<view class="item-in">
							<view class="item-in-in">
								<view class="item-name">{{item.name}}</view>
								<!-- <view class="item-company">分类名称</view> -->
							</view>
							<view class="item-price"><text class="iten-unit">¥</text>{{item.retailPrice}}</view>
						</view>
					</view>
					<empty v-if="goodsList.length == 0"></empty>
					
				</view>
			</view>
	</view>
</template>

<script>
    import search from '../headsearch/headsearch.vue'
	const tools = require('../../common/tools.js');
	const server = require('../../common/server.js');
	import empty from '../empty/empty.vue';
	export default {
		components:{
			search,
			empty
		},
		data() {
			return {
				typeList: [],
				classificationId:"",
				goodsList:[],
				server:server.domain
			}
		},
		onLoad() {
			this.getTypeList()
		},
		methods: {
			input(){
				this.doctorList = [];
				this.hospitalList = [];
				this.getList();
			},
			detail(id){
				tools.jumpTo("/pages/medicinedetail/medicinedetail?id="+id)
			},
			type(id){
				this.classificationId = id;
				this.goodsList = [];
				this.getGoodsList();
			},
			getTypeList(){
				let that = this;
				tools.request("/api/drug/classificationList.json", {}).then(function(data) {
					that.typeList = data.classificationList;
					that.classificationId = data.classificationList[0].id;
			that.getGoodsList();
				})
			},
			getGoodsList(){
				let that = this;
				let params = {
					classificationId:this.classificationId,
					pageSize:10,
					pageNumber:1
				}
				tools.request("/api/drug/drugList.json", params).then(function(data) {
					that.goodsList = data.drugList;
				})
			},

		}
	}
</script>

<style lang="scss">
	.pop-setion-in{ margin: 0 35upx;}
	.shop-list{
		// display: flex; flex-wrap: wrap;
		margin: 40upx 0 40upx 30upx;		
		flex: 1; 
		.item{ 
			margin-bottom: 40upx;font-size: 26upx; color: #333;
				display: flex;
				image{ width: 200upx; height: 200upx; margin-right: 20upx;}
				.item-in{
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.item-name{ padding: 7upx 0 11upx; line-height: 38upx; font-size: 28upx; font-weight: bold; color: #333;}
					.item-company{ font-size: 26upx; color: #333;}
					.item-price{
						color: #DD3535; font-weight: bold; font-size: 26upx;margin-bottom: 20upx;
						.item-unit{ font-size: 22upx;}
					}
				}
				&:last-child{
					margin-bottom: 0;
				}
		}
	}
</style>