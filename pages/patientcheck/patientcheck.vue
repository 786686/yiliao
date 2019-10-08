<template>
	<view class="content">
		<view class="person">
			<view class="item">
				<view class="item-l">姓名</view>
				<view class="item-r"><input type="text" placeholder="请输入姓名"></view>
			</view>
			<view class="item">
				<view class="item-l">性别</view>
				<view class="item-r">女</view>
			</view>
			<view class="item">
				<view class="item-l">出生日期</view>
				<view class="item-r">2018/12/12</view>
			</view>
			<view class="item">
				<view class="item-l">婚配</view>
				<view class="item-r">未婚</view>
			</view>
			<view class="item">
				<view class="item-l">工作单位</view>
				<view class="item-r"><input type="text" value="财富大厦"></view>
			</view>
			<view class="item">
				<view class="item-l">职业</view>
				<view class="item-r"><input type="text" value="" placeholder="(选填)"></view>
			</view>
			<view class="item">
				<view class="item-l">通讯地址</view>
				<view class="item-r"><input type="text" value="" placeholder="(选填)"></view>
			</view>
			<view class="item">
				<view class="item-l">联系电话</view>
				<view class="item-r"><input type="text" value="" placeholder="(选填)"></view>
			</view>
			<view class="item">
				<view class="item-l">联系地址</view>
				<view class="item-r"><input type="text" value="" placeholder="(选填)"></view>
			</view>
		</view>
		<view class="btn-next">
			下一步，完善过往就诊信息
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		/* align-items: center; */
		/* justify-content: center; */
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
