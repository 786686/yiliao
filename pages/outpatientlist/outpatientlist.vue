<template>
	<view class="content">
		<view class="search-inp">
			<view class="search-inp-in">
				<image src="../../static/a5_ic_search.png" class="icon-search"></image>
				<input type="text" placeholder="搜索医生或诊所" @input="input" v-model="search" />
			</view>
			<image src="../../static/home_ic_more.png" mode="" class="icon-msg" @click="msg"></image>
		</view>
		<view class="index-select">
			<view class="item">
				<picker class="picker-item" @click="classBool = !classBool" @cancel="classBool = !classBool" @change="bindSectionChange"
				 :value="index" :range="sectionNameList">{{sectionList[index].name}}
					<image :src="classBool?'../../static/a6_icon_more.png':'../../static/a_icon_more_g2.png'" mode=""></image>
				</picker>
			</view>
			<view class="item" @click="showMulLinkageThreePicker">
				{{areaText}}
				<image :src="areaBool?'../../static/a6_icon_more.png':'../../static/a_icon_more_g2.png'" mode=""></image>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
			 @onCancel="onCancel" @onConfirm="onConfirm">
			</mpvue-city-picker>
		</view>
		<view class="outpatientlist">
			<view class="item" v-for="(item,index) in doctorList" @click="detail(item.id,1)" :key="index">
				<image :src="item.avatar" mode="" class="icon-avatar"></image>
				<view class="item-msg">
					<view class="item-top">
						<view class="item-top-in">
							<view class="item-name">{{item.name}}</view>
							<view class="item-grade">{{item.doctorLevel}}</view>
						</view>
						<view class="item-status" @click.stop="collect(item.id,item.ifCollection,index)">
							<image :src="item.ifCollection==1?'../../static/a4_ic_love_g.png':'../../static/a4_ic_love.png'" mode="" class="icon-collect"></image>
							{{item.ifCollection == 1?'已':''}}收藏
						</view>
					</view>
					<view class="item-hosipital">{{item.hospital}}/{{item.departmentString}}</view>
					<view class="item-amount">服务人次：{{item.servicesNum}}</view>
				</view>
			</view>

			<view class="item" v-for="(item,index) in hospitalList" @click="detail(item.id,2)" :key="index">
				<view class="item-msg">
					<view class="item-top">
						<view class="item-top-in">
							<view class="item-name">{{item.name}}</view>
						</view>
					</view>
					<view class="item-address">地址：{{item.address}}</view>
					<view class="item-intro">简介：{{item.intro}}</view>
					<view class="item-amount">服务人次：{{item.servicesNum}}</view>
				</view>
			</view>

			<empty v-if="hospitalList.length == 0 && doctorList.length == 0"></empty>
		</view>
	</view>
</template>

