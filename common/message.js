//  
// {
	// 	type:'post',	// 来自动态的消息
	//	mtype:1,		// 1赞  2评论
	// 	from_id:'',		// 来自用户id
	// 	to_id:'',		// 发送给用户id
	// 	from_userpic:'',		// 来自用户的头像
	// 	from_username:'',	// 来自用户头像 
	// 	from_post:'', 	// 来自文章（文字内容）
	// 	from_postid:'', 	// 来自文章id
	// },
	// {
	// 	type:'post', 	//
	// 	mtype:2,		// 评论
	// 	from_id:''		// 来自用户id
	// 	to_id:'',		// 发送给用户id
	// 	from_userpic:'',		// 来自用户的头像
	// 	from_username:'',	// 来自用户头像 
	// 	from_post:'', 	// 来自文章（文字内容）
	// 	from_postid:'', 	// 来自文章id
	// 	data:'', 	// 评论内容
	// },
//
// 写入储存

//
/**
 * 需要引入：
 * 	配置文件     import Config from "../../common/config.js";
 * 	用户操作类库  import User from "../../common/user.js";
 *  时间类库     import Time from "../../common/time.js";
 * 	request.js;
 * */
 import Config from "./config.js";
 import User from "./user.js";
 import Time from "./time.js";
 import $http from "./request.js";
 
 export default {
 	// socket地址
 	url:Config.websocketUrl,
	// 连接状态
	IsOpen:false,
	// SocketTask
	SocketTask:false,
	// 是否上线（会员id绑定客户端id，验证用户身份，通过则绑定）
	IsOnline:false, 
	// 当前聊天对象（进入聊天页面获取）
	CurrentToUser:{
		userid:0, // 通过判断userid是否为0，当前用户处在什么场景下 ( 是否在聊天页 )
		username:"",
		userpic:""
	},
	isMessagePage:false,  	// ( 是否在信息页 )
	// haveUnread:false,
	// 连接
	Open(){
		if(this.IsOpen) return; // 防止重复连接
		// 连接
		this.SocketTask = uni.connectSocket({
			url:this.url,
			complete: (e)=> { },
		});
		if (!this.SocketTask) return;
		// 监听开启
		this.SocketTask.onOpen(()=>{
			// 将连接状态设为已连接
			this.IsOpen = true;
			// 用户绑定
			//this.UserBind();
		});
		// 监听信息
		this.Message();
		// 监听关闭
		this.SocketTask.onClose(()=>{
			this.IsOpen = false;
			this.SocketTask = false;
		});
		// 监听错误
		this.SocketTask.onError((e)=>{
			this.IsOpen = false;
			this.SocketTask = false;
		});
	},
	// 关闭连接
	Close(){
		if (this.IsOpen){
			this.SocketTask.close();
			uni.$emit('socketClose');
			// return uni.removeTabBarBadge({
			// 	index:Config.TabbarIndex
			// });
		}
	},
	// 用户绑定
	UserBind(client_id){
		// let obj = {
		// 	token:uni.getStorageSync('token'),
		// 	type:'bind'
		// };
		// this.SocketTask.send({
		// 	data:JSON.stringify(obj)
		// });
		$http.post('/message/bind',{
			type:'bind',
			client_id:client_id
		},{
			token:true
		}).then(data=>{
			let [err,res] = data;
			console.log(res)
			// 错误处理
			if (!$http.errorCheck(err,res)) {
				// 退出登录，重新链接等处理
				uni.navigateTo({
					url:'/pages/user-login/user-login'
				})
				return;
			}
			// 成功
			return this.resultUserBind(res.data.data);
		});
	},
	// 用户绑定结果
	resultUserBind(res){
		if (res.status && res.type == 'bind') {
			// 改为上线状态
			this.IsOnline = true;
			// 获取总未读数,并且渲染到tabbar的badge
			// this.initTabbarBadge();
			// 获取未读信息
			this.getChatMessages();
			return;
		}
		// 绑定失败,断开连接
		// uni.showToast({ title: res.msg, icon:"none" });
		this.SocketTask.close();
	},
	// 接收未读信息
	getChatMessages(){
		$http.post('/message/get',{},{
			token:true,
		}).then((data)=>{
			let [err,res] = data;
			// console.log(res)
			if (!err && res && res.statusCode === 200 && res.data.data.length > 0) {
				var unread = res.data.data.reverse()
				uni.setStorageSync('haveUnread',true)
				uni.$emit('newMessage')
				// console.log(JSON.stringify(unread.reverse()) )
				var getdata = uni.getStorageSync('postMessages_'+User.userinfo.id)
				if(getdata){
					uni.setStorageSync('postMessages_'+User.userinfo.id,unread.concat(getdata))
				} else {
					var data = []
					data.concat(res)
					uni.setStorageSync('postMessages_'+User.userinfo.id,data)
				}
			}
		});
	},
	// 监听信息
	Message(){
		this.SocketTask.onMessage((e)=>{
			// 字符串转json
			let res = JSON.parse(e.data);
			// console.log(res)
			// 绑定返回结果
			if (res.type == 'bind'){
				//return this.resultUserBind(res);
				return this.UserBind(res.data);
			}
			if(res.type == 'post'){
				// plus.push.createMessage('')
				if(!this.isMessagePage){
					// this.haveUnread = true
					uni.setStorageSync('haveUnread',true)
					uni.$emit('newMessage')
				}
				if(res.mtype=='1'){
					plus.push.createMessage(res.from_username+' 赞了你的动态')
				} else if(res.mtype=='2'){
					plus.push.createMessage(res.from_username+' 评论了你的动态')
				}
				
				return this.postMessage(res)
			}
			
		})
		// console.log('监听信息')
	},
	postMessage(res){
		// console.log('来自type 为 post 的消息:'+res)
		var getdata = uni.getStorageSync('postMessages_'+User.userinfo.id)
		if(getdata){
			getdata.unshift(res)
			uni.setStorageSync('postMessages_'+User.userinfo.id,getdata)
		} else {
			var data = []
			data.push(res)
			uni.setStorageSync('postMessages_'+User.userinfo.id,data)
		}
		uni.$emit('messageListUpdate')
	},
	// 发送消息
	async send(data){
		console.log('调用了message->send')
		console.log(data)
		 let [err,res] = await $http.post('/message/send',data,{
		 	token:true,
		 	checkToken:true,
		 	checkAuth:true
		 });
		 // console.log(res)
	},
}