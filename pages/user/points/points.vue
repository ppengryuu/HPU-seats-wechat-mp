<template>
	<view class="body">

		<view>
			<view class="mini-title">我的积分</view>
			<view class="my-points u-f-jsb u-f-ac">
				<view class="points-l">{{point_info.points}}</view>
			</view>
			
			<view class="mini-title">近期积分变化记录</view>
			<view class="point-record-list">
				<block v-for="(item,index) in point_info.record" :key="index">
					<point-list :item="item"></point-list>
				</block>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import pointList from '../../../components/point-list/point-list.vue';
	export default {
		components:{
			pointList
		},
		data() {
			return {
				point_info:{}
			}
		},
		onLoad(e) {
			uni.showLoading({
				title:"获取数据中..."
			})
			this.getData()
		},
		onPullDownRefresh() {
			this.getData()
		},
		methods: {
			async getData(){
				let [err,res] = await this.$http.get('/user/points/info',{},{
					token:true,
					checkToken:true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return; 
				var data = res.data.data
				this.point_info = data
				uni.hideLoading()
				uni.stopPullDownRefresh()
			}
		}
	}
</script>

<style scoped>
	
	.points-l{
		font-size: 45rpx;
		color: #262626;
		margin-left: 30rpx;
	}
	.my-points{
		width: 100%;
		border-bottom: 1rpx solid #EEEEEE;
		box-sizing: border-box;
	}
	.mini-title{
		color: #323232!important;
		font-size: 32upx;
		box-sizing: border-box;
		padding: 20upx 0 10upx 30upx;
	}
		
</style>
