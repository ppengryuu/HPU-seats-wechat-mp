<template>
	<view>
		<navigation-custom :config="config" @buttonTap="publicM.cusNavOnlyBack"/>
		<view class="options">
			<view style="width: 100%;height: 30upx;background: rgb(242,246,245);"></view>
			<view v-if="token" class="useropt u-f-jsb u-f-ac">
				<view class="aboutuser u-f">
					<view class="userpic">
						<image :src="userinfo.avatar" mode="aspectFill"></image>
					</view>
					<view class="userinfo">
						<view class="username">{{userinfo.nickname}}</view>
						<view class="usernum">用户ID: {{userinfo.id}}</view>
					</view>
				</view>
			</view>
			<view v-else class="notlogin-tip u-f-jsb u-f-ac">
				<view class="notlogin-tip-l u-f">
					<view class="usernum">未登录</view> 
				</view>
			</view>
			
			<view style="width: 100%;height: 30upx;background: rgb(242,246,245);"></view>
			<option-list :listicon="''" :listtext="'我的绑定'" navigateTo="./bind-libseat/bind-libseat" :checkToken="true"></option-list>
			<!-- <option-list :listicon="''" :listtext="'我的积分'" navigateTo="./points/points" :checkToken="true"></option-list> -->
			<view style="width: 100%;height: 30upx;background: rgb(242,246,245);"></view>
			<option-list :listicon="''" :listtext="'协议和政策'" :navigateTo="'../json-docView/json-docView?url=/app/bof.json&useJsonBUrl=true'"></option-list>
			<view style="width: 100%;height: 30upx;background: rgb(242,246,245);"></view>
			<option-list :listicon="''" :listtext="'关于'" :navigateTo="'../about/about'"></option-list>
			<view style="width: 100%;height: 30upx;background: rgb(242,246,245);"></view>
			
			<option-list v-if="userinfo" :listicon="''" :listtext="'退出登录'" fontColor="#ff3542" @optiontap="logout"></option-list>
			<option-list v-else :listicon="''" :listtext="'立即登录'" fontColor="#00AAFF" @optiontap="login"></option-list>
			
			
		</view>
		
		
	</view>
</template>

<script>
	import optionList from '../../components/option-list/option-list.vue';
	export default {
		components: {
			optionList
		},
		data() {
			return {
				token:false,
				userinfo: {},
			}
		},
		onLoad() {
			this.updatepage()
			uni.$on('logoutSuccess',this.updatepage)
			uni.$on('loginSuccess',this.updatepage)
		},
		methods: {
			login(){
				uni.navigateTo({
					url:"login/login"
				})
			},
			logout(){
				uni.showModal({
					title:"提示",
					content:"确认退出登录吗",
					success: (res) => {
						if(res.confirm){
							this.User.logout()
						}
					}
				})
			},
			updatepage(e){
				// console.log(e)
				var token = this.User.token
				this.token = token
				this.userinfo = this.User.userinfo
			},
			test(){
				uni.navigateTo({
					url:"../json-docView/json-docView"
				})
			}
		}
	}
</script>

<style>
	page{
		background: rgb(242,246,245);
	}
	.button-hover{
		background: #0093dc!important;
	}
	.userinfo{
		/* margin-left: 25upx; */
	}
	.username{
		font-size: 35upx;
	}
	.userpic>image{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
	}
	.userpic{
		display: flex;
		align-items: center;
		margin: 18rpx;
	}
	.notlogin-tip-l{
		width: 97%;
		margin-left: 3%;
		padding: 20upx 0;
		align-items: center;
		color: #b6b6b6;
	}
	.notlogin-tip{
		width: 100%;
		display: flex;
		border-bottom: 1upx solid #EEEEEE;
	}
	.useropt{
		width: 100%;
		display: flex;
		border-bottom: 1upx solid #EEEEEE;
	}
	.aboutuser{
		width: 97%;
		margin-left: 3%;
		padding: 20upx 0;
		align-items: center;
	}
	.options{
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		width: 100%;
		position: absolute;
	}
</style>
