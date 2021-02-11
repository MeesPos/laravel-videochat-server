window.Vue = require('vue');
import router from './router'
import './registerGlobals'
import './db/firebase'


const app = new Vue({
    el: '#app',
    router
});