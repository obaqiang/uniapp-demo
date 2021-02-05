// 以下内容在 /utils/plugins.js 中
import Vue from 'vue'
// import store from '../store';
// uni中的store不需要注册到main.js的 new Vue 中
// Vue.prototype.$store = store;


Vue.prototype.$toast = (title, duration = 1500) => uni.showToast({
	icon: 'none',
	title,
	duration
})