<script>
	import search from '../headsearch/headsearch.vue'
	const tools = require('../../common/tools.js');
	const server = require('../../common/server.js');
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	// import cityData from '../../common/new-city.data.js';

	import empty from '../empty/empty.vue';
	export default {
		components: {
			empty,
			mpvueCityPicker,
			search
		},
		data() {
			return {
				themeColor: '#007AFF',
				classBool: false,
				index: 0,
				sectionList: [],
				departmentId: "",
				sectionNameList: [],
				doctorList: [],
				server: server.domain,
				cityPickerValueDefault: [0, 0, 1],
				areaId: "",
				areaText: "地区",
				areaBool: false,
				hospitalList: [],
				loginBool: false,
				search: "",

				timer: null,
				pageNumber: 1,
				hasData: true


			}
		},
		onLoad() {
			this.getSectionList();
			if (uni.getStorageSync("sessionId") != "" && uni.getStorageSync("sessionId") != null) {
				this.loginBool = true;
			}
		},


		onPullDownRefresh: function() {
			//下拉刷新的时候请求一次数据
			this.getList();
		},
		onReachBottom: function() {
			//触底的时候请求数据，即为上拉加载更多
			//为了更加清楚的看到效果，添加了定时器
			if (this.timer != null) {
				clearTimeout(this.timer);
			}
			let that = this;
			this.timer = setTimeout(function() {
				that.getList();
			}, 1000);
		},
		methods: {
			collect(id, ifCollection, index) {
				if (!this.loginBool) {
					uni.showModal({
						content: "需要登录才能收藏该推文，\n是否去登录",
						confirmText: "去登录",
						confirmColor: "#DD3535",
						cancelColor: "#999",
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "/pages/login/login"
								})
							}
						}
					})
					return;
				}
				let that = this;
				let params = {
					typeId: id,
					type: 1,
					status: ifCollection == 1 ? 2 : 1
				};
				tools.request("/api/index/isCollection.json", params, 1, true).then(function(data) {
					if (ifCollection == 1) {
						tools.toast("已取消收藏");
					} else {
						tools.toast("已收藏");
					}
					that.doctorList[index].ifCollection = that.doctorList[index].ifCollection == 1 ? 2 : 1;
				})

			},
			input() {
				this.doctorList = [];
				this.hospitalList = [];
				this.hasData = true;
				this.pageNumber = 1;
				this.getList();
			},
			onCancel(e) {
				console.log(e);
				this.areaId = "";
				this.areaText = "地区";
				this.areaBool = !this.areaBool
				this.doctorList = [];
				this.hospitalList = [];
				this.hasData = true;
				this.pageNumber = 1;
				this.getList();
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
				this.areaBool = !this.areaBool
			},
			onConfirm(e) {
				console.log(e)
				this.areaId = e.cityCode;
				this.areaText = e.label;
				this.areaBool = !this.areaBool
				this.doctorList = [];
				this.hospitalList = [];
				this.hasData = true;
				this.pageNumber = 1;
				this.getList();
			},
			detail(id, type) {
				if (type == 1) {
					tools.jumpTo("/pages/doctor/doctor?id=" + id)
				} else if (type == 2) {
					tools.jumpTo("/pages/outpatient/outpatient?id=" + id)
				}
			},
			async getList() {
				let that = this;

				if (!that.hasData) {
					return false;
				}
				uni.showNavigationBarLoading();


				let params = {
					pageSize: 10,
					pageNumber: this.pageNumber,
					searchType: 1,
					departmentId: this.departmentId,
					areaId: this.areaId,
					search: this.search,
				};
				if (tools.isLogin()) {
					params.sessionId = uni.getStorageSync("sessionId")
				}
				
				let doctorList = [],hospitalList = [];
				//医生
				await tools.request("/api/index/searchDoctorOrHospital.json", params).then(function(data) {
					for (let i in data.doctorList) {
						data.doctorList[i].searchType = 1;
					}
					doctorList = data.doctorList;
				})
				params.searchType = 2;
				await tools.request("/api/index/searchDoctorOrHospital.json", params).then(function(data) {
					for (let i in data.hospitalList) {
						data.hospitalList[i].searchType = 2;
					}
					
					hospitalList = data.hospitalList
				})
				setTimeout(function(){
					if (doctorList.length == 0 && hospitalList.length == 0) { //没有数据
						that.hasData = false;
						uni.hideNavigationBarLoading(); //关闭加载动画
						return;
					}
					that.doctorList = that.doctorList.concat(doctorList)
					that.hospitalList = that.hospitalList.concat(hospitalList)
					that.pageNumber++; //每触底一次 page +1
					uni.hideNavigationBarLoading(); //关闭加载动画
				},200)
			},
			getSectionList() {
				let that = this;
				tools.request("/api/index/departmentList.json", {}).then(function(data) {
					that.sectionList.push({
						name: "全部",
						id: ""
					});
					that.sectionList = that.sectionList.concat(data.departmentDTOList);

					that.sectionList.map(item => {
						that.sectionNameList.push(item.name);
					})

					if (that.sectionList.length > 0) {
						that.departmentId = that.sectionList[0].id
					}
					that.getList();
				})
			},
			bindSectionChange(event) {
				this.index = event.detail.value
				this.departmentId = this.sectionList[this.index].id;
				console.log(this.departmentId)
				this.doctorList = [];
				this.hospitalList = [];
				this.hasData = true;
				this.pageNumber = 1;
				this.getList();
				this.classBool = !this.classBool;
			},
		}
	}
</script>
