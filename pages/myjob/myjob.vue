<template>
	<view class="content">
		<view class="inps">
			<view class="item">
				<view class="item-name">称呼</view>
				<input type="text" v-model="company" placeholder="请输入您的称呼">
			</view>
			<view class="item">
				<view class="item-name">性别</view>
				<picker @change="bindSexChange" :value="sexIndex" :range="sexList">
					{{sexList[sexIndex]}}
				</picker>
			</view>
			<view class="item">
				<view class="item-name">期望薪资范围</view>
				<input type="text" v-model="price" placeholder="请输入期望薪资范围">
			</view>
			<view class="item">
				<view class="item-name">学历</view>
				<picker @change="bindEduChange" :value="eduIndex" :range="eduList">
					{{eduList[eduIndex]}}
				</picker>
			</view>
			<view class="item">
				<view class="item-name">工作年限</view>
				<input type="number" v-model="year" placeholder="请输入工作年限">
			</view>
			<view class="item">
				<view class="item-name">联系电话</view>
				<input type="number" v-model="telephone" placeholder="请输入联系电话">
			</view>
			<view class="item">
				<view class="item-name">技能</view>
				<textarea v-model="skill" placeholder="请输入技能" />
				</view>
		</view>
		<view class="btn-save" @click="submit">
			发布职位
		</view>
	</view>
</template>

<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			return {
				name:"",
				price:"",
				education:"初中",
				year:"",
				telephone:"",
				skill:"",
				sex:1,
				sexIndex:0,
				sexList:['男','女','全部'],
				eduIndex:0,
				eduList:['初中','高中','中技','中专','大专','本科','硕士','MBA','EMBA','博士','其他']
			}
		},
		onLoad(options) {
			if (options.edit) {
				this.getDetail();
			}
		},
		methods: {
			getDetail(){
				let that = this;
				let params = {}
				tools.request("/api/job/findResume.json", params,1,true).then(function(data) {
					that.name = data.findResumeDTO.name;
					that.id = data.findResumeDTO.id;
					that.price = data.findResumeDTO.price;
					that.skill = data.findResumeDTO.skill;
					that.year = data.findResumeDTO.year;
					that.telephone = data.findResumeDTO.telephone;
					
					if(that.eduList.indexOf(data.findResumeDTO.education) != -1){
						that.eduIndex = that.eduList.indexOf(data.findResumeDTO.education);
					}
					
					that.sexIndex = parseInt(data.findResumeDTO.sex) - 1;
					that.education = data.findResumeDTO.education;
					that.sex = data.findResumeDTO.sex;
					
				})
			},
			bindSexChange(event){
				this.sexIndex = event.detail.value
				this.sex = parseInt(this.sexIndex)+1;
			},
			bindEduChange(event){
				this.eduIndex = event.detail.value
				this.education = this.eduList[this.eduIndex];
			},
			submit(){	
				if(tools.isEmpty(this.name,"请输入您的称呼")){return;}
				if(tools.isEmpty(this.price,"请输入期望薪资范围")){return;}
				if(tools.isEmpty(this.year,"请输入工作年限")){return;}
				if(tools.isEmpty(this.telephone,"请输入联系电话")){return;}
				if(tools.isEmpty(this.skill,"请输入技能")){return;}
				let that = this;
				let params = {
					name:this.name,
					price:this.price,
					education:this.education,
					year:this.year,
					telephone:this.telephone,
					skill:this.skill,
					sex:this.sex
				}
				if(that.id != ""){
					params.id = params.id;
					tools.request("/api/job/editResume.json", params,1,true).then(function(data) {
						tools.toastJumpTab("编辑成功","/pages/my/my");
					})
					return;
				}
				tools.request("/api/job/fillResume.json", params,1,true).then(function(data) {
					tools.toastJumpTab("保存成功","/pages/my/my");
				})
			}
		}
	}
</script>
<style lang="scss">
	.inps{
		margin: 0 25upx;
		.item-name{ font-size: 34upx; font-weight: bold; color: #333; padding:50upx 15upx 10upx;}
		input{ padding: 30upx 17upx;}
		picker{ padding: 30upx 17upx;}
		textarea{ padding: 30upx 17upx;}
		.item{border-bottom: 1px solid #E6E6E6;}
		.item-pay{ 
			.item-txt{ font-size: 30upx; color: #333; font-weight: bold;}
			display: flex; align-items: center;
			input{ flex: 1;}
		
		}
	}
	picker{
		justify-content: flex-start;
	}
</style>
