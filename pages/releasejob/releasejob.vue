<template>
	<view class="content">
		<view class="inps">
			<view class="item">
				<view class="item-name">公司名称</view>
				<input type="text" v-model="company" placeholder="请输入公司名称">
			</view>
			<view class="item">
				<view class="item-name">职位名称</view>
				<picker @change="bindJobChange" :value="index" :range="jobNameList">
					{{jobList[index].name}}
				</picker>
			</view>
			<view class="item">
				<view class="item-name">性别</view>
				<picker @change="bindSexChange" :value="sexIndex" :range="sexList">
					{{sexList[sexIndex]}}
				</picker>
			</view>
			<view class="item">
				<view class="item-name">薪资范围</view>
				<view class="item-pay">
					<input type="number" v-model="minPrice" placeholder="最低">
					<view class="item-txt">至</view>
					<input type="number" v-model="maxPrice" placeholder="最高">
					<view class="item-txt">k</view>
					
				</view>
			</view>
			<view class="item">
				<view class="item-name">最低学历</view>
				<picker @change="bindEduChange" :value="eduIndex" :range="eduList">
					{{eduList[eduIndex]}}
				</picker>
				<!-- <input type="text" v-model="education" placeholder="请输入最低学历"> -->
			</view>
			<view class="item">
				<view class="item-name">最低工作年限</view>
				<input type="number" v-model="year" placeholder="请输入工作年限">
			</view>
			<view class="item">
				<view class="item-name">联系电话</view>
				<input type="number" v-model="telephone" placeholder="请输入联系电话">
			</view>
			<view class="item">
				<view class="item-name">工作地址</view>
				<input type="text" v-model="address" placeholder="请输入工作地址">
			</view>
			<view class="item">
				<view class="item-name">工作内容</view>
				<textarea placeholder="请输入工作内容" v-model="content" />
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
				id:"",
				levelId:"",//职位名称主键id
				maxPrice:"",
				minPrice:"",
				education:"初中",
				year:"",
				telephone:"",
				address:"",
				content:"",
				company:"",
				sex:1,
				jobList:[],
				index:0,
				jobNameList:[],
				sexIndex:0,
				sexList:['男','女','全部'],
				eduIndex:0,
				eduList:['初中','高中','中技','中专','大专','本科','硕士','MBA','EMBA','博士','其他']
			}
		},
		onLoad(options) {
			this.getList();
			if(options.id){
				this.id = options.id;
				this.getDetail();
			}
		},
		methods: {
			getDetail(){
				let that = this;
				let params = { 
					id:this.id
				};
				tools.request("/api/job/positionDetails.json", params,1,true).then(function(data) {
					
					that.address = data.address
					that.company = data.company
					that.content = data.content;
					that.education = data.education;
					that.maxPrice = data.maxPrice;
					that.minPrice = data.minPrice;
					that.telephone = data.telephone;
					that.year = data.year;
					
					if(that.jobNameList.indexOf(data.positionName) != -1){
						that.index = that.jobNameList.indexOf(data.positionName);
					}
					that.sexIndex = parseInt(data.sex) - 1;
					that.sex = data.sex;
					
					if(that.eduList.indexOf(data.education) != -1){
						that.eduIndex = that.eduList.indexOf(data.education);
					}
					
					that.jobList.map( (item,i) => {
						if(i == that.index){
							that.levelId = that.jobList[i].id
						}
					})
					
				})
			},
			async getList(){
				let that = this;
				let params = {}
				await tools.request("/api/job/showPositionLevel.json", params,1,true).then(function(data) {
					that.jobList = data.positionLevelList;
					
					that.jobList.map( item => {
						that.jobNameList.push(item.name);
					})
					
					if(that.jobList.length > 0){
						that.levelId = that.jobList[0].id
					}
				})
			},
			bindJobChange(event){
				this.index = event.detail.value
				this.levelId = this.jobList[this.index].id;
				console.log(this.levelId)
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
				console.log(this.minPrice)
				console.log(typeof this.minPrice)
				if(tools.isEmpty(this.company.toString(),"请输入公司名称")){return;}
				if(tools.isEmpty(this.minPrice.toString(),"请输入最低薪酬")){return;}
				if(tools.isEmpty(this.maxPrice.toString(),"请输入最高薪酬")){return;}
				if(tools.isEmpty(this.year.toString(),"请输入工作年限")){return;}
				if(tools.isEmpty(this.telephone.toString(),"请输入联系电话")){return;}
				if(tools.isEmpty(this.address.toString(),"请输入工作地址")){return;}
				if(tools.isEmpty(this.content.toString(),"请输入工作内容")){return;}
				let that = this;
				let params = {
					levelId:this.levelId,//职位名称主键id
					maxPrice:this.maxPrice,
					minPrice:this.minPrice,
					education:this.education,
					year:this.year,
					telephone:this.telephone,
					address:this.address,
					content:this.content,
					company:this.company,
					sex:this.sex
				}
				if(that.id != ""){
					params.id = that.id;
					tools.request("/api/job/editPosition.json", params,1,true).then(function(data) {
						tools.toastJumpBack("编辑成功","/pages/myjoblist/myjoblist");
					})
					return;
				}
				tools.request("/api/job/addPosition.json", params,1,true).then(function(data) {
					tools.toastJumpTab("发布招聘成功","/pages/joblist/joblist");
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
