<template>
	<view class="content">
		<view class="link-con" @click="callPhone(item.content)">
			{{item.content}}
			<!-- <rich-text :nodes="htmlNodes"></rich-text> -->
		</view>
	</view>
</template>

<script>
	const tools = require('@/common/tools.js');
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				item: {},
				htmlNodes: []
			}
		},
		onLoad() {
			this.getDetail();
		},
		methods: {
			callPhone(phone) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: phone,
					// 成功回调
					success: (res) => {
						// console.log('调用成功!')
					},
					// 失败回调
					fail: (res) => {
						// console.log('调用失败!')
					}
				});
			},
			getDetail() {
				let that = this;
				let params = {
					type: 2
				};
				tools.request("/api/my/contactInfo.json", params, 1, true).then(function(data) {
					that.item = data;
					let htmlString = that.item.content.replace(/\\/g, "").replace(/article/g, "div").replace(/\<img/gi,
						'<img style="max-width:100%;height:auto" ');;
					that.htmlNodes = htmlParser(htmlString);
				})
			},
		}
	}
</script>

<style lang="scss">
	.link-con {
		padding: 30upx 40upx;
		font-size: 30upx;
		color: #333;
		line-height: 50upx;
	}
</style>
