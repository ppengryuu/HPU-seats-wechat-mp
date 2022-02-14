<template>
	<view>
		<view class="step2-body">
			<view class="step-title">
				<view>{{'绑定图书馆座位预约系统'}}</view>
				<navigator url="../../json-docView/json-docView?url=/app/lsbind-help.json&useJsonBUrl=true" hover-stay-time="100">查看如何绑定？</navigator>
			</view>
			
			<view class="hb-style-input">
				<input class="uni-input" type="text" v-model="post_data.ls_num" placeholder="学号"/>
				<view class="empty-val-button u-f-ajc">
					<view class="icon iconfont icon-guanbi" hover-class="empty-val-button-h" hover-stay-time="100" @tap="emptyPval('ls_num')"></view>
				</view>
			</view>
			<view class="hb-style-input">
				<input class="uni-input" type="text" v-model="post_data.ls_openid" placeholder="openid"/>
				<view class="empty-val-button u-f-ajc">
					<view class="icon iconfont icon-guanbi" hover-class="empty-val-button-h" hover-stay-time="100" @tap="emptyPval('ls_openid')"></view>
				</view>
			</view>
			
			<button type="primary" class="wx-verify-button" hover-class="verify-button-hover" @tap="submit()">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				post_data: {
					ls_num: "",
					ls_openid: ""
				}
			}
		},
		onLoad() {
			var s = uni.getStorageSync('lsBind')
			if(s){
				this.post_data.ls_num = s.ls_num
				this.post_data.ls_openid = s.ls_openid
			}
		},
		methods: {
			checkPd(){
				if(!this.post_data.ls_num){
					uni.showToast({
						title:'学号不能为空',
						icon:"none"
					})
					return false
				}
				if(!this.post_data.ls_openid){
					uni.showToast({
						title:'openid 不能为空',
						icon:"none"
					})
					return false
				} 
				return true
			},
			async submit(){
				if(!this.checkPd()) return;
				uni.showLoading({
					title:"正在提交"
				})
				let [err,res] = await this.$http.post('/user/libseat/bind', this.post_data, {
					token: true,
					checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				var temp = res.data.data
				uni.setStorageSync('lsBind', temp)
				uni.showToast({
					title:"绑定成功",
					duration:800
				})
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				}, 800)
			},
			emptyPval(k){
				this.post_data[k] = ""
			},
		}
	}
</script>

<style>
	
	.empty-val-button>view{
		color: #e15b64;
		font-size: 26rpx;
		font-weight: 900;
	}
	.empty-val-button-h{
		color: #ff9191!important;
	}
	.empty-val-button{
		padding: 0rpx 10rpx;
		border-radius: 20rpx;
	}
	
	.hb-style-input>input{
		font-size: 32rpx;
		background: rgb(243,246,248);
		border-bottom: 1rpx solid #eeeeee;
	}
	.hb-style-input{
		margin-bottom: 50rpx;
		display: flex;
		align-items: center;
	}
	
	.step-title>navigator{
		font-size: 24rpx;
		color: #00AAFF;
		background: rgb(243,246,248)!important;
	}
	.step-title{
		padding: 20rpx 30rpx 50rpx 30rpx;
		box-sizing: border-box;
	}
	.step-title>view{
		font-size: 40rpx;
	}
	
	.step2-body{
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>
