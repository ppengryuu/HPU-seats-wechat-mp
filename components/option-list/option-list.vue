<template>
	<view style="display: flex;justify-content: flex-end;" :hover-class="showswitch?'':'optlisthover'" hover-stay-time="100">
		<view class="optlist">
			<view v-if="navigateTo.length>0" class="list-item" @tap="listnavigateTo">
				<view class="listicontext">
					<view class="u-f-ac">
						<view class="listtext" :style="{color:fontColor}">{{listtext}}</view>
					</view>
					<view class="righttext u-f-ac">{{righttext}}<view class="mini-red-dot" v-if="minireddot"></view></view>
					<uni-badge v-if="rightreddot>0" type="error" :text="rightreddot" />
				</view>
				<view class="icon iconfont icon-jinru"></view>
			</view>
			<view v-else class="list-item">
				<view class="listicontext" @tap="nonavgateTo">
					<view class="u-f-ac">
						<view class="listtext" :style="{color:fontColor}">{{listtext}}</view>
					</view>
					<view class="righttext" :style="{color:fontColor}">{{righttext}}</view>
					<uni-badge style="margin-right: 36upx;" v-if="rightreddot>0" type="error" :text="rightreddot" />
				</view>
				<switch style="transform: scale(0.8);" v-if="showswitch" :disabled="disabled" :checked="switchChecked" @change="onSwitchChange" />
			</view>
		</view>
	</view>
	
	
</template>

<script>
	import uniBadge from '../uni-badge/uni-badge.vue'
	export default {
		components:{
			uniBadge
		},
		props:{
			minireddot:Boolean,
			listtext:{
				default:' ',
				type:String
			},
			navigateTo:{
				default:'',
				type:String
			},
			fontColor:{
				default:'#000',
				type:String
			},
			showswitch:false,
			disabled:false,
			righttext:{
				default:' ',
				type:String
			},
			rightreddot:0,
			switchChecked:false,
			checkToken:{
				default:false,
				type:Boolean
			}
		},
		methods:{
			listnavigateTo(){
				if(this.checkToken && !uni.getStorageSync('token')){
					return uni.showToast({
						title:"请先登录",
						icon:"none"
					})
				}
				uni.navigateTo({
					url:this.navigateTo
				})
			},
			nonavgateTo(){
				this.$emit('optiontap',this.listtext)
			},
			onSwitchChange(e) {
				this.$emit('switchChange',this.listtext, e.detail)
			}
		}
	}
</script>

<style>
	.mini-red-dot{
		margin-left: 20upx;
		border-radius: 50%;
		height: 20upx;
		width: 20upx;
		background: red;
	}
	.righttext{
		font-size: 25upx;
		color: #929292;
		margin-right: 10upx;
	}
	.list-item{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.listicontext{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20upx 0;
	}
	.listtext{
		font-size: 30upx;
	}
	.listicontext>view:nth-child(1)>image{
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
		margin-top: -10upx;
	}
	.optlist{
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 96%;
		/* background: #FFFFFF; */
		border-bottom: 1upx solid #EEEEEE;
	}
	.optlisthover{
		background: #EEEEEE;
	}
</style>
