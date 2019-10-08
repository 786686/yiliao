<template>
	<view class="content">
		<view class="set-list">
			<view class="item">
				<view class="item-l">姓名</view>
				<view class="item-r"><input type="text" v-model="name" placeholder="请输入姓名"></view>
			</view>
			<view class="item">
				<view class="item-l">身份证号</view>
				<view class="item-r"><input type="idcard" v-model="idNumber" placeholder="请输入身份证号"></view>
			</view>
			<view class="item">
				<view class="item-l">性别</view>
				<view class="item-r">
					<picker @change="bindSexChange" :value="sexIndex" :range="sexList">
						<view class="uni-input">{{sexList[sexIndex]}}</view>
					</picker>
				</view>
			</view>
			<view class="item">
				<view class="item-l">出生日期</view>
				<view class="item-r">
						<picker mode="date" :value="birth" @change="bindTimeChange">
							<view class="uni-input">{{birth}}</view>
						</picker>
					</view>
			</view>
			<!-- <view class="item">
				<view class="item-l">联系电话</view>
				<view class="item-r"><input type="text" v-model=""></view>
			</view> -->
			<view class="item">
				<view class="item-l">联系地址</view>
				<view class="item-r"><input type="text" v-model="contactAddress" placeholder="请输入联系地址"></view>
			</view>
		</view>
		
		<view class="btn-save" @click="submit">
			保存
		</view>
	</view>
</template>

<style lang="scss">
	.set-list{
		color: #333;
		padding: 0 25upx;
		.item{ 
		height: 100upx;
		font-size: 30upx;
		padding: 0 6upx 0 18upx;
		display: flex; justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #E6E6E6;
		.item-l{ width: 180upx;}
		.item-r{flex:1;}
		}
	}
</style>
<script>
	const tools = require('../../common/tools.js');
	export default {
		data() {
			const birth = this.getDate();
			return {
				birth,
				name:"",
				idNumber:"",
				contactAddress:"",
				sex:"1",
				
				sexIndex:0,
				sexList:['男','女']
			}
		},
		onLoad() {
this.getDetail()
		},
		methods: {
			getDetail(){
				let that = this;
				let params = {
				}
				tools.request("/api/my/getMyInfo.json", params,1,true).then(function(data) {
					that.item = data;
					that.name =  that.item.name;
					that.sex =  that.item.sex == 2?2:1;
					if(that.item.birth == ""){
						that.birth =  that.getDate()
					}else{
						that.birth =  that.item.birth;
					}
					
					that.contactAddress =  that.item.contactAddress;
					that.idNumber =  that.item.idNumber;
				})
			},
			bindTimeChange(event){
				this.birth = event.detail.value;
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindSexChange(event){
				this.sexIndex = event.detail.value
				this.sex = parseInt(this.sexIndex)+1;
				console.log(this.sex)
			},
			submit(){
				
				if(tools.isEmpty(this.name,"请输入姓名")){return;}
				if(tools.isEmpty(this.idNumber,"请输入身份证号")){return;}
				if(tools.isEmpty(this.contactAddress,"请输入联系地址")){return;}
				
				let that = this;
				let params = {
					name: this.name,
					sex: this.sex,
					birth: this.birth,
					contactAddress: this.contactAddress,
					idNumber:this.idNumber,
					avatar: uni.getStorageSync('avatarUrl')
				}
				
				tools.request("/api/index/updateUserInfo.json", params,1,true).then(function(data) {
					tools.toastJumpTab("登记成功","/pages/my/my");
				})
			}
		}
	}
</script>

