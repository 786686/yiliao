<template>
	<view class="content">
		<view class="search-inp">
			<view class="search-inp-in">
				<image src="../../static/a5_ic_search.png" class="icon-search"></image>
				<input type="text" placeholder="搜索医生或诊所" v-model="search" @input="input" focus />
			</view>
			<view class="search-cancel" @click="cancel">取消</view>
		</view>
		<view class="index-select">
			<view class="item">
				<picker class="picker-item" @click="classBool = !classBool" @change="bindSectionChange" :value="index" :range="sectionNameList">{{sectionList[index].name}}
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
		<view class="search-list">
			<view class="item" v-for="(item,index) in items" :key="index" @click="detail(item.id,item.searchType)">
				{{item.name}}
			</view>
		</view>
	</view>
</template>
<script>
	const tools = require('../../common/tools.js');
	const server = require('../../common/server.js');
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				search: '',
				items: [],
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

				timer: null,
				pageNumber: 1,
				hasData: true

			}
		},
		onLoad() {
			this.getSectionList();
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
			onCancel(e) {
				console.log(e);
				this.areaId = "";
				this.areaText = "地区";
				this.areaBool = !this.areaBool
				this.hasData = true;
				this.pageNumber = 1;
				this.items = [];
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
				this.hasData = true;
				this.pageNumber = 1;
				this.items = [];
				this.getList();
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
				this.items = [];
				this.hasData = true;
				this.pageNumber = 1;
				this.getList();
				this.classBool = !this.classBool;
			},
			cancel() {
				tools.jumpToTab("/pages/index/index");
			},
			detail(id, type) {
				if (type == 1) {
					tools.jumpTo("/pages/doctor/doctor?id=" + id)
				} else if (type == 2) {
					tools.jumpTo("/pages/outpatient/outpatient?id=" + id)
				}
			},
			input() {
				this.items = [];
				this.hasData = true;
				this.pageNumber = 1;
				this.getList();
			},
			async getList() {
				let that = this;
				if (this.search.trim() == "") {
					return;
				}

				if (!that.hasData) {
					return false;
				}
				uni.showNavigationBarLoading();

				let params = {
					searchType: 1,
					pageNumber: this.pageNumber,
					pageSize: 10,
					search: this.search,
					departmentId: this.departmentId,
					areaId: this.areaId
				}
				let doctorList = [],hospitalList = [];
				//医生
				await tools.request("/api/index/searchDoctorOrHospital.json", params).then(function(data) {
					
					// for(let i=0;i<data.doctorList.length;i++){
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
					that.items = that.items.concat(doctorList)
					that.items = that.items.concat(hospitalList)
					that.pageNumber++; //每触底一次 page +1
					uni.hideNavigationBarLoading(); //关闭加载动画
				},200)
			}
		}
	}
</script>
