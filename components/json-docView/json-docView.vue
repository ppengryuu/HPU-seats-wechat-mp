<template>
	<view>
		<view :style="data.pageStyle" :selectable="data.selectable">
			<json-tag :list='data.list'></json-tag>
		</view>
	</view>
</template>

<script>
	import jsonTag from "../../components/json-tag/json-tag.vue"
	export default {
		components:{
			jsonTag
		},
		props:{
			useJsonBUrl:{
				default:false,
				type:Boolean
			},
			url:{
				default:"",
				type:String
			}
		},
		data() {
			return {
				data:Object,
			}
		},
		created() {
			if(this.useJsonBUrl){
				var h = this.config.jsonUrl
				this.getdata(h+this.url)
			} else {
				this.getdata(this.url)
			}
		},
		methods: {
			async getdata(url){
				console.log(url)
				let [err,res] = await uni.request({
					url:url,
				})
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				this.data = res.data
			},
			
		}
	}
</script>

<style>
	.MP-box{
		width: 100%;
		background: #f2f2f2;
		padding: 20rpx 30rpx;
		border-radius: 12rpx;
		box-sizing: border-box;
	}
	.MP-box>view:nth-child(1)>image{
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
	}
	.MP-box>view:nth-child(2)>view:nth-child(1){
		margin-left: 20rpx;
		font-size: 35rpx;
		color: #1f1f1f;
	}
	.MP-box>view:nth-child(2)>view:nth-child(2){
		margin-left: 20rpx;
		font-size: 26rpx;
		color: #8c8c8c;
	}
	.f-hover{
		background: #e2e2e2!important;
	}
</style>
