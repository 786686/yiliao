<template>
	<view class="content">
		<view class="upload-msg">
			<view class="item">
				<view class="item-t">门诊名称</view>
				<view class="item-b"><input type="text" v-model="outpatientName" placeholder="请输入门诊名称" /></view>
			</view>
			<view class="item">
				<view class="item-t">医疗机构执业许可证登记号</view>
				<view class="item-b"><input type="text" v-model="registrationNum" placeholder="请输入医疗机构执业许可证登记号" /></view>
			</view>
			<view class="item">
				<view class="item-t">法人姓名</view>
				<view class="item-b"><input type="text" v-model="legalName" placeholder="请输入法人姓名" /></view>
			</view>
			<view class="item">
				<view class="item-t">联系人姓名</view>
				<view class="item-b"><input type="text" v-model="contactName" placeholder="请输入联系人姓名" /></view>
			</view>
			<view class="item">
				<view class="item-t">地址</view>
				<view class="item-b"><input type="text" v-model="address" placeholder="请输入地址" /></view>
			</view>
			<view class="item">
				<view class="item-t">联系人电话</view>
				<view class="item-b"><input type="number" v-model="telephone" placeholder="请输入联系人电话" /></view>
			</view>
		</view>
		
		
		<!-- <view class="inps">
			<view class="item">
				<view class="item-name"></view>
				<input type="text">
			</view>
			<view class="item">
				<view class="item-name"></view>
				<input type="text">
			</view>
			<view class="item">
				<view class="item-name"></view>
				<input type="text">
			</view>
			<view class="item">
				<view class="item-name"></view>
				<input type="text">
			</view>
			<view class="item">
				<view class="item-name">联系人电话</view>
				<input type="text">
			</view>
			<view class="item">
				<view class="item-name"></view>
				<textarea value="" placeholder="" />
			</view>
		</view> -->
		<view class="btn-save" @click="submit">
			提交加盟信息
		</view>
	</view>
</template>

<script>
	const tools = require('@/common/tools.js');
	export default {
		data() {
			return {
				outpatientName:"",
				registrationNum:"",
				legalName: "",
				contactName: "",
				telephone: "",
				address: "",
			}
		},
		onLoad() {


		},
		methods: {
			submit(){
				if(tools.isEmpty(this.outpatientName,"请输入门诊名称")){return;}
				if(tools.isEmpty(this.registrationNum,"请输入医疗机构执业许可证登记号")){return;}
				if(tools.isEmpty(this.legalName,"请输入法人姓名")){return;}
				if(tools.isEmpty(this.contactName,"请输入联系人姓名")){return;}
				if(tools.isEmpty(this.address,"请输入地址")){return;}
				if(tools.isEmpty(this.telephone,"请输入联系人电话")){return;}
				let that = this;
				let params = {
					outpatientName: this.outpatientName,
					registrationNum: this.registrationNum,
					legalName: this.legalName,
					contactName: this.contactName,
					telephone: this.telephone,
					address: this.address,
				}
				tools.request("/api/my/addJoiningCompany.json", params,1,true).then(function(data) {
					tools.toastJumpTab("加盟成功", "/pages/my/my");
				})
			},
		}
	}
</script>

<style lang="scss">
	
</style>
