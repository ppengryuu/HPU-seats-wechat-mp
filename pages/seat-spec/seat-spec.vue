<template>
	<view>
		<view class="uni-h4" style="margin: 20rpx;text-align: center;">
			{{current_lib.val}}-{{current_room.room}}-{{seat_info.name}}
		</view>
		<view class="mini-title">选择日期</view>
		<view>
			<picker mode="date" :value="startDate" @change="changeStartDate" :start="today">
				<view class="ta-item">
					<view class="left-title">日期</view>
					<view class="midta">
						<input adjust-position auto-height maxlength="100" placeholder="日期" show-confirm-bar="false" v-model="startDate" cursor-spacing="0" placeholder-class="phclass" disabled="disabled"/>
					</view>
					<view><view class="icon iconfont icon-bianji"></view></view>
				</view>
			</picker>
			<view style="margin-top: 10rpx;">
				<view class="time-title">选择时间</view>
				<view class="u-f-ac" style="width: 80%; margin: auto;margin-bottom: 20px;">
					<picker mode="selector" :range="startTimeArr" :range-key="'name'" @change="changeStartTime" :value="indexOfObj(startTimeArr, startTime, 'name')" class="dateContainer" style="margin-right: 10rpx;">
						<view class="containText u-f-ajc" style="width: 100%;height: 40px;">
							<view v-if="startTimeArr.length>0">{{startTime}}</view>
							<view v-else>无可用时间</view>
						</view>
					</picker>
					
					<picker mode="selector" :range="endTimeArr" :range-key="'name'" @change="changeEndTime" :value="indexOfObj(endTimeArr, endTime, 'name')" class="dateContainer" style="margin-left: 10rpx;" :start="startTime">
						<view class="containText u-f-ajc" style="width: 100%;height: 40px;">
							<view v-if="endTimeArr.length>0">{{endTime}}</view>
							<view v-else>无可用时间</view>
						</view>
					</picker>
				</view>
			</view>
		</view>
		<label class="u-f-ac" v-on:click="switchFlexET(flex_et)">
			<checkbox :checked="flex_et" style="transform: scale(0.7);padding-left: 10%;"/>
			<view style="color: #646464;">弹性结束时间</view>
		</label>
		<view style="position: fixed;bottom: 0;padding: 20px;padding-top: 15rpx;width: 100%;box-sizing: border-box;">
			<button type="primary" class="wx-verify-button" hover-class="verify-button-hover" @tap="submit()">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seat_info: {},
				time_vn: [],
				startDate: "",
				today: "",
				startTime: "",
				endTime: "",
				startTimeArr: [],
				endTimeArr:[],
				flex_et: false,
				is_today: true,
				current_lib: {},
				current_room: {}
				// show_data: []
			}
		},
		onLoad(e) {
			uni.showLoading({
				title:"加载中"
			})
			console.log(e)
			var seatinfo = JSON.parse(e.seatinfo)
			console.log(seatinfo)
			this.seat_info = seatinfo
			this.getTimeVn()
			this.todayDate()
			this.current_lib = uni.getStorageSync('currentLibrary')
			this.current_room = uni.getStorageSync('currentRoom')
			// this.formatSD(seatinfo)
		},
		onPullDownRefresh() {
			this.getTimeVn()
			this.todayDate()
		},
		computed:{
			indexOfObj(){
				return function(obj, val, key){
					let i = obj.findIndex(i=>{
						return i[key] == val
					})
					return i
				}
			}
		},
		methods: {
			todayDate(){
				let d = new Date();
				var Y = d.getFullYear();
				var M = (d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1)
				var D = d.getDate()<10?"0"+d.getDate():d.getDate()
				this.today = this.startDate = Y+"-"+M+"-"+D
			},
			PrefixInteger(num, length) {
				return (Array(length).join('0') + num).slice(-length);
			},
			nowHM(){
				// return '12:00'
				let d = new Date();
				var H = d.getHours()
				var M = d.getMinutes()
				return this.PrefixInteger(H, 2)+":"+this.PrefixInteger(M, 2)
			},
			async getTimeVn(){
				let [err,res] = await this.$http.get('/app/libseat/ltime', {}, {
					token: true,
					// checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				var temp = res.data.data
				this.time_vn =  temp
				this.makeStartTimeArr()
				uni.hideLoading()
				uni.stopPullDownRefresh()
			},
			cParseInt(str){
				return parseInt(str.replace(/[^0-9]/ig, ""))
			},
			makeStartTimeArr(){
				let i = 0
				if(this.is_today){
					let nhm = this.nowHM()
					console.log(nhm, this.cParseInt(nhm))
					i = this.time_vn.findIndex(o=>{
						// console.log(this.cParseInt(o.name))
						return this.cParseInt(o.name) > this.cParseInt(nhm)
					})
				}
				this.startTimeArr = this.time_vn.slice(i, -1)
				if(this.startTimeArr.length == 0){
					uni.showToast({
						title:'今日已无可用时间',
						icon:"none"
					})
					return false
				}
				this.startTime = this.startTimeArr[0].name
				this.makeEndTimeArr()
			},
			changeStartDate(e){
				this.startDate = e.detail.value
				this.is_today = (this.startDate == this.today)
				this.makeStartTimeArr()
			},
			changeStartTime(e){
				console.log(e)
				var index = e.detail.value
				this.startTime = this.startTimeArr[index].name
				this.makeEndTimeArr()
			},
			makeEndTimeArr(){
				var s = this.startTime
				let i = this.time_vn.findIndex(o=>{
					return o.name == s
				})
				this.endTimeArr = this.time_vn.slice(i+1, i+9)
				this.endTime = this.endTimeArr[0].name
			},
			changeEndTime(e){
				var i = e.detail.value
				this.endTime = this.endTimeArr[i].name
			},
			getTimeVal(str){
				let f = this.time_vn.find(o=>{
					return o.name == str
				})
				if(f){
					return f.val
				}
				return false
			},
			genSpecMark(){
				var a = this.current_lib.id.toString()
				var b = this.current_room.roomId.toString()
				var c = this.seat_info.id.toString()
				var d = this.startDate.replace(/-/g, "").toString()
				var e = this.getTimeVal(this.startTime).toString()
				var f = this.getTimeVal(this.endTime).toString()
				return a+b+c+d+e+f
			},
			dateToTimestamp(dateStr){
				dateStr = dateStr.replace(/-/g, '/')
				var ts = new Date(dateStr).getTime()
				console.log(dateStr, ts)
				return parseInt(ts/1000)
			},
			checkStartTime(){
				if(!this.startTime || (this.is_today && (this.cParseInt(this.nowHM())>this.cParseInt(this.startTime)))){
					uni.showToast({
						title: "所选时间参数不合法",
						icon:"none"
					})
					return false
				}
				return true
			},
			checkLsBind(){
				if(!uni.getStorageSync('token')){
					uni.showToast({
						title: "请先登录",
						icon:"none",
						duration:600
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../user/login/login'
						})
					}, 600)
					
					return false
				}
				if(!uni.getStorageSync('lsBind')){
					uni.showToast({
						title: "请前往（个人中心 - 我的绑定）绑定图书馆预约系统",
						icon:"none",
						duration:600
					})
					setTimeout(()=>{
						uni.navigateTo({
							url:'../user/bind-libseat/bind-libseat'
						})
					}, 600)
					
					return false
				}
				return true
			},
			async submit(e){
				uni.showLoading({
					title:"提交中"
				})
				if(!this.checkStartTime()) return
				if(!this.checkLsBind()) return
				let post_data = {
					seat: this.seat_info.name,
					seat_id: this.seat_info.id,
					date: this.startDate,
					st: this.startTime,
					st_stamp: this.dateToTimestamp(this.startDate+" "+this.startTime),
					st_val: this.getTimeVal(this.startTime),
					et: this.endTime,
					et_val: this.getTimeVal(this.endTime),
					is_today: this.is_today,
					flex_et: this.flex_et,
					library: this.current_lib.val,
					library_id: this.current_lib.id,
					room: this.current_room.room,
					room_id: this.current_room.roomId,
					spec_mark: this.genSpecMark()
				}
				console.log(post_data)
				// return
				let [err,res] = await this.$http.post('/user/order/submit', post_data, {
					token: true,
					// checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				var data = res.data.data
				this.updateOrders(data)
				uni.$emit('refreshOrders')
				uni.showToast({
					title: "提交成功",
					icon:"success"
				})
			},
			updateOrders(newOrder){
				var old = uni.getStorageSync('orders')
				if(!old){
					uni.setStorageSync('orders', [newOrder])
				} else {
					uni.setStorageSync('orders', old.concat([newOrder]))
				}
			},
			switchFlexET(e){
				e=!e
				this.flex_et = e
				console.log(e,this.flex_et)
			}
		}
	}
</script>

<style>
	.mini-title{
		color: #323232!important;
		font-size: 36upx;
		text-align: center;
		box-sizing: border-box;
		padding: 20upx 0;
	}
	
	.ta-item{
		margin: 36upx 0 20upx 0;
		display: flex;
		align-items: center;
		/* background: #00A075; */
	}
	.left-title{
		font-size: 30upx;
		margin-left: 5%;
		/* background: #0086B3; */
		display: flex;
		line-height: 1;
		align-items: center;
		width: 20%;
	}
	.midta{
		width: 65%;
	}
	.midta>view{
		min-height: 28upx;
		/* background: #00A075; */
		width: 100%;
		word-break: break-all;
		font-size: 28upx; 
	}
	.midta>input{
		width: 100%;
		font-size: 28upx;
		line-height: 1;
		border-bottom: 1px solid #dfdfdf;
	}
	.ta-item>view:nth-child(3){
		color: #9B9B9B;
		width: 5%;
		text-align: center;
	}
	.phclass{
		color: #c8c8c8;
		/* padding: 5upx 0; */
	}
	
	.containText{
		color: #606266;
	}
	.dateContainer{
		box-sizing: border-box;
		/* margin: 10rpx; */
		border-radius: 4px;
		border: #BBBBBB 1px solid;
		height: 40px;
		width: 50%;
	}
	.dateContainer:hover{
		border: #409eff 1px solid;
	}
	.content {
		text-align: center;
		/* height: 400upx; */
	}
	.time-title {
		font-size: 36rpx;
		padding: 30rpx;
		text-align: center;
	}
	
	
</style>
