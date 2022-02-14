const http = (options) => {
	return new Promise((resolve, reject) => {
		uni. showLoading({
		title: '加载中...',//是否显示透明蒙层,防止触摸穿透,默认: false
		mask: true,
	})
	uni.request({
		method: options.method,
		url: options.url, //仅为示例,并非真实接口地址。
		data: options.data,
		header: {
			 'x-token':'111111111111111111111111' //自定义请求头信息।
		},
		success: (res) =>{ 
			resolve(res.data)
		},
		fail: (err) =>{
			reject(err.data) 
			let code=err.data.code;
			switch (code){
				case 1000:// do something 
				break;
				case 2000://do something 
				break;
			}
		},
		complete: () =>{
			uni.hideLoading();
		}
		});
	})
}
export default http