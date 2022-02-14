<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content " :class="{'mpvue-picker-view-show':showPicker}">
      <div class="mpvue-picker__hd" catchtouchmove="true">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" :style="{color:themeColor}" @click="pickerConfirm">确定</div>
      </div>
      <picker-view indicator-style="height: 40px;" class="mpvue-picker-view" :value="pickerValue" @change="pickerChange">
          <!-- <picker-view-column>
            <div class="picker-item" v-for="(item,index) in weekDataList" :key="index">{{item.label}}</div>
          </picker-view-column> -->
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in startsecDataList" :key="index">{{index==(startsecDataList.length-1)?"":"第 "+item.label}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in endsecDataList" :key="index">{{index==(endsecDataList.length-1)?"":"~ "+item.label+" 节"}}</div>
          </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>

<script>
// import weekData from './data/week.js';
// import startsecData from './data/startsec.js';
// import endsecData from './data/endsec.js';
export default {
	props:{
		startsecData:{
			default:[],
			type:Array
		},
		endsecData:{
			default:[],
			type:Array
		}
	},
  data() {
    return {
      pickerValue: [0, 0, 0],
      weekDataList: [],
      startsecDataList: [],
      endsecDataList: [],
			/* 是否显示控件 */
			showPicker: false,
    };
  },
  created() {
    this.init()
  },
  props: {
    /* 默认值 */
    pickerValueDefault: {
      type: Array,
      default(){
				return [0, 0, 0]
			}
    },
    /* 主题色 */
    themeColor: String
  },
	watch:{
		pickerValueDefault(){
			this.init();
		}
	},
  methods: {
		init() {
			this.weekDataList = weekData;
			this.startsecDataList = startsecData;
			this.endsecDataList = endsecData[0];
		},
    show() {
      setTimeout(() => {
        this.showPicker = true;
      }, 0);
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
      this._$emit('onCancel');
    },
    pickerConfirm(e) {
      this.showPicker = false;
      this._$emit('onConfirm');
    },
    showPickerView() {
      this.showPicker = true;
    },
    pickerChange(e) {
		console.log(e.mp.detail)
      let changePickerValue = e.mp.detail.value;
	  // console.log(this.pickerValue[0] !== changePickerValue[0])
	  if(this.pickerValue[1] != changePickerValue[1]){
		  this.endsecDataList = endsecData[changePickerValue[1]]
		  changePickerValue[2] = 0
	  }
	  this.pickerValue = changePickerValue;
	  console.log(this.pickerValue)
	  this._$emit('onChange');
    },
    _$emit(emitName) {
		if(this.weekDataList[this.pickerValue[0]].label&&this.endsecDataList[this.pickerValue[2]].label&&this.startsecDataList[this.pickerValue[1]].label){
			let pickObj = {
			  label: this._getLabel(),
			  value: this._getValue(),
			};
			console.log(pickObj)
			this.$emit(emitName, pickObj);
		}
      
    },
    _getLabel() {
      let pcikerLabel =
        this.weekDataList[this.pickerValue[0]].label +
        ' 第' +
        this.startsecDataList[this.pickerValue[1]].label +
        '~' +
        this.endsecDataList[this.pickerValue[2]].label+'节';
      return pcikerLabel;
    },
	_getValue(){
		var clen = parseInt(this.endsecDataList[this.pickerValue[2]].value) - parseInt(this.startsecDataList[this.pickerValue[1]].value) + 1
		let obj = {}
		obj.weekday = this.weekDataList[this.pickerValue[0]].value
		obj.startSection = this.startsecDataList[this.pickerValue[1]].value
		obj.endSection = this.endsecDataList[this.pickerValue[2]].value
		obj.length = clen.toString()
		return obj;
	}
  }
};
</script>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.mpvue-picker-view-show {
  transform: translateY(0);
}
.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.mpvue-picker__hd:after {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.mpvue-picker__action {
	font-size: 32upx;
  display: block;
  flex: 1;
  color: #1aad19;
}
.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}
.mpvue-picker__action:last-child {
  text-align: right;
}
.picker-item {
  text-align: center;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
}
.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
