<template>
	<view>
		<view style="background: rgb(243,246,248);position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: -999;"></view>
		<view class="icon u-f-ajc">
			<image src="../../static/app.jpg" mode="aspectFill"></image>
		</view>
		<view class="appname">河理座位</view>
		<view class="appversion">v1.0.0</view>
		<view class="version-rec">
			<view class="v-title">更新日志</view>
			<view class="v-list">v1.0.0</view>
			<view class="v-detail">
				<text>
					公测版发布
				</text>
			</view>
			
			
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style scoped>
	.v-detail{
		margin-bottom: 20rpx;
	}
	.version-rec>view{
		word-break: break-all;
	}
	.version-rec{
		color: #101010;
		box-sizing: border-box;
		padding: 20rpx 60rpx;
	}
	.v-title{
		font-size: 35rpx;
		margin: 20rpx 0;
	}
	.icon{
		height: 300upx;
		width: 100%;
	}
	.icon >image{
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
	}
	.appname{
		font-size: 35upx;
		text-align: center;
	}
	.appversion{
		font-size: 25upx;
		text-align: center;
		color: #909090;
	}
	.options{
		background: #FFFFFF;
	}
</style>
