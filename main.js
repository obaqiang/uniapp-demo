import Vue from 'vue'
import App from './App'
import globalData from './config/globalData.js'
require('./utils/utils.js')
Vue.config.productionTip = false

App.mpType = 'app'
App.globalData = globalData
const app = new Vue({
    ...App
})
app.$mount()
