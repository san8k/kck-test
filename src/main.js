import Vue from 'vue';
import App from './App.vue';
import { VueMaskDirective } from 'v-mask';
Vue.directive('mask', VueMaskDirective);

import '@/assets/scss/main.scss';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
