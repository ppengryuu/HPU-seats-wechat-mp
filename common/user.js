import $http from "./request.js";
import $message from "./message.js";
import publicM from "./public.js";
import appconfig from "./appconfig.js";

export default {
	// 用户token 测试token：4cd36bf70649475ac0cd6fae78250954474a4350
	token:false,
	// 用户信息
	userinfo:false,
	__init(){
		// 获取用户信息
		this.userinfo = uni.getStorageSync("userinfo");
		this.token = uni.getStorageSync("token");
		// if (this.userinfo.id) {
		// 	// 连接socket
		// 	$message.Open();
		// }
	},
	// 微信小程序端微信登录
	async wxlogin(options ={}){
		uni.showLoading({ title: '登录中...', mask: true });
		uni.login({
			provider: 'weixin',
			success: (res) => {
				console.log(JSON.stringify(res))
				console.log('login success:', res);
				
				uni.getUserInfo({
				  provider:'weixin',
				  lang:"zh_CN",
				  success: async (infoRes)=> {
					console.log(infoRes)
					let userinfo = infoRes.userInfo
					var payload = {
						code:res.code,
						nickName:userinfo.nickName,
						avatarUrl:userinfo.avatarUrl,
						sex:userinfo.gender,
						path:userinfo.province+'-'+userinfo.city,
					}
					let [err1,res1] = await $http.post('/user/wxmplogin', payload);
					if(!$http.errorCheck(err1,res1)){
						return false;
					}
					// let result = res1.data.data
					// console.log(result)
					// 登录成功 保存状态
					// 登录成功 保存状态
					console.log(res1)
					this.token = res1.data.data.token;
					this.userinfo = res1.data.data;
					// 本地存储
					uni.setStorageSync("userinfo",this.userinfo);
					uni.setStorageSync("token", this.token);
					// 连接socket
					// 获取绑定信息
					this.getLibseatBind()
					// 成功提示
					uni.showToast({
						title:"登录成功",
						icon:"none"
					})
					uni.$emit('loginSuccess')
					uni.navigateBack({ delta: 1 });
				  },
				  complete: () => {
				  	uni.hideLoading()
				  }
				});
				// 更新保存在 store 中的登录状态 
				console.log('登录成功，保存到本地存储，修改当前用户登录状态')
			},
			fail: (err) => {
				console.log('login fail:', err);
				uni.showToast({
					title:err.errMsg,
					icon:"none"
				})
			}
		});
	},
	// 获取图书馆系统绑定数据
	async getLibseatBind(){
		let [err,res] = await $http.get('/user/libseat/bind/info', {}, {
			token: true,
			checkToken: true
		});
		console.log(res)
		if (!$http.errorCheck(err,res)) return;
		var temp = res.data.data
		if(!temp) return;
		uni.setStorageSync('lsBind', temp)
	},
	// 退出登录
	async logout(showToast = true){
		// 退出登录
		uni.showLoading({ title: '退出登录...' , mask : true});
		await $http.post('/user/logout',{},{ 
			token:true,
			checkToken:true ,
		});
		// 清除缓存
		// uni.clearStorageSync()
		uni.clearStorage()
		uni.getSavedFileList({
			success: (e) => {
				for(var t=0;t<e.fileList.length;t++){
					uni.removeSavedFile({
						filePath: e.fileList[t].filePath
					})
				}
			}
		})
		appconfig.__init();
		// 清除状态
		this.token = false;
		this.userinfo = false;
		// 关闭socket
		// 退出成功
		uni.$emit('logoutSuccess')
		uni.hideLoading();
		uni.switchTab({
			url:"/pages/index/index",
			complete: (e) => {
				console.log(e)
			}
		})
		// 跳转到登录页面
		if (showToast) {
			return uni.showToast({
				title:"退出登录成功",
				icon:"none"
			})
		}
	},
	
}
