<template>
	<view class="ap-list u-f-ac">
		<view class="des-part" :style="{
			'color': item.type_code==1?'#34bf49':'#e15b64'
		}">{{item.type_code==1?'+':'-'}}{{item.amount}}</view>
		<view class="des-part" style="margin-left: 20rpx!important;">{{item.des}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			item:Object
		},
	}
</script>

<style scoped>
	.des-part{
		font-size: 30rpx;
		color: #262626;
		margin-left: 30rpx;
	}
	.ap-list{
		width: 100%;
		border-top: 1rpx solid #EEEEEE;
		box-sizing: border-box;
		padding: 12rpx 5rpx;
		background: #FFFFFF;
	}
</style>
