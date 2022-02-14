import User from "./user.js";
import appconfig from "./appconfig.js";

// 网络监听
const NetWork = {
	// 网络状态
	isConnect:false,
	// 监听网络状态
	On(){
		// 获取当前网络状态
		uni.getNetworkType({
			success: (res) => {
				if(res.networkType!=='none'){ this.isConnect=true; return;}
				// plus.nativeUI.toast('无网络')
			}
		})
		// 监听网络状态变化
		uni.onNetworkStatusChange((res)=>{
			this.isConnect = res.isConnected;
			if(!res.isConnected){
				// uni.showToast({title:'网络连接已断开',icon:'none'})
			} else {
				// uni.showToast({title:'网络已连接',icon:'none'})
				// plus.nativeUI.toast('网络已连接')
				// 初始化用户状态
				User.__init();
				// 初始化配置 
				appconfig.__init();
			}
		})
	}
}



export default {
	NetWork
}