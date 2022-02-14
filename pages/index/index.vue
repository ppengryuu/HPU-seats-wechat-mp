<template>
	<view>
		
		<view class="page">
			<view class="list-area">
				<block v-for="(item, index) in library_list" :key='index'>
					<view class="item-list" hover-class="item-list-hover" hover-stay-time="100" @tap="chooseLibrary(item)">
						<image :src="item.img_url" mode="aspectFill"></image>
						<view class="item-name">
							{{item.val}}
						</view>
					</view>
				</block>
			</view>
			
		</view>
		
		<json-docView v-if="notice&&notice.status" :useJsonBUrl="notice.useJsonBUrl" :url="notice.url"></json-docView>
	</view>
</template>

<script>
	import jsonDocView from '../../components/json-docView/json-docView.vue';
	export default {
		components:{
			jsonDocView
		},
		data() {
			return {
				token: "",
				library_list: [],
				notice: {}
			}
		},
		onLoad() {
			this.initPage()
			uni.$on('loginSuccess', this.initPage)
			uni.$on('logoutSuccess', this.initPage)
		},
		onPullDownRefresh() {
			this.initPage()
		},
		onReady() {
			// uni.navigateTo({
			// 	url: '../user/login/login'
			// })
		},
		onShareAppMessage() {
			
		},
		methods: {
			initPage(){
				// this.token = uni.getStorageSync('token')
				if(true){
					this.getLibrarys()
					this.getNotice()
				}
				uni.stopPullDownRefresh()
			},
			async getLibrarys(){
				let [err,res] = await this.$http.get('/app/libseat/librarys', {}, {
					token: true,
					// checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				this.library_list = res.data.data
				uni.stopPullDownRefresh()
			},
			async getNotice(){
				let [err,res] = await this.$http.get('/app/notice', {}, {
					token: true,
					// checkToken: true
				});
				console.log(res)
				if (!this.$http.errorCheck(err,res)) return;
				this.notice = res.data.data
			},
			chooseLibrary(item){
				uni.navigateTo({
					url:'../library-rooms/library-rooms?buildInfo='+JSON.stringify(item)
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
	.item-list{
		width: 90%;
		height: 200rpx;
		margin-left: 5%;
		margin-top: 36rpx;
		box-sizing: border-box;
		position: relative;
		background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255,255,255,0.6));
		border-radius: 15rpx;
		overflow: hidden;
	}
	.item-list-hover{
		background: rgba(238, 238, 238, 0.6);
	}
	.item-list>image{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
		border-radius: 15rpx;
		/* filter: blur(8rpx); */
	}
	.item-name{
		/* top: 10rpx; */
		bottom: 0;
		left: 0;
		width: 100%;
		padding-left: 30rpx;
		position: absolute;
		color: white;
		font-size: 40rpx;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2));
	}
	
	
	.wx-verify-button{
		margin: 0 30upx;
		width: 50%;
	}
	.page-2{
		width: 100%;
		/* height: 600rpx; */
	}
</style>
