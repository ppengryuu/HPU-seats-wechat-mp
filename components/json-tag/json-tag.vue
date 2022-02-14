<template>
	<view>
		<block v-for="(item,n) in list" :key="n">
			
			<view v-if="item.type=='view'" :style="item.style">
				{{item.content?item.content:""}}
				<json-tag v-if="item.list" :list='item.list'></json-tag>
			</view>
			
			<view v-if="item.type=='html'" :style="item.style" v-html="item.content"></view>
			
			<text v-if="item.type=='text'" :style="item.style" :selectable="item.selectable?item.selectable:item.selectable==false?false:data.selectable">
				{{item.content?item.content:""}}
			</text>
			
			<view v-if="item.type=='image'">
				<image :src="item.src" :style="item.style" :mode="item.mode" @tap="previewImg(item)"></image>
				<!-- <image src="" mode="aspectFit"></image> --> 
			</view>
			
			<view v-if="item.type=='navigateToMiniProgram'" :style="item.style" @tap="navToMP(item)">
				<view class="MP-box u-f-ac" hover-class="f-hover" hover-stay-time="100">
					<view class="u-f-ac" style="position: relative;">
						<image :src="item.icon" mode="aspectFill"></image>
						<!-- <image v-if="item.mpIcon" src="../../static/icons/mp-icon.png" mode="aspectFit" style="position: absolute; right: 0; bottom: 0; width: 35rpx; height: 35rpx;"></image> -->
					</view>
					<view>
						<view>{{item.name}}</view>
						<view>{{item.abstract}}</view>
					</view>
				</view>
			</view>
			
			<view v-if="item.type=='officialAccount'" :style="item.style">
				<official-account></official-account>
			</view>
			
		</block>
	</view>
</template>

<script>
	import jsonTag from "../json-tag/json-tag.vue"
	export default {
		components:{
			jsonTag
		},
		props:{
			list:{
				type:Array,
				default() { return [] }
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			previewImg(e){
				if(!e.previewable) return;
				uni.previewImage({
					urls:[e.src]
				})
				// uni.showToast({title:"hahah"})
			},
			navToMP(e){
				uni.navigateToMiniProgram({
					appId: e.appId,
					path: e.path
				})
			}
		}
	}
</script>

<style>

</style>
