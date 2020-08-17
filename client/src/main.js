import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';

import estia from '@apticlab/estia';

if (process.env.NODE_ENV === 'production') {
  Vue.config.devtools = false;
  Vue.config.productionTip = false;
}

let router = new VueRouter({
  mode: "history",
});

Vue.use(VueRouter);
Vue.use(estia, {
  router,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
