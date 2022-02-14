import Vue from 'vue'
import App from './App'



// 挂载全局方法

import publicM from "./common/public.js"
Vue.prototype.publicM=publicM

import config from "./common/config.js"
Vue.prototype.config=config

import appconfig from "./common/appconfig.js"
Vue.prototype.appconfig=appconfig

import lib from "./common/lib.js"
Vue.prototype.lib=lib

import request from "./common/request.js";
Vue.prototype.$http = request;

import message from "./common/message.js";
Vue.prototype.$message = message;

import User from "./common/user.js"
Vue.prototype.User = User



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
