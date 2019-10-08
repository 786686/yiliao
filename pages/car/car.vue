<template>
	<view class="content">
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
		 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
	const tools = require('../../common/tools.js');
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#007AFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
			}
		},
		onLoad() {
			// this.getList();
		},
		methods: {
			onCancel(e) {
				console.log(e)
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.pickerSingleArray
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show()
			},
			// 二级联动选择
			showMulLinkageTwoPicker() {
				this.pickerValueArray = this.mulLinkageTwoPicker
				this.mode = 'multiLinkageSelector'
				this.deepLength = 2
				this.pickerValueDefault = [0, 0]
				this.$refs.mpvuePicker.show()
			},
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				console.log(e)
				this.pickerText = JSON.stringify(e)
			}
		}
	}
</script>




				<!-- <image src="../../static/logo.png" mode=""></image>
				<view class="item-attr">
					<view class="item-top">
						<view class="name">
							{{item.description}}
						</view>
						<view class="company">
							上海皮皮鸭制药有限公司
						</view>
						<view class="standard">
							药品规格/单位
						</view>
						<view class="item-price">
							<view class="item-price"><text class="item-price-dec">供货价</text>¥{{item.purchasePrice}}</view>
							<view class="item-price"><text class="item-price-dec">puls会员价</text>¥{{item.plusPrice}}</view>
						</view>
					</view>
					<view class="item-bottom">
						<view class="mem-price">
							<text class="item-price-dec">会员价</text>¥{{item.memberPrice}}
						</view>
						<view class="amount-inp">
							<button type="primary">-</button>
							<input type="text" v-model="item.purchaseNum" />
							<button type="primary">+</button>
						</view>
					</view>
				</view> -->