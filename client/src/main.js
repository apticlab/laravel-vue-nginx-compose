import Vue from 'vue';
import { VLazyImagePlugin } from 'v-lazy-image';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Dialog from './plugins/dialog.js';

import { helpers } from './utils/helpers';
import { EventBus } from './utils/event-bus.js';
import i18n from './i18n';
import { api } from './utils/api';

import filters from './utils/filters';
import './utils/components';

import '@/assets/css/app.css';
import './registerServiceWorker';

Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]));
Object.keys(helpers).forEach((key) => (Vue.prototype[key] = helpers[key]));

Vue.prototype.EventBus = EventBus;

Vue.use(Dialog);
Vue.use(VLazyImagePlugin);

if (process.env.NODE_ENV === 'production') {
  console.log('sono in produzione');
  Vue.config.devtools = false;
  Vue.config.productionTip = false;
}

Vue.config.errorHandler = async (err, vm, info) => {
  let error = {
    component: vm.$options.name,
    message: err.toString(),
    type: info,
  };

  console.log(error);

  await api.create('errors', error);
};

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
