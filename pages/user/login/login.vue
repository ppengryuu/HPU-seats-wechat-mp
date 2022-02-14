<template>
	<view class="body">
		<navigation-custom :config="config" @buttonTap="publicM.cusNavOnlyBack"/>
		 
		<view class="login-title">
			登录/注册
		</view>
		<view class="policy-confirm">
			<view>登录/注册即代表您同意</view>
			<navigator url="../../json-docView/json-docView?url=/app/bof.json&useJsonBUrl=true" hover-stay-time="100">服务协议＆隐私政策</navigator>
		</view>
		
		<view>
			<view class='header'>
				<image src='../../../static/app.jpg'></image>
			</view>
			<view class='content'>
				<view>申请获取以下权限</view>
				<text>获得你的公开信息(昵称，头像、地区等)</text>
			</view>
			<button class='wx-verify-button' hover-class="verify-button-hover" type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="tologin()">授权登录</button>
			
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				app_icon:"",
				config:{
					title:"登录/注册", //title
					bgcolor:"#f8f8f8", //背景颜色
					fontcolor:'#0c0c0c',
					type:1, //type 1，3胶囊 2，4无胶囊模式
					buttons:[
						{
							iconfont:"icon-fanhui",
							text:"返回"
						}
					]
				},
			}
		},
		onLoad(){
			this.app_icon = uni.getStorageSync('appConfig').app_icon_url
		},
		watch:{
			
		},
		methods: {
			//微信登录
			tologin() {
				this.User.wxlogin()
			},
		}
	}
</script>

<style>
	.policy-confirm{
		font-size: 24rpx;
		padding: 20rpx 50rpx;
		box-sizing: border-box;
	}
	.policy-confirm>view{
		color: #929292;
	}
	.policy-confirm>navigator{
		color: #00AAFF;
		font-size: 24rpx;
		background: rgb(255, 255, 255)!important;
	}
	.login-title{
		padding: 0 50rpx 50rpx 50rpx;
		box-sizing: border-box;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 60rpx;
		font-weight: bold;
		/* background: #007AFF; */
	}
	
	.wx-verify-button{
		margin: 0 30rpx;
	}
	
	.header {
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}
		
	.header image {
		border: 1rpx solid #EEEEEE;
		border-radius: 50%;
		width: 200rpx;
		height: 200rpx;
	}
		
	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}
		
	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
		font-size: 30rpx;
	}
	
	page{
		background: #FFFFFF;
	}
</style>
