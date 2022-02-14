<template>
	<view>
		<view v-if="orders.length>0">
			<block v-for="(item,i) in orders" :key="i">
				<view class="u-f-ac list-body" @tap="gotoDetail(item)">
					<view class="list-item">
						<view>{{item.library}}</view>
						<view>{{item.room}} <span style="margin: 0 10rpx;">-</span> 座位{{item.seat}}</view>
						<view>时间：{{item.date}} <span style="margin-left: 15rpx;">{{item.st}}~{{item.et}}</span></view>
						<view class="status-view u-f-ac">
							<view style="display: inline;">状态：</view> 
							<view v-if="item.code==1" class="u-f-ajc">
								<view class="loadingio-spinner-rolling-2asv4rlt7ej">
									<view class="ldio-x78ol5dna7">
										<view></view>
									</view>
								</view>
								<view>抢座中</view>
							</view>
							<view v-else-if="item.code==2" class="u-f-ajc">
								<image src="../../static/icons/check-200px.png" mode="widthFix" class="error-img"></image>
								<view>抢座成功</view>
							</view>
							<view v-else class="u-f-ajc">
								<image src="../../static/icons/cross-200px.png" mode="widthFix" class="error-img"></image>
								<view>抢座失败</view>
							</view>
						</view>
						<view v-if="item.des">提示信息：{{item.des?`${item.des}`:''}}</view>
					</view>
					
					<view class="deleteButton u-f-ajc" @tap.stop="delItem(item)">
						<view class="icon iconfont icon-shanchu" hover-class="delbutton-hover" hover-stay-time="100"></view>
					</view>
				</view>
				
			</block>
		</view>
		
		<view v-else>
			<view style="height: 700rpx;width: 100%;color: #909090;text-align: center;padding: 30rpx;box-sizing: border-box;flex-direction: column;" class="u-f-ajc">
				<view style="font-size: 32rpx;margin: 18rpx;">暂无抢座计划</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				token: "",
				orders: []
			}
		},
		onLoad() {
			uni.$on('loginSuccess', this.initPage)
			uni.$on('logoutSuccess', this.initPage)
			uni.$on('refreshOrders', this.initPage)
			this.orders = uni.getStorageSync('orders')
			this.initPage()
			setInterval(()=>{
				this.initPage()
			}, 12000)
		},
		onPullDownRefresh() {
			this.initPage()
		},
		methods: {
			initPage(){
				var token = uni.getStorageSync('token');
				this.token = token
				if(token){
					this.pullOrders()
				} else {
					this.orders = []
				}
				uni.stopPullDownRefresh()
			},
			async pullOrders(){
				let [err,res] = await this.$http.get('/user/order/list', {}, {
					token: true,
					checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				var temp = res.data.data
				uni.setStorageSync('orders', temp)
				this.orders = temp
				uni.stopPullDownRefresh()
			},
			gotoDetail(e){
				console.log(e)
				uni.setStorageSync('currentLibrary', {
					id: e.library_id,
					val: e.library
				})
				uni.setStorageSync('currentRoom', {
					roomId: e.room_id,
					room: e.room
				})
				uni.navigateTo({
					url:"../seat-spec/seat-spec?seatinfo="+JSON.stringify({
						id: e.seat_id,
						name: e.seat
					})
				})
			},
			async delItem(item){
				console.log(item)
				uni.showModal({
					title:'提示',
					content:'确认删除吗？',
					success: async (res) => {
						if(res.confirm){
							uni.showLoading({title:"提交中"})
							item.type = 'delete'
							let [err,res] = await this.$http.post('/user/order/edit',item,{
								token:true,
								checkToken:true
							});
							console.log(res)
							// 请求失败处理
							if (!this.$http.errorCheck(err,res)) return;
							// 拿到当前对象
							let index = this.orders.findIndex(value =>{
								return value.id === item.id;
							});
							this.orders.splice(index,1);
							var list = uni.getStorageSync("orders")
							// 拿到当前对象
							let i = list.findIndex(value =>{
								return value.id === item.id;
							});
							if(i >= 0){
								list.splice(i,1)
							}
							uni.setStorageSync("orders",list)
							uni.hideLoading();
							uni.showToast({
								title:"修改成功",
								icon:"none"
							})
						}
					}
				})
			},
			toLoginPage(){
				uni.navigateTo({
					url:"../user/login/login"
				})
			}
		}
	}
</script>

<style>
	.error-img{
		width: 40rpx;
		height: auto;
	}
	.list-body{
		border-bottom: 1rpx solid #EEEEEE;
		background: #FFFFFF;
	}
	.list-item{
		width: 85%;
		padding: 15rpx 25rpx;
	}
	.list-item>view{
		/* width: 80%; */
		font-size: 26rpx;
		line-height: 40rpx;
		color: #909090;
		overflow: hidden;
		word-break: break-all;
	}
	.list-item>view:nth-child(1){
		color: #101010!important;
		font-size: 34rpx!important;
		line-height: 46rpx!important;
	}
	.list-item>view:nth-child(2){
		color: #101010!important;
		font-size: 30rpx!important;
		line-height: 46rpx!important;
	}
	
	.delbutton-hover{
		background: #c82934!important;
	}
	.deleteButton>view{
		padding: 45rpx 20rpx;
		border-radius: 8rpx;
		color: #FFFFFF;
		background: #ff3542;
	}
	.deleteButton{
		width: 15%;
	}
	
	
	@keyframes ldio-x78ol5dna7 {
	  0% { transform: translate(-50%,-50%) rotate(0deg); }
	  100% { transform: translate(-50%,-50%) rotate(360deg); }
	}
	.ldio-x78ol5dna7 view {
	  position: absolute;
	  width: 20rpx;
	  height: 20rpx;
	  border: 2rpx solid #34bf49;
	  border-top-color: transparent;
	  border-radius: 50%;
	}
	.ldio-x78ol5dna7 view {
	  animation: ldio-x78ol5dna7 1s linear infinite;
	  top: 20rpx;
	  left: 20rpx
	}
	.loadingio-spinner-rolling-2asv4rlt7ej {
	  width: 40rpx;
	  height: 40rpx;
	  display: inline-block;
	  overflow: hidden;
	  background: #FFFFFF;
	}
	.ldio-x78ol5dna7 {
	  width: 100%;
	  height: 100%;
	  position: relative;
	  transform: translateZ(0) scale(1);
	  backface-visibility: hidden;
	  transform-origin: 0 0; /* see note above */
	}
	.ldio-x78ol5dna7 view { box-sizing: content-box; }
	
	.wx-verify-button{
		margin: 0 30upx;
		width: 50%;
	}
</style>
