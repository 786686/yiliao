<template>
	<view class="content">
		<view class="link-con">
			<rich-text :nodes="htmlNodes"></rich-text>
		</view>
	</view>
</template>

<script>
	const tools = require('@/common/tools.js');
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				item:{},
				htmlNodes:[]
			}
		},
		onLoad() {
			this.getDetail();
		},
		methods: {
			getDetail(){
				let that = this;
				let params = { 
					type:2
				};
				tools.request("/api/my/contactInfo.json", params,1,true).then(function(data) {
					that.item = data;
					let htmlString = that.item.content.replace(/\\/g, "").replace(/article/g, "div").replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');;
					that.htmlNodes = htmlParser(htmlString);
				})
			},
		}
	}
</script>

<style lang="scss">
	.link-con{
		padding: 30upx 40upx;
		font-size: 30upx; color: #333; line-height: 50upx;
	}
</style>
