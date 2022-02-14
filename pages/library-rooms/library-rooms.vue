<template>
	<view>
		<view style="width: 100%;height: 30rpx;background: rgb(242,246,245);"></view>
		<view style="background: #FFFFFF;">
			<block v-for="(item1, i) in room_list" :key="i">
				<block v-for="(item, j) in item1.list" :key="j">
					<option-list :listtext="item.room" :navigateTo="'../library-seats/library-seats?roomInfo='+ JSON.stringify(item) "></option-list>
				</block>
			</block>
		</view>
		
	</view>
</template>

<script>
	import OptionList from '../../components/option-list/option-list.vue';
	export default {
		components:{
			OptionList
		},
		data() {
			return {
				room_list: []
			}
		},
		onLoad(e) {
			uni.showLoading({
				title:"加载中"
			})
			var buildInfo = JSON.parse(e.buildInfo)
			uni.setStorageSync('currentLibrary', buildInfo)
			this.getRooms(buildInfo)
		},
		onPullDownRefresh() {
			this.getRooms(uni.getStorageSync('currentLibrary'))
		},
		methods: {
			async getRooms(e){
				e['build_id'] = e['id']
				console.log(e)
				let [err,res] = await this.$http.get('/app/libseat/rooms', e, {
					token: true,
					// checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				this.room_list = res.data.data
				uni.hideLoading()
				uni.stopPullDownRefresh()
			},
			test(){
				uni.navigateTo({
					url:'../library-seats/library-seats'
				})
			}
		}
	}
</script>

<style>
	
	
</style>
