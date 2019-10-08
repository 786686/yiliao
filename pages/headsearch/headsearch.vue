<template>
	<view class="content">
		<view class="search-inp">
			<view class="search-inp-in">
				<image src="../../static/a5_ic_search.png" class="icon-search"></image>
					<input type="text" placeholder="搜索医生或诊所" @click="focus" disabled />
				</view>
			<image src="../../static/home_ic_more.png" mode="" class="icon-msg" @click="msg"></image>
		</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
			msg(){
				tools.jumpTo("/pages/messagelist/messagelist");
			},
			focus(){
				tools.jumpTo("/pages/search/search");
			},
		}
	}
</script>
