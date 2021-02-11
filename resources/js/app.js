window.Vue = require('vue');

import App from './App.vue';

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('video-chat', require('./components/VideoChat.vue').default);

const app = new Vue({
    el: '#app',
    render: h => h(App)
});