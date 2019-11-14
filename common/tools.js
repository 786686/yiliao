let server = require('./server.js');
let tools = {
	toast(msg, status) {
		if (!status) {
			status = "success"
		} else if (status == "loading") {
			status = "loading"
		} else {
			status = "none"
		}
		uni.showToast({
			title: msg,
			icon: status
		})
	},
	toastJump(msg, url) {
		uni.showToast({
			title: msg,
			icon: "success"
		})
		setTimeout(() => {
			tools.jumpTo(url);
		}, 1000);
	},
	toastJumpTab(msg,url){
		uni.showToast({
			title: msg,
			icon: "success"
		})
		setTimeout(() => {
			tools.jumpToTab(url);
		}, 1000);
	},
	toastJumpBack(msg,url){
		
		uni.showToast({
			title: msg,
			icon: "success"
		})
		setTimeout(() => {
			uni.navigateBack({
				url: url
			})
		}, 1000);
		
	},
	isLogin() {
		if (uni.getStorageSync("sessionId") != "" && uni.getStorageSync("sessionId") != null) {
			return true;
		} else {
			return false;
		}
	},
	toLogin() {
		if (uni.getStorageSync("sessionId") != "" && uni.getStorageSync("sessionId") != null) {
			return false;
		} else {
			tools.jumpTo("/pages/login/login");
			return true;
		}
	},
	isEmpty(val, msg) {
		if (val.trim().length == 0) {
			tools.toast(msg,"none");
			return true;
		} else {
			return false;
		}
	},
	request(url, param, requestTimes, loginBool) {
		let that = this;
		requestTimes = requestTimes || 1;
		loginBool = loginBool && true;
		return new Promise(function(resolve, reject) {
			that.requestByLogin({
					url: url,
					isRes: true,
					isFormData: true,
					data: param
				},
				res => {
					resolve(res);
				},
				err => {
					reject(err);
				},
				requestTimes, loginBool
			);
		});
	},
	requestByLogin(request, callback, errCallback, requestTimes, loginBool) {
		let that = this;
		// requestTimes = requestTimes || 1;
		// loginBool = loginBool && true;
		let sessionId = uni.getStorageSync('sessionId') || '';
		if (!request.url.includes('sid')) {
			let flag = request.url.includes('?') ? '&' : '?';
			request.url = request.url
			if (loginBool) {
				request.url += `${flag}sessionId=` + sessionId;
			}
		} else {
			var lac = request.url.indexOf("sid");
			request.url = request.url.substr(0, lac + 4);
			request.url = request.url + sessionId;
		}
		if (!request.url.includes('http')) {
			request.url = `${server.domain}${request.url}`;
		}
		request.method = (request.method || 'post').toUpperCase();

		if (request.isFormData) {
			request.header = request.header || {};
			request.header['content-type'] = 'application/x-www-form-urlencoded';
		}

		uni.request({
			url: request.url,
			data: request.data,
			header: request.header,
			method: request.method,
			dataType: request.dataType,
			success: function(res) {
				console.log(res.data.status )
				if (res.data.status == 2000000) {
					let data = null;
					// request.isRes && (data = res.data);
					// !request.isRes && (data = res.data.data);
					data = res.data.data;
					callback && callback(data);
				} else if (res.data.status == 5000003) {
					tools.toLogin();
					tools.toastJump("个人信息", "/pages/personmsg/personmsg");
				} else if (res.data.status == -3) {
					if (requestTimes % 5 !== 0) {
						that.login().then(() => {
							setTimeout(function() {
								that.requestByLogin(request, callback, errCallback, requestTimes);
							}, 1000 * requestTimes++);
						});
					}
				} else if (res.data.status == 5000101 || res.data.status == 5000009) {
					if (sessionId != "") {
						uni.showToast({
							title: "用户已过期",
							icon: 'loading'
						});
					} else {
						uni.showToast({
							title: "用户未登录",
							icon: 'loading'
						});
					}
					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/login/login',
						})
					}, 2000);
				} else if (res.data.status ==5000022) {
					callback({});
				} else if (res.data.status ==5000023) {
					console.log(12)
					uni.showModal({
						content: "你还未完善简历，为了能最大程度匹配上您的需求，请完善简历！",
						confirmText: "完善简历",
						cancelText: "我再看看",
						cancelColor:"#999",
						confirmColor:"#007AFF",
						success: function(res) {
							if (res.confirm) {
								tools.jumpTo("/pages/myjob/myjob");
							}
						}
					})
				} else {
					if (errCallback) {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
						errCallback(res)
					}
				}
			}
		});
	},

	getImg(status) {
		if (status == 2) {
			// return "../../static/a4_ic_love.png"
		} else {
			return ""
		}
	},
	jumpTo(url) {
		uni.navigateTo({
			url
		})
	},
	jumpToTab(url) {
		uni.switchTab({
			url
		})
	}
}

module.exports = tools;
