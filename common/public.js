

export default {
	
	
	screenWidth:Number,
	screenHeight:Number,
	schoolww:Number,
	coursesObject:{},

	sleep(time) {
	    var startTime = new Date().getTime() + parseInt(time, 10);
	    while(new Date().getTime() < startTime) {}
	},
	__init(){
		this.screenHeight = uni.getSystemInfoSync().screenHeight
		this.screenWidth = uni.getSystemInfoSync().screenWidth
		
	},
	
	ArrayInterSets(arr1,arr2) {
	    var arr3 = arr2.filter(function(v){
	        return arr1.indexOf(v)!==-1 // 利用filter方法来遍历是否有相同的元素
	    })
	    return arr3
	},
	
	isContinuationInteger(array){
	    array = array.sort(this.lsy)
	    var a = array.length
	    // console.log(array)
	    if(array[a-1]-array[0] == a-1) return true;
	    else return false;
	},
	
	lsy(a, b) {
	    return a - b //a-b返回的是小的在前 相反b-a是大的在前
	},
	
}