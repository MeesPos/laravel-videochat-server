window.Vue = require('vue');
import router from './router'
import store from './store'
import './registerGlobals'
import './db/firebase'


const app = new Vue({
    el: '#app',
    store,
    router
});