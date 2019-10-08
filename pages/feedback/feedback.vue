<template>
	<view class="content">
			<view class="upload-msg">
				<view class="item">
					<view class="item-b">
						<textarea placeholder="请反馈您宝贵的意见" v-model="content" />
					</view>
				</view>
			</view>
		<view class="btn-save" @click="submit">提交</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				content:""
			}
		},
		onLoad() {

		},
		methods: {
			submit(){
				if(tools.toLogin()){return;}
				if(tools.isEmpty(this.content,"请输入您宝贵的意见")){return;}
				let that = this;
				let params = { 
					content:this.content
				};
				tools.request("/api/my/addFeedback.json", params,1,true).then(function(data) {
					tools.toastJumpTab("提交反馈意见成功", "/pages/my/my");
				})
			},
		}
	}
</script>

<style lang="scss">
</style>
