<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary');
			// #endif
			this.lib.NetWork.On();
			// this.lib.Update();
			// 初始化用户状态
			this.User.__init();
			// 初始化配置 
			this.appconfig.__init();
			this.publicM.__init();
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	/* 引入自定义图标库 */
	@import './common/icon.css';
	/* 引入动画库 */
	@import './common/animate.css';
	/* 公共样式 */
	@import './common/common.css';
	
	page{
		background: rgb(242,246,245);
	}
	
	.verify-button-hover[type=primary]{
		background: #ff6969!important;
	}
	.wx-verify-button{
		background: #ef4136!important;
		border-radius: 50upx!important;
		/* margin: 0 30upx; */
		/* width: 100%; */
	}
	button::after{ border: none;}
</style>
