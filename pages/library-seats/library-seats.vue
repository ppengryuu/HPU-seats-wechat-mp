<template>
	<view>
		<view style="width: 100%;height: 30rpx;background: rgb(242,246,245);"></view>
		<view class="item-body">
			<block v-for="(item1, i) in seat_list" :key="i">
				<block v-for="(item, j) in item1.list" :key="j">
					<!-- <option-list :listtext="item.name"></option-list> -->
					<view class="item-box" hover-class="item-box-hover" hover-stay-time="100" @tap="chooseSeat(item)">
						{{item.name}}
					</view>
				</block>
			</block>
		</view>
		<view style="width: 100%;height: 150rpx;background: rgb(242,246,245);"></view>
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
				seat_list: []
			}
		},
		onLoad(e) {
			uni.showLoading({
				title:"加载中"
			})
			var roomInfo = JSON.parse(e.roomInfo)
			uni.setStorageSync('currentRoom', roomInfo)
			this.getSeats(roomInfo)
		},
		onReady() {
			
		},
		onPullDownRefresh() {
			this.getSeats(uni.getStorageSync('currentRoom'))
		},
		methods: {
			async getSeats(e){
				e.room_id = e.roomId
				console.log(e)
				// console.log(e.roomId)
				let [err,res] = await this.$http.post('/app/libseat/seats', e, {
					token: true,
					// checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				var temp = res.data.data
				for (var i=0; i<temp.length; i++) {
					temp[i].list.sort(this.sortByName)
				}
				this.seat_list = temp
				uni.hideLoading()
				uni.stopPullDownRefresh()
			},
			sortByName(a, b){
				return a.name - b.name
			},
			chooseSeat(e){
				console.log(e)
				uni.navigateTo({
					url:'../seat-spec/seat-spec?seatinfo='+JSON.stringify(e)
				})
			}
		}
	}
</script>

<style>

	.item-body{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.item-box{
		width: 30%;
		padding: 18rpx;
		margin-left: 2.5%;
		margin-top: 20rpx;
		box-sizing: border-box;
		border: 1rpx solid #EEEEEE;
		border-radius: 8rpx;
		text-align: center;
		background: #FFFFFF;
	}
	.item-box-hover{
		background-color: #EEEEEE!important;
	}
</style>
